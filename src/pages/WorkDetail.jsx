import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';

import { orderedWorks as works } from '../data/works';
import { WorkCover, pad } from './Works';
import NotFound from './NotFound';

export default function WorkDetail() {
  const { id } = useParams();
  const index = works.findIndex(work => work.id === id);
  if (index === -1) return <NotFound />;

  const work = works[index];
  const prev = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];
  const facts = [
    ['구분', work.categoryLabel],
    ['분류', work.tag],
    ['소속', work.org],
    ['기간', work.period],
    ['역할', work.role],
    ['성과', work.outcome]
  ].filter(([, value]) => value.length > 0);

  return (
    <main>
      <header className="page-head">
        <h1 className="display display--title">{work.title}</h1>
        <div className="page-count display display--title">
          <span className="page-count-label">{work.categoryLabel}</span>
          <span>{pad(work.number)}</span>
          <span>/{pad(work.categoryTotal)}</span>
        </div>
      </header>

      <div className="split">
        <aside className="split-aside">
          <dl className="facts">
            {facts.map(([label, value]) => (
              <Fragment key={label}>
                <dt>{label}</dt>
                <dd className="facts-list">
                  {[].concat(value).map(item => (
                    <span key={item}>{item}</span>
                  ))}
                </dd>
              </Fragment>
            ))}
            {work.links.length > 0 && (
              <>
                <dt>참고</dt>
                <dd className="facts-list">
                  {work.links.map(link => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                      {link.label} ↗
                    </a>
                  ))}
                </dd>
              </>
            )}
          </dl>
          <section className="info">
            <h2 className="info-title">Info</h2>
            <h3 className="info-sub">Overview</h3>
            <div className="prose">
              {work.description.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            {work.excerpt && (
              <figure className="excerpt">
                <h3 className="info-sub">{work.excerpt.title}</h3>
                <blockquote>
                  {work.excerpt.text.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </blockquote>
                {work.excerpt.credit && <figcaption>– {work.excerpt.credit}</figcaption>}
              </figure>
            )}
          </section>
        </aside>

        <div className="split-main">
          <WorkCover work={work} />
          {work.images.map(src => (
            <img key={src} className="work-image" src={src} alt="" loading="lazy" />
          ))}
          <nav className="pager" aria-label="다른 작품">
            <Link to={`/works/${prev.id}`}>← {prev.title}</Link>
            <Link to={`/works/${next.id}`}>{next.title} →</Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
