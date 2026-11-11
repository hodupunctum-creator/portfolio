import { site } from '../data/site';

export default function About() {
  return (
    <main>
      <header className="page-head">
        <h1 className="display">About</h1>
      </header>

      <div className="split">
        <aside className="split-aside">
          <span className="label">info</span>
        </aside>
        <div className="split-main">
          <div className="prose about-prose">
            <h2 className="about-name">{site.aboutName}</h2>
            {site.about.map(paragraph => (
              <p key={paragraph.slice(0, 12)}>{paragraph}</p>
            ))}
          </div>
          <figure className="about-figure">
            <img
              src="/about-sign.jpg"
              alt="'미흡하지만 최선을 다해 음식을 만들겠습니다 / I'm not good enough, but I'll do my best to make food. Thank you!'라고 적힌 노점 메뉴판"
              width="840"
              height="1120"
              loading="lazy"
            />
          </figure>
          <dl className="facts">
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </dl>
        </div>
      </div>
    </main>
  );
}
