// 을유1945 글꼴의 '청'은 오른쪽 여백이 넓어 '청년'이 벌어져 보입니다.
// 제목에서만 '청' 뒤 간격을 살짝 좁혀 다른 글자와 맞춥니다.
export default function titleText(title) {
  const parts = title.split(/(청(?=년))/);
  if (parts.length === 1) return title;
  return parts.map((part, i) =>
    part === '청' && i % 2 === 1 ? (
      <span key={i} className="tight-kern">
        청
      </span>
    ) : (
      part
    )
  );
}
