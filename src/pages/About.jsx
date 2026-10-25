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
          <div className="prose">
            <p className="indent">{site.bio}</p>
          </div>
          <dl className="facts">
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
            <dt>SNS</dt>
            <dd>{site.sns.label}</dd>
          </dl>
        </div>
      </div>
    </main>
  );
}
