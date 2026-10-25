import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { works } from '../data/works';

export const pad = n => String(n).padStart(2, '0');

export function WorkCover({ work }) {
  return work.cover ? (
    <img className="work-cover" src={work.cover} alt={work.title} loading="lazy" />
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

  return (
    <main>
      <header className="page-head">
        <h1 className="display">Works</h1>
        <div className="page-count display" aria-live="polite">
          <span>{pad(active + 1)}</span>
          <span>/{pad(works.length)}</span>
        </div>
      </header>

      <div className="split">
        <aside className="split-aside">
          <ol className="work-index" style={{ '--rows': Math.ceil(works.length / 2) }}>
            {works.map((work, i) => (
              <li key={work.id}>
                <button className={i === active ? 'is-active' : ''} onClick={() => jumpTo(i)}>
                  {pad(i + 1)}. {work.title}
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <div className="split-main">
          {works.map((work, i) => (
            <Link
              key={work.id}
              to={`/works/${work.id}`}
              className="work-slide"
              data-index={i}
              ref={el => (slides.current[i] = el)}
            >
              <figure style={{ margin: 0 }}>
                <WorkCover work={work} />
                <figcaption>
                  <span>
                    {pad(i + 1)}. {work.summary}
                  </span>
                  <span>{[work.org, work.period].filter(Boolean).join(', ')}</span>
                </figcaption>
              </figure>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
