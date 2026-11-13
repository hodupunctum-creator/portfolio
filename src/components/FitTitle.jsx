import { useLayoutEffect, useRef } from 'react';

// 제목이 칸보다 길어 두 줄로 넘어가면, 한 줄에 들어갈 때까지 글자 크기를 줄입니다.
// 너무 작아지면(min px 아래) 줄이기를 멈추고 두 줄로 넘깁니다.
export default function FitTitle({ className, children, min = 17 }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fit = () => {
      el.style.fontSize = '';
      el.style.whiteSpace = 'nowrap';
      const base = parseFloat(getComputedStyle(el).fontSize);
      const ratio = el.clientWidth / el.scrollWidth;
      if (ratio >= 1) return;
      const size = Math.floor(base * ratio * 0.98);
      if (size >= min) {
        el.style.fontSize = `${size}px`;
      } else {
        el.style.fontSize = `${min}px`;
        el.style.whiteSpace = '';
      }
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(el.parentElement);
    document.fonts?.ready.then(fit);
    return () => observer.disconnect();
  }, [children, min]);

  return (
    <h1 ref={ref} className={className}>
      {children}
    </h1>
  );
}
