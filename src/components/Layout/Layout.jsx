import { useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { site } from '../../data/site';
import './Layout.css';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
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
