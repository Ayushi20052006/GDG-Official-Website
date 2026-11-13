"use client";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  activeIndex,
  onChange,
}) => {
  const [internalActive, setInternalActive] = useState(0);
  const active = activeIndex !== undefined ? activeIndex : internalActive;

  const setActive = (newIndexOrFn) => {
    const nextIdx =
      typeof newIndexOrFn === "function"
        ? newIndexOrFn(active)
        : newIndexOrFn;
    setInternalActive(nextIdx);
    if (onChange) onChange(nextIdx);
  };

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, active]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 16) - 8;
  };

  const currentMember = testimonials[active] || testimonials[0];

  return (
    <div className="mx-auto max-w-sm px-4 pt-8 pb-8 sm:pt-12 sm:pb-12 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-10 lg:gap-16 md:grid-cols-2 items-center">
        {/* Left Side: Stacking Animated Photos with GDG Glow */}
        <div className="lg:-translate-x-6 relative">
          {/* Subtle Ambient Google Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-red-500/15 via-yellow-500/15 to-green-500/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

          <div className="relative h-80 sm:h-96 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.name}-${index}`}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.6,
                    scale: isActive(index) ? 1 : 0.92,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.45,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  {testimonial.src && (
                    <div className="h-full w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900 relative group">
                      <img
                        src={testimonial.src}
                        alt={testimonial.name}
                        width={500}
                        height={500}
                        draggable={false}
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient overlay for contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Small badge floating on photo */}
                      <div className="absolute bottom-4 left-4 z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-lg">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor:
                                index % 4 === 0
                                  ? "#4285F4"
                                  : index % 4 === 1
                                  ? "#EA4335"
                                  : index % 4 === 2
                                  ? "#FBBC04"
                                  : "#34A853",
                            }}
                          />
                          {testimonial.roleBadge || testimonial.designation?.split(",")[0] || "Leader"}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Details, Quote and Socials */}
        <div className="flex flex-col justify-between py-2 min-h-[340px] lg:translate-x-6">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
          >
            {/* GDG Role Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              {currentMember.designation || "Leadership Board"}
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {currentMember.name}
            </h3>

            {/* Stylized Framed Quote with subtle Google accent */}
            <div className="mt-6 relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-inner">
              <span className="text-4xl sm:text-5xl font-serif text-[#4285F4]/30 absolute -top-3 -left-1 select-none pointer-events-none">
                “
              </span>
              <p className="text-base sm:text-lg text-gray-200 leading-relaxed italic font-light relative z-10">
                {currentMember.quote}
              </p>
            </div>
          </motion.div>

          {/* Socials & Nav Controls */}
          <div className="mt-8 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            {/* Social Links with X SVG instead of old Twitter */}
            <div className="flex items-center gap-2 text-2xl">
              {currentMember.socials?.linkedin && (
                <a
                  href={currentMember.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-[#0077b5]/30 hover:border-[#0077b5]/50 transition-all duration-300 transform hover:scale-110"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              )}
              {currentMember.socials?.github && (
                <a
                  href={currentMember.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
              )}
              {(currentMember.socials?.twitter || currentMember.socials?.x) && (
                <a
                  href={currentMember.socials.twitter || currentMember.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-black hover:border-white/40 transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Pagination Dots & Arrow Buttons */}
            <div className="flex items-center gap-4">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Jump to leader ${i + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      isActive(i)
                        ? "w-6 h-2 bg-gradient-to-r from-[#4285F4] to-[#34A853]"
                        : "w-2 h-2 bg-white/20 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous leader"
                  className="group/button flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300"
                >
                  <IconArrowLeft className="h-4 w-4 text-gray-300 group-hover/button:-translate-x-0.5 transition-transform duration-300" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next leader"
                  className="group/button flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300"
                >
                  <IconArrowRight className="h-4 w-4 text-gray-300 group-hover/button:translate-x-0.5 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
