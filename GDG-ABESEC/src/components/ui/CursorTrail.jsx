import { useEffect, useRef, useState } from "react";

export default function CursorTrail() {
  const [isDesktop, setIsDesktop] = useState(true);

  const cursorX = useRef(0);
  const cursorY = useRef(0);

  const delayedX = useRef(0);
  const delayedY = useRef(0);

  const dotX = useRef(0);
  const dotY = useRef(0);

  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Detect touch devices / mobile screens
    const checkDevice = () => {
      const isTouch =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsDesktop(!isTouch && !isSmallScreen);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMove = (e) => {
      cursorX.current = e.clientX;
      cursorY.current = e.clientY;
    };

    window.addEventListener("mousemove", handleMove);

    let animationFrameId;

    const loop = () => {
      delayedX.current += (cursorX.current - delayedX.current) * 0.18;
      delayedY.current += (cursorY.current - delayedY.current) * 0.18;

      dotX.current += (cursorX.current - dotX.current) * 0.3;
      dotY.current += (cursorY.current - dotY.current) * 0.3;

      const dx = dotX.current - delayedX.current;
      const dy = dotY.current - delayedY.current;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const maxDistance = 30;

      if (distance > maxDistance) {
        const ratio = maxDistance / distance;
        dotX.current = delayedX.current + dx * ratio;
        dotY.current = delayedY.current + dy * ratio;
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${delayedX.current}px, ${delayedY.current}px, 0) translate(-50%, -50%)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX.current}px, ${dotY.current}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDesktop]);

  // 🚫 Don’t render cursor on mobile
  if (!isDesktop) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[999999]"
        style={{
          left: 0,
          top: 0,
          transform: "translate3d(-100px, -100px, 0)",
          willChange: "transform",
          filter: "drop-shadow(0px 6px 10px rgba(255, 215, 0, 0.5))",
        }}
      >
        <div className="w-8 h-8 border-[2px] border-[#7db7ff] rounded-full" />
      </div>

      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[999999]"
        style={{
          left: 0,
          top: 0,
          transform: "translate3d(-100px, -100px, 0)",
          willChange: "transform",
        }}
      >
        <div className="w-[5px] h-[5px] bg-[#a6cfff] rounded-full" />
      </div>
    </>
  );
}
