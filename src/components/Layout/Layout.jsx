import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { site } from '../../data/site';
import './Layout.css';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 페이지 위쪽에 고정되는 제목 영역(.page-head)의 실제 높이를 --head-h로 알려 줍니다.
  // 왼쪽 칸은 이 높이 바로 아래에 붙어서, 제목 길이와 상관없이 불필요한 빈칸이 생기지 않습니다.
  useEffect(() => {
    const head = document.querySelector('.page-head');
    const root = document.documentElement;
    if (!head) {
      root.style.removeProperty('--head-h');
      return;
    }
    const update = () => root.style.setProperty('--head-h', `${head.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(head);
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="frame">
      <nav className="frame-nav" aria-label="주요 메뉴">
        <NavLink to="/" end>
          Intro
        </NavLink>
        <NavLink to="/works">Works</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <Outlet />

      <address className="frame-contact">
        {site.contactLabel}:
        <br />
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </address>
      <span className="frame-year">{new Date().getFullYear()}.</span>
    </div>
  );
}
