import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import Navbar from "./ui/Navbar";
import { HeroSection } from "./ui/HeroSection";
import logo from "/logo.png";

const Home = () => {
  // 1. State for Branding Text (Visible only before 100vh)
  const [showBrandText, setShowBrandText] = useState(true);

  // 2. State for Navbar (Visible on Scroll Up)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const windowHeight = window.innerHeight;

          setShowBrandText((prev) => {
            const next = currentScrollY < windowHeight;
            return prev === next ? prev : next;
          });

          if (currentScrollY < lastScrollY || currentScrollY < 10) {
            setIsNavbarVisible((prev) => (prev ? prev : true));
          } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
            setIsNavbarVisible((prev) => (!prev ? prev : false));
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation class for the Navbar (Slide Up/Down)
  const navAnimationClass = `transition-transform duration-300 ease-in-out ${
    isNavbarVisible ? "translate-y-0" : "-translate-y-[250%]"
  }`;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <HeroSection />

      {/* --- BRANDING / LOGO SECTION --- */}
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-50 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Logo Image (Always Visible) */}
           <img
                        src={logo}
                        className="h-8 w-10 sm:h-12 sm:w-14 md:h-14 md:w-20"
                        alt="gdgLogo"
                      />

          {/* Animated "Google" Text */}
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

        {/* Animated "Developer Groups" Text */}
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

      <div className="fixed bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/50 to-transparent z-20 pointer-events-none"></div>

      {/* --- NAVBAR --- */}
      {/* This continues to hide on scroll down / show on scroll up */}
      <Navbar className={navAnimationClass} />
    </div>
  );
};

export default Home;
