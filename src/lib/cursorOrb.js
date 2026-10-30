// 작은 그라데이션 원이 커서를 살짝 늦게 따라옵니다. 링크·버튼 위에서는 조금 커집니다.

export function startCursorOrb(el, { ease = 0.16 } = {}) {
  let tx = -100;
  let ty = -100;
  let x = tx;
  let y = ty;
  let scale = 1;
  let targetScale = 1;
  let visible = false;
  let raf = 0;

  const tick = () => {
    x += (tx - x) * ease;
    y += (ty - y) * ease;
    scale += (targetScale - scale) * 0.15;
    el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`;
    const still = Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1 && Math.abs(targetScale - scale) < 0.001;
    raf = still ? 0 : requestAnimationFrame(tick);
  };
  const wake = () => {
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const onMove = e => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    tx = e.clientX;
    ty = e.clientY;
    if (!visible) {
      visible = true;
      x = tx;
      y = ty;
      el.style.opacity = '1';
    }
    targetScale = e.target.closest && e.target.closest('a, button') ? 1.9 : 1;
    wake();
  };
  const onLeave = () => {
    visible = false;
    el.style.opacity = '0';
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onLeave);
  return () => {
    window.removeEventListener('pointermove', onMove);
    document.documentElement.removeEventListener('mouseleave', onLeave);
    cancelAnimationFrame(raf);
  };
}
