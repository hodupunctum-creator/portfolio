import { useEffect, useRef } from 'react';

import { startCursorOrb } from '../lib/cursorOrb';

// 마우스를 쓰는 화면에서만, 움직임 줄이기 설정이 꺼져 있을 때만 켜집니다.
export default function CursorOrb() {
  const ref = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion || !ref.current) return undefined;
    return startCursorOrb(ref.current);
  }, []);

  return <div ref={ref} className="cursor-orb" aria-hidden="true" />;
}
