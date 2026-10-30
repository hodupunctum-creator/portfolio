// 첫 페이지의 그라데이션 원들이 떠다니며 구릅니다.
// 원마다 방향과 속도가 서로 다른 박자의 물결(사인 여러 개를 섞은 값)을 따라 천천히 바뀌어서,
// 직선으로 튕기는 대신 제멋대로 흘러가는 것처럼 보입니다.
// 화면 밖으로 반쯤 나가면 부드럽게 방향을 틀어 안으로 돌아옵니다.
// 원은 한쪽으로 치우친 그라데이션이라, 굴러간 거리만큼 돌려 주면 실제로 구르는 것처럼 보입니다.

const TAU = Math.PI * 2;
const rand = (a, b) => a + Math.random() * (b - a);
// 두 각의 차이를 -π..π 로
const angleDiff = (a, b) => Math.atan2(Math.sin(b - a), Math.cos(b - a));

export function startRollingOrbs(container, { speed = 1 } = {}) {
  const orbs = [...container.querySelectorAll('[data-orb]')].map((el, i) => ({
    el,
    x: Number(el.dataset.x || 0.5),
    y: Number(el.dataset.y || 0.5),
    heading: Number(el.dataset.dir || i * 2.1),
    base: Number(el.dataset.speed || 28) * speed, // px/s
    rot: Number(el.dataset.rot || 0),
    // 방향·속도·크기가 흔들리는 박자 (원마다 다르게)
    turn: [rand(0.05, 0.11), rand(0.13, 0.23), rand(0.29, 0.41)],
    turnPhase: [rand(0, TAU), rand(0, TAU), rand(0, TAU)],
    pace: rand(0.04, 0.09),
    pacePhase: rand(0, TAU),
    breath: rand(0.05, 0.1),
    breathPhase: rand(0, TAU),
    r: 0,
    px: 0,
    py: 0,
    scale: 1
  }));

  let w = 0;
  let h = 0;
  let ready = false;
  // 화면 크기를 잽니다. 아직 레이아웃이 잡히기 전이라 0이면, 원은 CSS가 놓아 둔 자리에 그대로 두고 다음에 다시 잽니다.
  const measure = () => {
    w = container.clientWidth;
    h = container.clientHeight;
    if (!w || !h) return false;
    for (const o of orbs) {
      o.r = o.el.offsetWidth / 2;
      if (!ready) {
        o.px = o.x * w;
        o.py = o.y * h;
      }
    }
    if (!ready) {
      // 이제부터는 자바스크립트가 위치를 정하므로 CSS의 시작 위치를 왼쪽 위로 돌려 둡니다.
      for (const o of orbs) {
        o.el.style.left = '0';
        o.el.style.top = '0';
      }
      ready = true;
    }
    return true;
  };

  const place = o => {
    if (!ready) return;
    o.el.style.transform = `translate(${o.px - o.r}px, ${o.py - o.r}px) rotate(${o.rot}rad) scale(${o.scale})`;
  };

  let raf = 0;
  let last = 0;
  let t = rand(0, 100);
  const tick = now => {
    if (!ready && !measure()) {
      raf = requestAnimationFrame(tick);
      return;
    }
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    t += dt;
    for (const o of orbs) {
      // 1) 방향: 느린 물결 + 빠른 물결 + 더 빠른 잔물결을 섞어 불규칙하게 휘어지게
      const wobble =
        Math.sin(t * o.turn[0] * TAU + o.turnPhase[0]) * 0.55 +
        Math.sin(t * o.turn[1] * TAU + o.turnPhase[1]) * 0.3 +
        Math.sin(t * o.turn[2] * TAU + o.turnPhase[2]) * 0.15;
      o.heading += wobble * 0.75 * dt;

      // 2) 가장자리: 원 중심이 화면 밖으로 나가기 시작하면 안쪽(가운데 근처)으로 서서히 방향을 틉니다
      const m = Math.min(w, h) * 0.04;
      if (o.px < -m || o.px > w + m || o.py < -m || o.py > h + m) {
        const toward = Math.atan2(h / 2 + (o.py > h / 2 ? -h * 0.1 : h * 0.1) - o.py, w / 2 - o.px);
        o.heading += angleDiff(o.heading, toward) * 2.2 * dt;
      }

      // 3) 속도: 0.55배 ~ 1.35배 사이로 느려졌다 빨라졌다
      const pace = 0.95 + 0.4 * Math.sin(t * o.pace * TAU + o.pacePhase);
      const v = o.base * pace;
      const dx = Math.cos(o.heading) * v * dt;
      const dy = Math.sin(o.heading) * v * dt;
      o.px += dx;
      o.py += dy;

      // 4) 구르기: 굴러간 거리 / 반지름 = 회전각. 오른쪽으로 가면 시계 방향
      o.rot += ((Math.sign(dx) || 1) * Math.hypot(dx, dy)) / Math.max(o.r, 1);
      // 5) 아주 살짝 숨 쉬듯 커졌다 작아졌다
      o.scale = 1 + 0.035 * Math.sin(t * o.breath * TAU + o.breathPhase);
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
  // 휴대폰 주소창이 접히는 등 화면 높이가 바뀌어도 다시 잽니다.
  const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(onResize) : null;
  observer?.observe(container);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    observer?.disconnect();
  };
}
