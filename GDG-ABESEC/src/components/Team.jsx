import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Navbar from "./ui/Navbar";
import logo from "/logo.png";
/* ============================================================
   TEAM DATA (UNCHANGED)
============================================================ */
const teamMembers = {
  organiser: [
    {
      name: "Arya Schwetank",
      role: "Organiser",
      description:
        "The guiding force who keeps the vision bright and the whole team moving together with calm, steady leadership.",
      img: "/TeamPageImages/Arya Schwetank.jpg",
      linkedin: "https://www.linkedin.com/in/aryaschwetank/",
      github: "https://github.com/aryaschwetank",
    },
  ],
  actingGenerals: [
    {
      name: "Prakhar Tiwari",
      role: "Acting General",
      description:
        "A natural leader who turns ideas into direction and direction into results with effortless clarity.",
      img: "/TeamPageImages/Prakhar Tiwari.jpg",
      linkedin: "https://www.linkedin.com/in/prakhar-tiwari1908/",
      github: "https://github.com/prakhar-174",
    },
    {
      name: "Ayush Jain",
      role: "Acting General",
      description:
        "A calm strategist who brings order, balance and smooth coordination wherever he steps in.",
      img: "/TeamPageImages/Ayush Jain AG.jpg",
      linkedin: "https://www.linkedin.com/in/urayushjain/",
      github: "https://github.com/URAYUSHJAIN",
    },
    {
      name: "Riya Jaiswal",
      role: "Acting General",
      description:
        "A steady leader who ensures every system, every team and every moment flows in perfect sync.",
      img: "/TeamPageImages/Riya Jaiswal.jpg",
      linkedin: "https://www.linkedin.com/in/riyajstar07/",
      github: "https://github.com/riyajstar07",
    },
    {
      name: "Kshitiz Srivastav",
      role: "Acting General",
      description:
        "The confident voice that inspires the team, leading with clarity, charm and creative energy.",
      img: "/TeamPageImages/Kshitiz Srivastav.jpg",
      linkedin: "https://www.linkedin.com/in/kshitiz-srivastav-a87028333/",
      github: "https://github.com/",
    },
    {
      name: "Deepanshu Kaushik",
      role: "Acting General",
      description:
        "A dependable organiser who brings structure, discipline and steady momentum to every plan.",
      img: "/TeamPageImages/Deepanshu Kaushik.jpg",
      linkedin: "https://www.linkedin.com/in/deepanshu-kaushik-174059297/",
      github: "https://github.com/Deepanshu-ui-dev",
    },
  ],
  leads: [
    {
      name: "Alok Ranjan Singh",
      role: "Design Lead",
      description:
        "A design soul who turns blank screens into beautiful stories with color, clarity and creativity.",
      img: "/TeamPageImages/Alok Ranjan Singh.jpg",
      linkedin: "https://www.linkedin.com/in/alok-ranjan-singh-979036296/",
      github: "https://github.com/",
    },
    {
      name: "Ayush Goyal",
      role: "Design Lead",
      description:
        "The creative spark who makes every design feel warm, alive and crafted with a personal touch.",
      img: "/TeamPageImages/Ayush Goyal.jpg",
      linkedin: "https://www.linkedin.com/in/ayush-goyal-225795274/",
      github: "https://github.com/",
    },
    {
      name: "Keshav Khippal",
      role: "Technical Lead",
      description:
        "The tech brain who calmly pieces together logic, creativity and innovation like a perfect puzzle.",
      img: "/TeamPageImages/Keshav Khippal.jpg",
      linkedin: "https://www.linkedin.com/in/keshav-khippal/",
      github: "https://github.com/KeshavKhippal",
    },
    {
      name: "Anshika Srivastav",
      role: "Promotions Lead",
      description:
        "The cheerful storyteller who makes every idea shine brighter and reach the right hearts.",
      img: "/TeamPageImages/Anshika Srivastav.jpg",
      linkedin: "https://www.linkedin.com/in/webd-anshika-srivastav/",
      github: "https://github.com/",
    },
    {
      name: "Harshit Agarwal",
      role: "Promotions Lead",
      description:
        "A creative communicator who blends charm and strategy to make every message unforgettable.",
      img: "/TeamPageImages/Harshit Agarwal.jpg",
      linkedin: "https://www.linkedin.com/in/harshit-agrawal-5aab84197/",
      github: "https://github.com/harshit-ag5965",
    },
    {
      name: "Amanya Maurya",
      role: "Events Lead",
      description:
        "The organiser with a spark—creating events that feel smooth, fun and full of lively energy.",
      img: "/TeamPageImages/Amanya Maurya.jpg",
      linkedin: "https://www.linkedin.com/in/amanya-maurya-1378aa296/",
      github: "https://github.com/",
    },
    {
      name: "Ayush Jain",
      role: "Elixir Lead",
      description:
        "A creative mind who adds magic, rhythm and fresh vibes to every moment of Elixir.",
      img: "/TeamPageImages/Ayush Jain EH.jpg",
      linkedin: "https://www.linkedin.com/in/urayushjain",
      github: "https://github.com/URAYUSHJAIN",
    },
    {
      name: "Arpan Pal",
      role: "Elixir Lead",
      description:
        "A calm creator who blends ideas and meaning to give Elixir its heart and personality.",
      img: "/TeamPageImages/Arpan Pal.jpg",
      linkedin: "https://www.linkedin.com/in/arpan-pal-9357a3310/",
      github: "https://github.com/",
    },
    {
      name: "Aditya Kumar Vaish",
      role: "Overall Coordinator",
      description:
        "The steady anchor who keeps everything balanced, organised and confidently on track.",
      img: "/TeamPageImages/Aditya Kr. OC.jpg",
      linkedin: "https://www.linkedin.com/in/aditya-vaish-482a11281/",
      github: "https://github.com/",
    },
    {
      name: "Ayushi Singh",
      role: "Production Lead",
      description:
        "A detail-loving creator who turns tiny elements into polished, perfect moments.",
      img: "/TeamPageImages/Ayushi Singh.jpg",
      linkedin: "https://www.linkedin.com/in/ayushisingh29/",
      github: "https://github.com/",
    },
    {
      name: "Aadarsh Dhiman",
      role: "Production Lead",
      description:
        "The cheerful perfectionist who ensures everything looks, feels and flows exactly right.",
      img: "/TeamPageImages/Aadarsh Dhiman.jpg",
      linkedin: "https://www.linkedin.com/in/aadarsh-dhiman-5170a634a/",
      github: "https://github.com/",
    },
    {
      name: "Sakshi Vishnoi",
      role: "Social Media Lead",
      description:
        "The creative thinker who makes every post feel expressive, aesthetic and full of personality.",
      img: "/TeamPageImages/Sakshi Vishnoi.jpg",
      linkedin: "https://www.linkedin.com/in/sakshi-vishnoi-7770b2315/",
      github: "https://github.com/sakshiv3107",
    },
    {
      name: "Aditya Kumar Vaish",
      role: "Social Media Lead",
      description:
        "The playful creative who gives social media its spark with clever ideas and bold expression.",
      img: "/TeamPageImages/Aditya Kr. SM.jpg",
      linkedin: "https://www.linkedin.com/in/aditya-vaish-482a11281/",
      github: "https://github.com/",
    },
  ],
};

/* ============================================================
   TEAM CARD COMPONENT (UNCHANGED)
============================================================ */
const TeamMemberCard = ({ member }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0.05, 0.3, 1, 0.3, 0.05],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0, 0.5, 1, 0.5, 0],
  );

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, transformOrigin: "bottom center" }}
      className="tm-card"
    >
      <div className="tm-card-inner">
        <img src={member.img} alt={member.name} className="tm-image" />
        <div className="tm-overlay">
          <div className="tm-content">
            <h3 className="tm-name">{member.name}</h3>
            <p className="tm-role">{member.role}</p>
            <p className="tm-description">{member.description}</p>
            <div className="tm-socials">
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="tm-social-link tm-linkedin-link"
              >
                <svg
                  className="tm-social-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="tm-social-link tm-github-link"
              >
                <svg
                  className="tm-social-icon"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .tm-card {
          width: 100%;
          max-width: 700px;
          height: 650px;
          position: relative;
          will-change: transform, opacity;
          transition: all 0.1s linear;
        }
        .tm-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: #1a1a1a;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .tm-card-inner:hover {
          transform: translateY(-8px);
        }
        .tm-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          filter: grayscale(100%) brightness(0.65);
          transition:
            filter 0.5s ease,
            transform 0.5s ease;
        }
        .tm-card-inner:hover .tm-image {
          filter: grayscale(0%) brightness(1);
          transform: scale(1.08);
        }
        .tm-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.97) 0%,
            rgba(0, 0, 0, 0.85) 35%,
            rgba(0, 0, 0, 0.5) 65%,
            transparent 100%
          );
          display: flex;
          align-items: flex-end;
          padding: 36px;
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .tm-card-inner:hover .tm-overlay {
          opacity: 1;
          pointer-events: all;
        }
        .tm-content {
          width: 100%;
          transform: translateY(30px);
          transition: transform 0.4s ease 0.1s;
        }
        .tm-card-inner:hover .tm-content {
          transform: translateY(0);
        }
        .tm-name {
          font-size: 2rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 10px 0;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .tm-role {
          font-size: 1rem;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 0 0 18px 0;
          font-weight: 500;
        }
        .tm-description {
          font-size: 0.95rem;
          color: #ccc;
          line-height: 1.6;
          margin: 0 0 24px 0;
          font-weight: 300;
        }
        .tm-socials {
          display: flex;
          gap: 14px;
          align-items: center;
        }
        .tm-social-link {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .tm-social-link::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }
        .tm-linkedin-link::before {
          background: linear-gradient(135deg, #0077b5 0%, #00a0dc 100%);
        }
        .tm-linkedin-link:hover {
          border-color: rgba(0, 119, 181, 0.5);
          transform: translateY(-2px);
        }
        .tm-linkedin-link:hover::before {
          opacity: 1;
        }
        .tm-github-link::before {
          background: linear-gradient(135deg, #24292e 0%, #6e40c9 100%);
        }
        .tm-github-link:hover {
          border-color: rgba(110, 64, 201, 0.5);
          transform: translateY(-2px);
        }
        .tm-github-link:hover::before {
          opacity: 1;
        }
        .tm-social-icon {
          width: 20px;
          height: 20px;
          color: #fff;
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }
        .tm-social-link:hover .tm-social-icon {
          transform: scale(1.1);
        }
        @media (max-width: 768px) {
          .tm-card {
            max-width: 100%;
            height: 500px;
          }
          .tm-overlay {
            padding: 28px;
          }
          .tm-name {
            font-size: 1.6rem;
          }
          .tm-role {
            font-size: 0.9rem;
          }
          .tm-description {
            font-size: 0.88rem;
          }
          .tm-social-link {
            width: 38px;
            height: 38px;
          }
          .tm-social-icon {
            width: 18px;
            height: 18px;
          }
        }
      `}</style>
    </motion.div>
  );
};

/* ============================================================
   SECTION HEADING COMPONENT (UNCHANGED)
============================================================ */
const SectionHeading = ({ title }) => {
  const headingRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start end", "center center"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [500, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <motion.div
      ref={headingRef}
      style={{ x, opacity }}
      className="tm-section-heading"
    >
      <h2 className="tm-section-title">{title}</h2>
      <style jsx>{`
        .tm-section-heading {
          width: 100%;
          margin-bottom: 60px;
          padding: 0 60px;
        }
        .tm-section-title {
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 900;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
          text-align: right;
        }
        @media (max-width: 768px) {
          .tm-section-heading {
            padding: 0 20px;
            margin-bottom: 40px;
          }
          .tm-section-title {
            font-size: clamp(2rem, 8vw, 3rem);
            text-align: center;
            white-space: nowrap;
          }
        }
      `}</style>
    </motion.div>
  );
};

/* ============================================================
   MAIN TEAM COMPONENT
============================================================ */
const Team = () => {
  // 1. Branding Visibility State (Visible ONLY when scroll < windowHeight)
  const [showBrandText, setShowBrandText] = useState(true);

  // 2. Navbar Visibility State (Hide on Down, Show on Up)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // --- Logic A: Branding Text ---
      // Show only if within the first screen height
      setShowBrandText(currentScrollY < windowHeight);

      // --- Logic B: Navbar Smart Scroll ---
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsNavbarVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shared class for Navbar Animation
  const navAnimationClass = `transition-transform duration-300 ease-in-out ${
    isNavbarVisible ? "translate-y-0" : "-translate-y-[250%]"
  }`;

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap");

        * {
          font-family: "Inter", sans-serif;
        }

        .tm-wrapper {
          width: 100%;
          min-height: 100vh;
          background: #000;
          position: relative;
        }
        .tm-hero {
          width: 100%;
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #0a0a0a;
          position: relative;
          padding: 40px;
          overflow: hidden;
        }
        .tm-hero-grid {
          position: absolute;
          inset: 0;
          opacity: 0.1;
          z-index: 1;
        }
        .tm-hero-grid .grid-line-h {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background: #fff;
        }
        .tm-hero-grid .grid-line-v {
          position: absolute;
          top: 0;
          height: 100%;
          width: 1px;
          background: #fff;
        }
        .tm-hero-content {
          text-align: center;
          z-index: 10;
          max-width: 6xl;
          margin: 0 auto;
        }
        .tm-hero-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: #fff;
          color: #000;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          margin-bottom: 2rem;
        }
        .tm-hero-title {
          font-size: clamp(3.75rem, 10vw, 9rem);
          font-weight: 900;
          color: #fff;
          margin: 0 0 2rem 0;
          letter-spacing: -0.05em;
          line-height: 0.95;
          text-transform: uppercase;
          position: relative;
          display: inline-block;
          background: linear-gradient(135deg, #fff 0%, #888 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .tm-hero-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 4px;
          background: #fff;
          animation: underlineGrow 0.8s ease-out 0.8s forwards;
          width: 0;
        }
        @keyframes underlineGrow {
          to {
            width: 100%;
          }
        }
        .tm-hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #666;
          max-width: 48rem;
          margin: 0 auto 3rem;
          line-height: 1.75;
          font-weight: 300;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .tm-hero-scroll {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #666;
          font-size: 0.75rem;
          z-index: 10;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .tm-section {
          width: 100%;
          min-height: 400vh;
          background: #0a0a0a;
          padding: 100px 0;
          position: relative;
        }
        .tm-organiser-section {
          margin-bottom: 120px;
        }
        .tm-organiser-container {
          max-width: 1800px;
          margin: 0 auto;
          padding: 0;
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
        }
        .tm-organiser-card-wrapper {
          flex: 0 0 640px;
        }
        .tm-generals-section,
        .tm-leads-section {
          margin-top: 100px;
          margin-bottom: -10px;
        }
        .tm-grid {
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 60px;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 60px;
          row-gap: 50px;
        }
        .tm-grid-single {
          max-width: 1800px;
          margin: 0 auto;
          padding: 0 60px;
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
        }
        .tm-grid-single .tm-card {
          max-width: 700px;
        }
        @media (max-width: 1400px) {
          .tm-organiser-container {
            gap: 30px;
          }
          .tm-organiser-card-wrapper {
            flex: 0 0 600px;
          }
          .tm-grid {
            gap: 50px;
            row-gap: 40px;
          }
        }
        @media (max-width: 1200px) {
          .tm-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
          .tm-grid-single {
            padding: 0 60px;
          }
        }
        @media (max-width: 768px) {
          .tm-hero {
            padding: 20px;
          }
          .tm-section {
            padding: 80px 0;
          }
          .tm-organiser-section,
          .tm-generals-section,
          .tm-leads-section {
            margin-bottom: 80px;
          }
          .tm-organiser-container {
            padding: 0 20px;
            flex-direction: column;
            gap: 40px;
          }
          .tm-organiser-card-wrapper {
            flex: 0 0 auto;
            width: 100%;
            order: 2;
          }
          .tm-organiser-container .tm-section-heading {
            order: 1;
            margin-bottom: 30px;
          }
          .tm-grid {
            padding: 0 20px;
            gap: 40px;
            row-gap: 40px;
          }
          .tm-grid-single {
            padding: 0 20px;
            margin-bottom: 40px;
          }
        }
      `}</style>

      <div className="tm-wrapper">
        {/* ================= BRANDING (Matches other pages) ================= */}
        <div className="fixed top-4 left-4 md:top-8 md:left-8 z-20 flex flex-col gap-2 pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            <img
              src={logo}
              className="h-8 w-10 sm:h-12 sm:w-14 md:h-14 md:w-20"
              alt="gdgLogo"
            />

            {/* Google Text Animation */}
            <AnimatePresence>
              {showBrandText && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="flex items-center gap-0.5 font-bold text-xl sm:text-2xl md:text-3xl"
                >
                  <span className="text-blue-500">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-300">o</span>
                  <span className="text-green-500">g</span>
                  <span className="text-blue-500">l</span>
                  <span className="text-red-500">e</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Developers Group Animation */}
          <AnimatePresence>
            {showBrandText && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-white text-sm sm:text-base md:text-lg tracking-wide ml-0.5"
              >
                Developer Groups
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ================= NAVBAR (Smart Scroll) ================= */}
        <Navbar className={navAnimationClass} />

        <section className="tm-hero">
          {/* Grid Background */}
          <div className="tm-hero-grid">
            <div className="grid-line-h" style={{ top: "25%" }}></div>
            <div className="grid-line-h" style={{ top: "50%" }}></div>
            <div className="grid-line-h" style={{ top: "75%" }}></div>
            <div className="grid-line-v" style={{ left: "25%" }}></div>
            <div className="grid-line-v" style={{ left: "50%" }}></div>
            <div className="grid-line-v" style={{ left: "75%" }}></div>
          </div>

          <div className="tm-hero-content">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="tm-hero-badge">THE BRILLIANT MINDS</span>
            </motion.div>

            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="
              relative 
              inline-block 
              px-4
              text-6xl md:text-8xl lg:text-9xl 
              font-black 
              mb-8 
              tracking-tighter
            "
              style={{
                background: "linear-gradient(135deg, #fff 0%, #888 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <motion.span
                initial={{ backgroundSize: "0% 4px" }}
                animate={{ backgroundSize: "100% 4px" }}
                transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
                className="
              inline
              leading-[1.25]
              bg-[linear-gradient(#ffffff,#ffffff)]
              bg-no-repeat
              bg-[position:50%_100%]
              pb-1
              [box-decoration-break:clone]
              [-webkit-box-decoration-break:clone]
              "
              >
                MEET OUR TEAM
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="tm-hero-subtitle"
            >
              The brilliant minds behind our success
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="tm-hero-scroll"
            >
              <span>Scroll down to explore</span>
            </motion.div>
          </div>
        </section>

        <div className="tm-section">
          <div className="tm-organiser-section">
            <div className="tm-organiser-container">
              <SectionHeading title="ORGANISER" />
              <div className="tm-organiser-card-wrapper">
                {teamMembers.organiser.map((member, i) => (
                  <TeamMemberCard key={i} member={member} />
                ))}
              </div>
            </div>
          </div>

          <div className="tm-generals-section">
            <SectionHeading title="ACTING GENERALS" />
            <div className="tm-grid">
              {teamMembers.actingGenerals.slice(0, 2).map((member, i) => (
                <TeamMemberCard key={i} member={member} />
              ))}
            </div>
            <div className="tm-grid-single">
              <TeamMemberCard member={teamMembers.actingGenerals[2]} />
            </div>
            <div className="tm-grid">
              {teamMembers.actingGenerals.slice(3, 5).map((member, i) => (
                <TeamMemberCard key={i} member={member} />
              ))}
            </div>
          </div>

          <div className="tm-leads-section">
            <SectionHeading title="LEADS" />
            <div className="tm-grid">
              {teamMembers.leads.slice(0, 2).map((member, i) => (
                <TeamMemberCard key={i} member={member} />
              ))}
            </div>
            <div className="tm-grid-single">
              <TeamMemberCard member={teamMembers.leads[2]} />
            </div>
            <div className="tm-grid">
              {teamMembers.leads.slice(3, 5).map((member, i) => (
                <TeamMemberCard key={i} member={member} />
              ))}
            </div>
            <div className="tm-grid-single">
              <TeamMemberCard member={teamMembers.leads[5]} />
            </div>
            <div className="tm-grid">
              {teamMembers.leads.slice(6, 8).map((member, i) => (
                <TeamMemberCard key={i} member={member} />
              ))}
            </div>
            <div className="tm-grid-single">
              <TeamMemberCard member={teamMembers.leads[8]} />
            </div>
            <div className="tm-grid">
              {teamMembers.leads.slice(9, 11).map((member, i) => (
                <TeamMemberCard key={i} member={member} />
              ))}
            </div>
            <div className="tm-grid">
              {teamMembers.leads.slice(11, 13).map((member, i) => (
                <TeamMemberCard key={i} member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
