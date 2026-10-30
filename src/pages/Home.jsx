import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { site } from '../data/site';
import { works } from '../data/works';
import { startRollingOrbs } from '../lib/rollingOrbs';

// 원마다 시작 위치(x, y: 화면 비율), 굴러가는 방향(dir: 라디안), 속도(speed: px/초)를 정합니다.
// 큰 빨강 하나를 중심으로, 크기가 서로 다른 원들이 화면 곳곳에 흩어지도록 배치했습니다.
const ORBS = [
  { className: 'orb--1', x: 0.6, y: 0.44, dir: 2.6, speed: 18 }, // 빨강 (가장 큼)
  { className: 'orb--2', x: 0.24, y: 0.3, dir: 0.5, speed: 26 }, // 하늘빛 파랑
  { className: 'orb--4', x: 0.86, y: 0.22, dir: 3.4, speed: 24 }, // 노랑
  { className: 'orb--3', x: 0.84, y: 0.8, dir: 4, speed: 32 }, // 초록
  { className: 'orb--5', x: 0.42, y: 0.12, dir: 1.2, speed: 36 }, // 연보라
  { className: 'orb--6', x: 0.12, y: 0.62, dir: 5.6, speed: 42 } // 작은 빨강
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
            style={{ '--x': `${orb.x * 100}%`, '--y': `${orb.y * 100}%` }}
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
