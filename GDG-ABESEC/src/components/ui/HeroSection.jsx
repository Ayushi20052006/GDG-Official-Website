"use client";

import React, { useEffect, useRef } from "react";

const colors = {
  50: "#f8f7f5",
  100: "#e6e1d7",
  200: "#c8b4a0",
  300: "#a89080",
  400: "#8a7060",
  500: "#6b5545",
  600: "#544237",
  700: "#3c4237",
  800: "#2a2e26",
  900: "#1a1d18",
};

const blueAccent = {
  500: "#4a6fa5",
};

export function HeroSection() {
  const gradientRef = useRef(null);

  useEffect(() => {
    // Animate words with stagger effect
    const words = document.querySelectorAll(".word");
    words.forEach((word) => {
      const delay = parseInt(word.getAttribute("data-delay") || "0", 10);
      setTimeout(() => {
        word.style.opacity = "1";
        word.style.transform = "translateY(0)";
        word.style.filter = "blur(0)";
      }, delay);
    });

    const lines = document.querySelectorAll(".grid-line");
    lines.forEach((line) => {
      const delay = line.style.animationDelay || "0s";
      const delayMs = parseFloat(delay) * 1000;
      setTimeout(() => {
        line.style.opacity = "0.15";
        line.style.strokeDashoffset = "0";
      }, delayMs);
    });

    const dots = document.querySelectorAll(".detail-dot");
    dots.forEach((dot) => {
      const delay = dot.style.animationDelay || "0s";
      const delayMs = parseFloat(delay) * 1000;
      setTimeout(() => {
        dot.style.opacity = "0.3";
      }, delayMs);
    });

    const corners = document.querySelectorAll(".corner-element");
    corners.forEach((corner) => {
      const delay = corner.style.animationDelay || "0s";
      const delayMs = parseFloat(delay) * 1000;
      setTimeout(() => {
        corner.style.opacity = "1";
      }, delayMs);
    });

    const gradient = gradientRef.current;
    function onMouseMove(e) {
      if (gradient) {
        gradient.style.left = e.clientX - 192 + "px";
        gradient.style.top = e.clientY - 192 + "px";
        gradient.style.opacity = "1";
      }
    }
    function onMouseLeave() {
      if (gradient) gradient.style.opacity = "0";
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    words.forEach((word) => {
      word.addEventListener("mouseenter", () => {
        word.style.textShadow = "0 0 20px rgba(74, 111, 165, 0.5)";
      });
      word.addEventListener("mouseleave", () => {
        word.style.textShadow = "none";
      });
    });

    function onClick(e) {
      const ripple = document.createElement("div");
      ripple.style.position = "fixed";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      ripple.style.width = "4px";
      ripple.style.height = "4px";
      ripple.style.background = "rgba(74, 111, 165, 0.6)";
      ripple.style.borderRadius = "50%";
      ripple.style.transform = "translate(-50%, -50%)";
      ripple.style.pointerEvents = "none";
      ripple.style.animation = "pulse-glow 1s ease-out forwards";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 1000);
    }
    document.addEventListener("click", onClick);

    let scrolled = false;
    function onScroll() {
      if (!scrolled) {
        scrolled = true;
        document.querySelectorAll(".floating-element").forEach((el, index) => {
          setTimeout(() => {
            el.style.animationPlayState = "running";
          }, index * 200);
        });
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen h-auto md:h-screen mb-18 bg-gradient-to-br from-[#1a1d18] via-black to-[#1a2a3a] text-[#e6e1d7] font-primary overflow-hidden relative w-full">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(74,111,165,0.18)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <line 
          x1="0" 
          y1="20%" 
          x2="100%" 
          y2="20%" 
          className="grid-line" 
          style={{ 
            animationDelay: "0.5s",
            stroke: `rgba(74,111,165,0.18)`,
            strokeDasharray: "1000",
            strokeDashoffset: "1000",
            opacity: 0,
            transition: "stroke-dashoffset 1s ease-out, opacity 0.5s ease-out"
          }} 
        />
        <line 
          x1="0" 
          y1="80%" 
          x2="100%" 
          y2="80%" 
          className="grid-line" 
          style={{ 
            animationDelay: "1s",
            stroke: `rgba(74,111,165,0.18)`,
            strokeDasharray: "1000",
            strokeDashoffset: "1000",
            opacity: 0,
            transition: "stroke-dashoffset 1s ease-out, opacity 0.5s ease-out"
          }} 
        />
        <line 
          x1="20%" 
          y1="0" 
          x2="20%" 
          y2="100%" 
          className="grid-line" 
          style={{ 
            animationDelay: "1.5s",
            stroke: `rgba(74,111,165,0.18)`,
            strokeDasharray: "1000",
            strokeDashoffset: "1000",
            opacity: 0,
            transition: "stroke-dashoffset 1s ease-out, opacity 0.5s ease-out"
          }} 
        />
        <line 
          x1="80%" 
          y1="0" 
          x2="80%" 
          y2="100%" 
          className="grid-line" 
          style={{ 
            animationDelay: "2s",
            stroke: `rgba(74,111,165,0.18)`,
            strokeDasharray: "1000",
            strokeDashoffset: "1000",
            opacity: 0,
            transition: "stroke-dashoffset 1s ease-out, opacity 0.5s ease-out"
          }} 
        />
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          className="grid-line"
          style={{ 
            animationDelay: "2.5s",
            stroke: `rgba(74,111,165,0.18)`,
            strokeDasharray: "1000",
            strokeDashoffset: "1000",
            opacity: 0,
            transition: "stroke-dashoffset 1s ease-out, opacity 0.5s ease-out"
          }}
        />
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          className="grid-line"
          style={{ 
            animationDelay: "3s",
            stroke: `rgba(74,111,165,0.18)`,
            strokeDasharray: "1000",
            strokeDashoffset: "1000",
            opacity: 0,
            transition: "stroke-dashoffset 1s ease-out, opacity 0.5s ease-out"
          }}
        />
        <circle 
          cx="20%" 
          cy="20%" 
          r="2" 
          className="detail-dot" 
          style={{ 
            animationDelay: "3s",
            fill: colors[200],
            opacity: 0,
            transition: "opacity 0.5s ease-out"
          }} 
        />
        <circle 
          cx="80%" 
          cy="20%" 
          r="2" 
          className="detail-dot" 
          style={{ 
            animationDelay: "3.2s",
            fill: colors[200],
            opacity: 0,
            transition: "opacity 0.5s ease-out"
          }} 
        />
        <circle 
          cx="20%" 
          cy="80%" 
          r="2" 
          className="detail-dot" 
          style={{ 
            animationDelay: "3.4s",
            fill: colors[200],
            opacity: 0,
            transition: "opacity 0.5s ease-out"
          }} 
        />
        <circle 
          cx="80%" 
          cy="80%" 
          r="2" 
          className="detail-dot" 
          style={{ 
            animationDelay: "3.6s",
            fill: colors[200],
            opacity: 0,
            transition: "opacity 0.5s ease-out"
          }} 
        />
        <circle 
          cx="50%" 
          cy="50%" 
          r="1.5" 
          className="detail-dot" 
          style={{ 
            animationDelay: "4s",
            fill: colors[200],
            opacity: 0,
            transition: "opacity 0.5s ease-out"
          }} 
        />
      </svg>

      <div 
        className="corner-element absolute top-8 left-8 opacity-0 transition-opacity duration-500" 
        style={{ animationDelay: "4s" }}
      >
        <div
          className="absolute top-0 left-0 w-2 h-2 opacity-30"
          style={{ background: colors[200] }}
        ></div>
      </div>
      <div 
        className="corner-element absolute top-8 right-8 opacity-0 transition-opacity duration-500" 
        style={{ animationDelay: "4.2s" }}
      >
        <div
          className="absolute top-0 right-0 w-2 h-2 opacity-30"
          style={{ background: colors[200] }}
        ></div>
      </div>
      <div 
        className="corner-element absolute bottom-8 left-8 opacity-0 transition-opacity duration-500" 
        style={{ animationDelay: "4.4s" }}
      >
        <div
          className="absolute bottom-0 left-0 w-2 h-2 opacity-30"
          style={{ background: colors[200] }}
        ></div>
      </div>
      <div 
        className="corner-element absolute bottom-8 right-8 opacity-0 transition-opacity duration-500" 
        style={{ animationDelay: "4.6s" }}
      >
        <div
          className="absolute bottom-0 right-0 w-2 h-2 opacity-30"
          style={{ background: colors[200] }}
        ></div>
      </div>

      <div className="floating-element" style={{ top: "25%", left: "15%", animationDelay: "5s" }}></div>
      <div className="floating-element" style={{ top: "60%", left: "85%", animationDelay: "5.5s" }}></div>
      <div className="floating-element" style={{ top: "40%", left: "10%", animationDelay: "6s" }}></div>
      <div className="floating-element" style={{ top: "75%", left: "90%", animationDelay: "6.5s" }}></div>

  <div className="relative z-10 min-h-screen h-auto md:h-full flex flex-col justify-between items-center px-8 py-12 md:px-16 md:py-20">
  <div className="text-center mt-20 sm:mt-24 md:mt-10">
    <h2
      className="text-xs md:text-sm font-mono font-light mt-10 md:mt-12 uppercase tracking-[0.2em] opacity-80"
      style={{ color: "rgba(230, 240, 255, 0.85)" }}
    >
      <span 
        className="word inline-block" 
        data-delay="0"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          filter: "blur(5px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        Welcome
      </span>{" "}
      <span 
        className="word inline-block" 
        data-delay="100"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          filter: "blur(5px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        to
      </span>{" "}
      <span 
        className="word inline-block" 
        data-delay="200"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          filter: "blur(5px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <b>GDG</b>
      </span>{" "}
      <span 
        className="word inline-block" 
        data-delay="300"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          filter: "blur(5px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <b>on</b>
      </span>{" "}
      <span 
        className="word inline-block" 
        data-delay="400"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          filter: "blur(5px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <b>Campus</b>
      </span>{" "}
      <span 
        className="word inline-block" 
        data-delay="500"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          filter: "blur(5px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <b>ABESEC</b>
      </span>{" "}
      <span 
        className="word inline-block" 
        data-delay="700"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          filter: "blur(5px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        Building
      </span>{" "}
      <span 
        className="word inline-block" 
        data-delay="800"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          filter: "blur(5px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        tomorrow's
      </span>{" "}
      <span 
        className="word inline-block" 
        data-delay="900"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          filter: "blur(5px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        tech
      </span>{" "}
      <span 
        className="word inline-block" 
        data-delay="1000"
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          filter: "blur(5px)",
          transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        leaders.
      </span>
    </h2>
    <div
      className="mt-4 w-16 h-px opacity-30 mx-auto"
      style={{
        background: `linear-gradient(to right, transparent, ${blueAccent[500]}, transparent)`,
      }}
    ></div>
  </div>

  <div className="text-center max-w-4xl mx-auto relative mt-0 md:mt-0">
    <h1
      className="text-3xl md:text-5xl lg:text-6xl font-extralight leading-tight tracking-tight"
      style={{ color: colors[50] }}
    >
      <div className="mb-6 md:mb-4 md:mb-6">
        <span 
          className="word inline-block" 
          data-delay="1100"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          Learn,
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="1200"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          connect,
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="1300"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          and
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="1400"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          grow
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="1500"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          with
        </span>{" "}
        <span 
          className="word inline-block md:text-[4.4rem]" 
          data-delay="1600"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          Google
        </span>{" "}
        <span 
          className="word inline-block md:text-[4.4rem]" 
          data-delay="1700"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          Developer
        </span>{" "}
        <span 
          className="word inline-block md:text-[4.4rem]" 
          data-delay="1800"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          Groups
        </span>{" "}
        <span 
          className="word inline-block md:text-[4.4rem]" 
          data-delay="1900"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          On
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="2000"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          Campus
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="2100"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          ABESEC
        </span>{" "}
      </div>
      <div
        className="text-xl md:text-2xl lg:text-3xl mt-8 sm:mt-10 md:mt-20 font-thin leading-relaxed"
        style={{ color: "rgba(230, 240, 255, 0.85)" }}
      >
        <span 
          className="word inline-block" 
          data-delay="2200"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          Workshops,
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="2300"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          tech
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="2400"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          talks,
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="2500"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          and
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="2600"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          hackathons
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="2800"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          empowering
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="2900"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          students
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="3000"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          to
        </span>{" "}
        <span 
          className="word inline-block" 
          data-delay="3100"
          style={{
            opacity: 0,
            transform: "translateY(30px)",
            filter: "blur(8px)",
            transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
          }}
        >
          innovate.
        </span>
      </div>
    </h1>
  </div>

  {/* Bottom spacer for mobile */}
  <div className="block md:hidden h-20"></div>
</div>

      <div
        id="mouse-gradient"
        ref={gradientRef}
        className="fixed pointer-events-none w-96 h-96 rounded-full blur-3xl transition-all duration-500 ease-out opacity-0"
        style={{
          background: `radial-gradient(circle, ${blueAccent[500]}0D 0%, transparent 100%)`,
        }}
      ></div>

      <style jsx>{`
        @keyframes fadeInDots {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .text-center > div:last-child {
          animation: fadeInDots 0.8s cubic-bezier(0.4, 0, 0.2, 1) 3.5s forwards;
        }
      `}</style>
    </div>
  );
}