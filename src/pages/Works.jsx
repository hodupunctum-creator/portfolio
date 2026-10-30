import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { categories, orderedWorks } from '../data/works';

export const pad = n => String(n).padStart(2, '0');

export function WorkCover({ work }) {
  return work.cover ? (
    <img
      className="work-cover"
      src={work.cover}
      alt={work.title}
      loading="lazy"
      style={{
        aspectRatio: work.coverRatio,
        maxWidth: work.coverMaxWidth,
        marginInline: work.coverMaxWidth ? 'auto' : undefined
      }}
    />
  ) : (
    <div className="work-cover work-cover--blank" style={{ backgroundColor: work.color }} aria-hidden="true">
      {work.tag}
    </div>
  );
}

export default function Works() {
  const [active, setActive] = useState(0);
  const slides = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    slides.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 목록이 길어 스크롤되는 경우, 지금 보고 있는 작품 제목이 목록 화면 안에 보이도록 맞춥니다.
  const asideRef = useRef(null);
  useEffect(() => {
    const aside = asideRef.current;
    const button = aside?.querySelector('button.is-active');
    if (!aside || !button || aside.scrollHeight <= aside.clientHeight) return;
    const box = aside.getBoundingClientRect();
    const target = button.getBoundingClientRect();
    if (target.top < box.top + 48 || target.bottom > box.bottom - 120) {
      aside.scrollTo({ top: aside.scrollTop + target.top - box.top - box.height / 2, behavior: 'smooth' });
    }
  }, [active]);

  const jumpTo = i => slides.current[i]?.scrollIntoView({ block: 'center' });

  // 상세 페이지에서 위로 당겨 돌아왔다면, 방금 보던 작품을 화면 가운데에 둡니다.
  const location = useLocation();
  useEffect(() => {
    const from = location.state?.from;
    const i = from ? orderedWorks.findIndex(work => work.id === from) : -1;
    if (i < 0) return undefined;
    const raf = requestAnimationFrame(() => slides.current[i]?.scrollIntoView({ block: 'center', behavior: 'instant' }));
    return () => cancelAnimationFrame(raf);
  }, [location.key]); // eslint-disable-line react-hooks/exhaustive-deps
  const current = orderedWorks[active];

  return (
    <main>
      <header className="page-head">
        <h1 className="display">Works</h1>
        <div className="page-count display" aria-live="polite">
          <span className="page-count-label">{current.categoryLabel}</span>
          <span>{pad(current.number)}</span>
          <span>/{pad(current.categoryTotal)}</span>
        </div>
      </header>

      <div className="split">
        <aside className="split-aside" ref={asideRef}>
          <div className="work-index">
            {categories.map(category => (
              <section key={category.id} className="work-index-group">
                <h2 className={`work-index-title${current.category === category.id ? ' is-active' : ''}`}>
                  {category.label}
                </h2>
                <ol>
                  {orderedWorks.map((work, i) =>
                    work.category === category.id ? (
                      <li key={work.id}>
                        <button className={i === active ? 'is-active' : ''} onClick={() => jumpTo(i)}>
                          {pad(work.number)}. {work.title}
                        </button>
                      </li>
                    ) : null
                  )}
                </ol>
                {/* 마지막 목록(기타 활동) 바로 아래의 작은 그라데이션 원. 지금 보는 작품의 구분에 따라 색이 바뀝니다. */}
                {category.id === categories[categories.length - 1].id && (
                  <div className="index-orb" data-category={current.category} aria-hidden="true" />
                )}
              </section>
            ))}
          </div>
        </aside>

        <div className="split-main">
          {orderedWorks.map((work, i) => (
            <div key={work.id} className="work-slide-wrap">
              {work.number === 1 && <h2 className="work-group-title label">{work.categoryLabel}</h2>}
              <Link
                to={`/works/${work.id}`}
                className="work-slide"
                data-index={i}
                ref={el => (slides.current[i] = el)}
              >
                <figure style={{ margin: 0 }}>
                  <WorkCover work={work} />
                  <figcaption>
                    <span>
                      {pad(work.number)}. {work.title}
                    </span>
                    <span>{work.categoryLabel}</span>
                  </figcaption>
                </figure>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
