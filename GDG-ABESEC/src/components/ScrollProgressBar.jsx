import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef(null);
  const targetScale = useRef(0);
  const currentScale = useRef(0);
  const rafId = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      targetScale.current = docHeight > 0 ? scrollTop / docHeight : 0;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const smoothUpdate = () => {
      const diff = targetScale.current - currentScale.current;
      if (Math.abs(diff) > 0.0005) {
        currentScale.current += diff * 0.18;
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${currentScale.current})`;
        }
      }
      rafId.current = requestAnimationFrame(smoothUpdate);
    };

    rafId.current = requestAnimationFrame(smoothUpdate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] z-[9999] shadow-md shadow-blue-500/20"
      style={{
        transformOrigin: "0% 50%",
        transform: "scaleX(0)",
        willChange: "transform",
      }}
    />
  );
}
