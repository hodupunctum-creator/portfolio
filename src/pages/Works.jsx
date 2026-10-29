import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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

  const jumpTo = i => slides.current[i]?.scrollIntoView({ block: 'center' });
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
        <aside className="split-aside">
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
                      {pad(work.number)}. {work.summary}
                    </span>
                    <span>{[work.org, work.period].filter(Boolean).join(', ')}</span>
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
