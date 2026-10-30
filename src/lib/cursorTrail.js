// 커서가 지나간 자리에 얇은 선을 그렸다가 꼬리부터 서서히 지웁니다.
// canvas는 화면 전체를 덮고(pointer-events: none) 클릭·스크롤을 막지 않습니다.
// 흰 선 + mix-blend-mode: difference(CSS)라서 밝은 배경에서는 어둡게, 어두운 사진 위에서는 밝게 보입니다.

const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });

export function startCursorTrail(canvas, { life = 520, width = 1.6, opacity = 0.75 } = {}) {
  const ctx = canvas.getContext('2d');
  let points = [];
  let raf = 0;
  let dpr = 1;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
  };

  const draw = now => {
    raf = 0;
    points = points.filter(p => now - p.t < life);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (let i = 1; i < points.length; i++) {
      const a = points[i - 1];
      const b = points[i];
      const k = Math.max(0, 1 - (now - b.t) / life); // 1 = 방금 지나간 곳, 0 = 사라지는 꼬리
      const from = i > 1 ? mid(points[i - 2], a) : a;
      const to = mid(a, b);
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.quadraticCurveTo(a.x, a.y, to.x, to.y);
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * k})`;
      ctx.lineWidth = 0.3 + width * k;
      ctx.stroke();
    }
    if (points.length) raf = requestAnimationFrame(draw);
  };

  const onMove = e => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const now = performance.now();
    const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
    for (const ev of events.length ? events : [e]) points.push({ x: ev.clientX, y: ev.clientY, t: now });
    if (points.length > 120) points = points.slice(-120);
    if (!raf) raf = requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', onMove, { passive: true });
  return () => {
    window.removeEventListener('resize', resize);
    window.removeEventListener('pointermove', onMove);
    cancelAnimationFrame(raf);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
}
