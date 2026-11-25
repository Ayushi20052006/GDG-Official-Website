import { useEffect, useRef, useState } from "react";

const RING_DEFAULT = 32;
const RING_PAD = 10; // gap around the icon when locked

export default function CursorTrail() {
  const [isDesktop, setIsDesktop] = useState(true);

  const cursorX = useRef(-100);
  const cursorY = useRef(-100);

  const delayedX = useRef(-100);
  const delayedY = useRef(-100);

  const dotX = useRef(-100);
  const dotY = useRef(-100);

  const ringSize = useRef(RING_DEFAULT);

  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
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

    window.addEventListener("mousemove", handleMove, { capture: true });

    let animationFrameId;

    // Finds the dock icon the mouse is currently inside, by geometry only.
    const findLock = () => {
      const els = document.querySelectorAll("[data-cursor-lock]");
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const radius = r.width / 2;
        const dist = Math.hypot(cursorX.current - cx, cursorY.current - cy);
        if (dist <= radius) return { x: cx, y: cy, size: r.width };
      }
      return null;
    };

    const loop = () => {
      const lock = findLock();

      const targetX = lock ? lock.x : cursorX.current;
      const targetY = lock ? lock.y : cursorY.current;
      const targetSize = lock ? lock.size + RING_PAD : RING_DEFAULT;

      const ringLerp = lock ? 0.28 : 0.18;
      const dotLerp = lock ? 0.35 : 0.3;

      delayedX.current += (targetX - delayedX.current) * ringLerp;
      delayedY.current += (targetY - delayedY.current) * ringLerp;

      dotX.current += (targetX - dotX.current) * dotLerp;
      dotY.current += (targetY - dotY.current) * dotLerp;

      ringSize.current += (targetSize - ringSize.current) * 0.22;

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

      if (ringRef.current) {
        ringRef.current.style.width = `${ringSize.current}px`;
        ringRef.current.style.height = `${ringSize.current}px`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX.current}px, ${dotY.current}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("mousemove", handleMove, { capture: true });
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDesktop]);

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
        <div
          ref={ringRef}
          className="border-[2px] border-[#7db7ff] rounded-full"
          style={{ width: RING_DEFAULT, height: RING_DEFAULT }}
        />
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