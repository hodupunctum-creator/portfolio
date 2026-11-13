import { site } from '../data/site';

// 베트남 골목에서 찍은 메뉴판 사진. 컴퓨터에서는 왼쪽 칸에, 휴대폰에서는 소개글 아래에 나옵니다.
function SignPhoto({ className }) {
  return (
    <figure className={`about-figure ${className}`}>
      <img
        src="/about-sign.jpg"
        alt="'미흡하지만 최선을 다해 음식을 만들겠습니다 / I'm not good enough, but I'll do my best to make food. Thank you!'라고 적힌 노점 메뉴판"
        width="840"
        height="1120"
        loading="lazy"
      />
    </figure>
  );
}

export default function About() {
  return (
    <main>
      <header className="page-head">
        <h1 className="display">About</h1>
      </header>

      <div className="split">
        <aside className="split-aside about-aside">
          <span className="label">info</span>
          <SignPhoto className="about-figure--aside" />
        </aside>
        <div className="split-main">
          <div className="prose about-prose">
            <h2 className="about-name">{site.aboutName}</h2>
            {site.about.map(paragraph => (
              <p key={paragraph.slice(0, 12)}>{paragraph}</p>
            ))}
            <p>{site.aboutPhotoNote}</p>
          </div>
          <SignPhoto className="about-figure--inline" />
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
