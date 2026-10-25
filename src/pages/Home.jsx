import { Link } from 'react-router-dom';

import TextLoop from '../components/TextLoop/TextLoop';
import { site } from '../data/site';
import { works } from '../data/works';

export default function Home() {
  return (
    <main className="intro">
      <h1 className="visually-hidden">Dahye's Portfolio</h1>
      <TextLoop
        text="Dahye's Portfolio"
        shape="wave"
        speed={90}
        direction="forward"
        separator="✦"
        curviness={90}
        tilt={0}
        fontSize={46}
        fontWeight={800}
        letterSpacing={2}
        uppercase
        ribbon
        ribbonColor="#b90020"
        ribbonWidth={86}
        edgeFade={0}
        cross={false}
        crossAngle={16}
        draggable={false}
        scrollBoost={0}
        outline={false}
        pauseOnHover
      />

      <div className="intro-copy">
        <span className="label">intro</span>
        <div>
          <p className="indent">{site.bio}</p>
          <Link to="/works" className="intro-enter">
            작품 {String(works.length).padStart(2, '0')}개 보기 →
          </Link>
        </div>
      </div>
    </main>
  );
}
