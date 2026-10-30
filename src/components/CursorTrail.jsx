import { useEffect, useRef } from 'react';

import { startCursorTrail } from '../lib/cursorTrail';

// 마우스를 쓰는 화면에서만, 움직임 줄이기 설정이 꺼져 있을 때만 켜집니다.
export default function CursorTrail() {
  const ref = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduceMotion || !ref.current) return undefined;
    return startCursorTrail(ref.current);
  }, []);

  return <canvas ref={ref} className="cursor-trail" aria-hidden="true" />;
}
