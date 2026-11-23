import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import Navbar from "./ui/Navbar";
import logo from "/logo.webp";

const EventHero = ({ showPast, setShowPast }) => {
  /* ===== STATE MANAGEMENT ===== */
  // 1. Branding Text State (Visible only before 100vh)
  const [showBrandText, setShowBrandText] = useState(true);

  // 2. Navbar State (Visible on Scroll Up)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  const brandControls = useAnimation();
  const brandSubControls = useAnimation();

  /* ===== SCROLL LISTENER (COMBINED) ===== */
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Logic A: Branding Text (100vh check)
      setShowBrandText(currentScrollY < windowHeight);

      // Logic B: Navbar (Smart Scroll - Hide Down / Show Up)
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsNavbarVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== BRANDING ANIMATION EFFECT ===== */
  useEffect(() => {
    if (showBrandText) {
      brandControls.start({
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      });

      brandSubControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: 0.1 },
      });
    } else {
      brandControls.start({
        opacity: 0,
        x: -20,
        transition: { duration: 0.4, ease: "easeIn" },
      });

      brandSubControls.start({
        opacity: 0,
        y: -10,
        transition: { duration: 0.3, ease: "easeIn" },
      });
    }
  }, [showBrandText, brandControls, brandSubControls]);

  // Navbar Animation Class
  const navAnimationClass = `transition-transform duration-300 ease-in-out ${
    isNavbarVisible ? "translate-y-0" : "-translate-y-[250%]"
  }`;

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

          * {
            font-family: 'Inter', sans-serif;
          }

          html {
            scroll-behavior: smooth;
          }

          ::-webkit-scrollbar {
            width: 6px;
          }
          
          ::-webkit-scrollbar-track {
            background: black;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 3px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #444;
          }
        `}
      </style>

      {/* ================= BRANDING (Fixed Top Left) ================= */}
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-20 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
           <img
                                  src={logo}
                                  className="h-8 w-10 sm:h-12 sm:w-14 md:h-14 md:w-20"
                                  alt="gdgLogo"
                                />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={brandControls}
            className="flex items-center gap-0.5 font-bold text-xl sm:text-2xl md:text-3xl"
          >
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-300">o</span>
            <span className="text-green-500">g</span>
            <span className="text-blue-500">l</span>
            <span className="text-red-500">e</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={brandSubControls}
          className="text-white text-sm sm:text-base md:text-lg tracking-wide ml-0.5"
        >
          Developer Groups
        </motion.div>
      </div>

      {/* ================= NAVBAR (Smart Scroll) ================= */}
      {/* Moved outside the section to handle fixed positioning cleanly */}
      <Navbar className={navAnimationClass} />

      {/* ================= HERO SECTION ================= */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden bg-black"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-white" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-white" />
          <div className="absolute top-3/4 left-0 w-full h-px bg-white" />
          <div className="absolute top-0 left-1/4 h-full w-px bg-white" />
          <div className="absolute top-0 left-1/2 h-full w-px bg-white" />
          <div className="absolute top-0 left-3/4 h-full w-px bg-white" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-white text-black text-sm font-semibold tracking-wider">
              DISCOVER OUR EVENTS
            </span>
          </motion.div>
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black    mb-8 tracking-tighter relative  inline-block pb-4"
            style={{
              background: "linear-gradient(135deg, #fff 0%, #888 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
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
              OUR EVENTS
              </motion.span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-xl text-gray-500 max-w-3xl mx-auto mb-12 uppercase tracking-[0.15em] font-light"
          >
            Experiences that inspire learning & innovation
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-gray-500 text-xs uppercase tracking-[0.2em]"
          >
            Scroll down to explore
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default EventHero;
