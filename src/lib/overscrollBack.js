// 페이지 맨 위에서 스크롤을 '더' 올리면 그만큼 게이지가 차고, 다 차면 잠깐(hold) 머문 뒤 onTrigger를 부릅니다.
// 트랙패드 관성으로 맨 위에 도착한 직후의 스크롤은 세지 않고,
// 맨 위에서 잠깐 멈췄다가 다시 올리는 새 동작부터 셉니다. 손을 떼면 게이지는 0으로 돌아갑니다.

export function watchOverscrollBack({ threshold = 800, hold = 320, pause = 180, idle = 350, onProgress, onTrigger }) {
  let pull = 0;
  let armed = false;
  let done = false;
  let lastWheel = -Infinity;
  let idleTimer = 0;
  let triggerTimer = 0;

  const set = value => {
    pull = value;
    onProgress(Math.min(1, pull / threshold));
  };
  const reset = () => {
    armed = false;
    if (pull) set(0);
  };

  const onWheel = e => {
    if (done || e.ctrlKey) return; // ctrl + 휠 = 확대/축소
    const now = performance.now();
    const gap = now - lastWheel;
    lastWheel = now;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(reset, idle);

    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
    if (window.scrollY > 0 || dy >= 0) return reset();
    if (!armed) {
      if (gap < pause) return; // 관성으로 밀려 올라온 스크롤
      armed = true;
    }
    set(pull - dy);
    if (pull >= threshold) {
      // 게이지가 다 찬 걸 잠깐 보여 준 뒤에 넘어갑니다.
      done = true;
      clearTimeout(idleTimer);
      triggerTimer = setTimeout(onTrigger, hold);
    }
  };

  window.addEventListener('wheel', onWheel, { passive: true });
  return () => {
    window.removeEventListener('wheel', onWheel);
    clearTimeout(idleTimer);
    clearTimeout(triggerTimer);
  };
}
