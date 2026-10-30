import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { site } from '../data/site';
import { works } from '../data/works';
import { startRollingOrbs } from '../lib/rollingOrbs';

// 원마다 시작 위치(x, y: 화면 비율), 굴러가는 방향(dir: 라디안), 속도(speed: px/초)를 정합니다.
const ORBS = [
  { className: 'orb--1', x: 0.58, y: 0.42, dir: 2.6, speed: 22 },
  { className: 'orb--2', x: 0.18, y: 0.3, dir: 0.5, speed: 30 },
  { className: 'orb--3', x: 0.82, y: 0.78, dir: 4, speed: 38 }
];

export default function Home() {
  const orbsRef = useRef(null);

  useEffect(() => (orbsRef.current ? startRollingOrbs(orbsRef.current) : undefined), []);

  return (
    <main className="intro">
      <div className="intro-orbs" ref={orbsRef} aria-hidden="true">
        {ORBS.map((orb, i) => (
          <div
            key={orb.className}
            className={`orb ${orb.className}`}
            data-orb
            data-x={orb.x}
            data-y={orb.y}
            data-dir={orb.dir}
            data-speed={orb.speed}
            data-rot={i}
          >
            <i className="orb-grain" />
          </div>
        ))}
      </div>

      <h1 className="intro-title" aria-label="Dahye's Portfolio">
        <span>Dahye's</span>
        <span>Portfolio</span>
      </h1>

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
