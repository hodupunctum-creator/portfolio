import { useEffect, useRef } from 'react';

import { startCursorOrb } from '../lib/cursorOrb';

// 컴퓨터에서는 커서를, 휴대폰에서는 화면을 쓸어 넘기는 손가락을 따라옵니다.
// 움직임 줄이기 설정이 켜져 있으면 나오지 않습니다.
export default function CursorOrb() {
  const ref = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !ref.current) return undefined;
    return startCursorOrb(ref.current);
  }, []);

  return <div ref={ref} className="cursor-orb" aria-hidden="true" />;
}
