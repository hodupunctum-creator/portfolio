// 첫 페이지의 그라데이션 원들이 천천히 떠다니며 구릅니다.
// 원은 한쪽으로 치우친 방사형 그라데이션이라, 굴러간 거리만큼 돌려 주면 실제로 구르는 것처럼 보입니다.
// 화면 가장자리에 닿으면 반쯤 걸친 채 튕겨 돌아옵니다.

export function startRollingOrbs(container, { speed = 1 } = {}) {
  const orbs = [...container.querySelectorAll('[data-orb]')].map((el, i) => {
    const angle = Number(el.dataset.dir || i * 2.1);
    const v = Number(el.dataset.speed || 28) * speed; // px/s
    return {
      el,
      x: Number(el.dataset.x || 0.5),
      y: Number(el.dataset.y || 0.5),
      vx: Math.cos(angle) * v,
      vy: Math.sin(angle) * v,
      rot: Number(el.dataset.rot || 0),
      r: 0,
      px: 0,
      py: 0
    };
  });

  let w = 0;
  let h = 0;
  const measure = () => {
    w = container.clientWidth;
    h = container.clientHeight;
    for (const o of orbs) {
      o.r = o.el.offsetWidth / 2;
      if (!o.px && !o.py) {
        o.px = o.x * w;
        o.py = o.y * h;
      }
    }
  };

  const place = o => {
    o.el.style.transform = `translate(${o.px - o.r}px, ${o.py - o.r}px) rotate(${o.rot}rad)`;
  };

  let raf = 0;
  let last = 0;
  const tick = now => {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    for (const o of orbs) {
      o.px += o.vx * dt;
      o.py += o.vy * dt;
      // 원의 절반까지는 화면 밖으로 나가도 되고, 그 이상이면 튕깁니다.
      if (o.px < 0 || o.px > w) o.vx = Math.abs(o.vx) * (o.px < 0 ? 1 : -1);
      if (o.py < 0 || o.py > h) o.vy = Math.abs(o.vy) * (o.py < 0 ? 1 : -1);
      // 굴러간 거리 / 반지름 = 회전각. 오른쪽으로 가면 시계 방향.
      o.rot += ((Math.sign(o.vx) || 1) * Math.hypot(o.vx, o.vy) * dt) / Math.max(o.r, 1);
      place(o);
    }
    raf = requestAnimationFrame(tick);
  };

  measure();
  orbs.forEach(place);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) raf = requestAnimationFrame(tick);
  const onResize = () => {
    measure();
    orbs.forEach(place);
  };
  window.addEventListener('resize', onResize);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
  };
}
