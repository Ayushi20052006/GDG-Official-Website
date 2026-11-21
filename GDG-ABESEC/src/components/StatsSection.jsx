"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import img1 from "../assets/img1.png";
import cloud from "../assets/cloud.png";
import drive from "../assets/drive.png";
import firebase from "../assets/firebase.png";
import flutter from "../assets/flutter.png";
import mail from "../assets/mail.png";
import play from "../assets/play.png";
import youtube from "../assets/youtube.png";
import android from "../assets/android.png";

const useIntersectionObserver = (ref, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setIsIntersecting(true);
          setHasIntersected(true);
        }
      },
      { threshold: 0.2, ...options }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, hasIntersected]);

  return isIntersecting;
};

const FloatingAppIcon = ({
  position,
  delay,
  isVisible,
  index,
  iconSrc,
  iconAlt
}) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isVisible) {
      controls.start({
        x: `${position.x}vw`,
        y: `${position.y}vh`,
        scale: [0, 1.1, 1],
        opacity: 1,
        transition: {
          duration: 0.7,
          delay: delay,
          ease: "easeOut",
        }
      });
    }
  }, [isVisible, controls, position.x, position.y, delay]);

  // Unique float animation timing per icon using GPU-accelerated CSS
  const floatDuration = 4 + (index % 4) * 0.8;
  const floatDelay = (index * 0.35) % 2;

  return (
    <motion.div
      className="absolute w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden border-2"
      style={{
        left: "50%",
        top: "50%",
        backgroundColor: "#0a0a0a",
        borderColor: position.borderColor,
        willChange: "transform",
      }}
      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
      animate={controls}
    >
      <div
        className="w-full h-full flex items-center justify-center"
        style={{
          animation: isVisible ? `gentleFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite alternate` : "none",
          willChange: "transform",
        }}
      >
        <img
          src={iconSrc}
          alt={iconAlt || `App Icon ${index + 1}`}
          loading="lazy"
          decoding="async"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 object-contain"
        />
      </div>
    </motion.div>
  );
};

const StatItem = ({ headline, number, suffix, delay, isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        isVisible
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="text-center"
    >
      {headline && (
        <motion.p
          className="text-sm md:text-base text-[#737373] mb-2 font-normal"
          style={{ fontFamily: "'Inter', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.15 }}
        >
          {headline}
        </motion.p>
      )}
      <h3
        className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        <span className="text-[#4285F4]">{number}</span>
        {suffix && (
          <span
            className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-normal text-[#a3a3a3] ml-2"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {suffix}
          </span>
        )}
      </h3>
    </motion.div>
  );
};

export default function StatsSection() {
  const sectionRef = useRef(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.25 });

  const googleColors = [
    { borderColor: "#4285F4" },
    { borderColor: "#EA4335" },
    { borderColor: "#FBBC05" },
    { borderColor: "#34A853" },
    { borderColor: "#4285F4" },
    { borderColor: "#EA4335" },
    { borderColor: "#FBBC05" },
    { borderColor: "#34A853" }
  ];

  const appIcons = [
    { src: "https://www.svgrepo.com/show/353810/google-developers.svg", alt: "Google Developers" },
    { src: img1, alt: "Chrome" },
    { src: android, alt: "Android" },
    { src: youtube, alt: "YouTube" },
    { src: mail, alt: "Gmail" },
    { src: play, alt: "Google Play" },
    { src: drive, alt: "Google Drive" },
    { src: cloud, alt: "Google Cloud" },
    { src: firebase, alt: "Firebase" },
    { src: flutter, alt: "Flutter" }
  ];

  const iconPositions = [
    { x: -40, y: -35, ...googleColors[0] },
    { x: -25, y: -45, ...googleColors[1] },
    { x: 20, y: -10, ...googleColors[2] },
    { x: 30, y: -35, ...googleColors[3] },
    { x: 30, y: 15, ...googleColors[4] },
    { x: 10, y: -35, ...googleColors[5] },
    { x: -40, y: 0, ...googleColors[6] },
    { x: -30, y: 28, ...googleColors[7] },
    { x: 18, y: 30, ...googleColors[0] },
    { x: -7, y: 35, ...googleColors[1] }
  ];

  const stats = [
    { headline: "A growing community of", number: "1,500+", suffix: " developers" },
    { headline: "", number: "20+", suffix: " events" },
    { headline: "", number: "15+", suffix: " projects" }
  ];

  return (
    <div className="relative min-h-screen hidden md:block">
      <style>{`
        @keyframes gentleFloat {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(0, -10px, 0) rotate(2deg);
          }
          100% {
            transform: translate3d(0, 8px, 0) rotate(-2deg);
          }
        }
      `}</style>
      <section
        ref={sectionRef}
        className="sticky top-0 min-h-screen bg-[#0a0a0a] py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-20 overflow-hidden flex items-center justify-center"
      >
        <div className="absolute inset-0 pointer-events-none">
          {iconPositions.map((position, index) => (
            <FloatingAppIcon
              key={index}
              position={position}
              delay={0.2 + index * 0.08}
              isVisible={isVisible}
              index={index}
              iconSrc={appIcons[index]?.src || appIcons[0].src}
              iconAlt={appIcons[index]?.alt || appIcons[0].alt}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center space-y-12 md:space-y-16">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              headline={stat.headline}
              number={stat.number}
              suffix={stat.suffix}
              delay={0.5 + index * 0.2}
              isVisible={isVisible}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
