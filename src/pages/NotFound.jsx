import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main>
      <header className="page-head">
        <h1 className="display">404</h1>
      </header>
      <div className="split">
        <aside className="split-aside">
          <p className="prose">페이지를 찾을 수 없어요.</p>
          <Link to="/" className="intro-enter">
            처음으로 →
          </Link>
        </aside>
      </div>
    </main>
  );
}
