// 작업 사진 위 원 안에 들어가는 흰 ↗ 화살표. 글꼴·기기마다 모양이 달라지지 않도록 선으로 그립니다.
export default function ArrowIcon() {
  return (
    <svg className="arrow-icon" viewBox="4 4 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </svg>
  );
}
