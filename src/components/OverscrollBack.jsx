import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { watchOverscrollBack } from '../lib/overscrollBack';

// 작품 상세 페이지 맨 위에서 스크롤을 계속 올리면 Works 목록의 그 작품 위치로 돌아갑니다.
// 마우스·트랙패드를 쓰는 화면에서만 켜집니다 (휴대폰은 당겨서 새로고침과 겹치기 때문).
export default function OverscrollBack({ fromId }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    setProgress(0);
    return watchOverscrollBack({
      onProgress: setProgress,
      onTrigger: () => navigate('/works', { state: { from: fromId } })
    });
  }, [fromId, navigate]);

  return (
    <div className="overscroll-back" style={{ '--p': progress }} aria-hidden="true">
      <span className="overscroll-back-bar" />
      <span className="overscroll-back-label">↑ Works</span>
    </div>
  );
}
