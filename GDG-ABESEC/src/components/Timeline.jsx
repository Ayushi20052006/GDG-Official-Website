import React, { useState, useEffect, useRef } from 'react';
import { Calendar, X, ArrowUpRight } from 'lucide-react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';

const MotionDiv = motion.div;

const STAGE_RATIO = "1900 / 830";

const upcomingEvent = {
  name: "EXORA 2.0",
  date: "2026-11-28T10:00:00+05:30",
  link: "https://unstop.com/hackathons/exora-20-unveil-the-build-abes-engineering-college-1799143",
  tagline: "24 Hours of Relentless Innovation and Limitless Possibilities.",
  background: "/exora-bg.png",
  line: "/exora-line.png",
  walker: "/exora-walker.png",
  title: "/exora-title.png",
};

const EventsTimelineWithUpcoming = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showPast, setShowPast] = useState(true);
  const cardRefs = useRef([]);
  const timelineRef = useRef(null);

  const pastEvents = [
    {
      id: 0,
      name: "Exora",
      date: "March 21, 2026",
      description: "A showcase of innovative projects and ideas from students, featuring interactive demos, presentations, and networking opportunities.",
      coverImage: "../exora-cover.jpg",
      gallery: [
        "../exora1.jpg",
        "../exora2.jpg",
        "../exora3.jpg",
        "../exora4.jpg"
      ]
    },
    {
      id: 1,
      name: "MTG 2.0",
      date: "November 29, 2025",
      description: "Annual technology conference featuring keynote speakers from leading tech companies and interactive workshops on AI, blockchain, and cloud computing.",
      coverImage: "../mtg2.0.jpg",
      gallery: [
        "../mtg1.JPG",
        "../mtg2.JPG",
        "../mtg3.JPG",
        "../mtg4.JPG"
      ]
    },
    {
      id: 2,
      name: "Hackheaven 2.0",
      date: "May 3, 2025",
      description: "24-hour coding marathon where developers collaborated to build innovative solutions for real-world problems. Amazing projects were showcased.",
      coverImage: "../hackheaven4.jpg",
      gallery: [
        "../hackheaven1.jpg",
        "../hackheaven2.jpg",
        "../hackheaven3.jpg",
        "../hackheaven5.jpeg"
      ]
    },
    {
      id: 3,
      name: "Tech Winter Break",
      date: "December 26, 2024",
      description: "Yearly gathering for networking, knowledge sharing, and building connections. Featured lightning talks and open discussions on latest trends.",
      coverImage: "../techwinter4.jpeg",
      gallery: [
        "../techwinter1.jpg",
        "../techwinter2.jpg",
        "../techwinter3.jpg",
        "../techwinter5.jpg"
      ]
    },
    {
      id: 4,
      name: "Branch & Beyond",
      date: "July 3, 2024",
      description: "Hands-on workshops covering modern web development, design thinking, and git methodologies for all skill levels.",
      coverImage: "../event3.png",
      gallery: [
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop"
      ]
    },
  ];

  useEffect(() => {
    if (!showPast) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    setTimeout(() => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => observer.disconnect();
  }, [showPast]);

  useEffect(() => {
    let rafId;
    let currentProgress = 0;

    const handleScroll = () => {
      if (!timelineRef.current) return;

      const timelineRect = timelineRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const timelineHeight = timelineRef.current.offsetHeight;

      const scrollTop = Math.max(0, -timelineRect.top + viewportHeight * 0.4);
      const maxScroll = timelineHeight - viewportHeight * 0.1;
      const targetProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));

      const smoothScroll = () => {
        currentProgress += (targetProgress - currentProgress) * 0.2;

        if (Math.abs(targetProgress - currentProgress) > 0.001) {
          setScrollProgress(currentProgress);
          rafId = requestAnimationFrame(smoothScroll);
        } else {
          setScrollProgress(targetProgress);
        }
      };

      cancelAnimationFrame(rafId);
      smoothScroll();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [showPast]);

  const UpcomingEventsPlaceholder = () => {
    const areaRef = useRef(null);

    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const springX = useSpring(pointerX, { stiffness: 120, damping: 16, mass: 0.6 });
    const springY = useSpring(pointerY, { stiffness: 120, damping: 16, mass: 0.6 });

    const cardRotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
    const cardRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

    const bgX = useTransform(springX, [-0.5, 0.5], [16, -16]);
    const bgY = useTransform(springY, [-0.5, 0.5], [12, -12]);

    const lineX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
    const lineY = useTransform(springY, [-0.5, 0.5], [-10, 10]);
    const walkerX = useTransform(springX, [-0.5, 0.5], [-12, 12]);

    const titleX = useTransform(springX, [-0.5, 0.5], [-28, 28]);
    const titleY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
    const titleRotate = useTransform(springX, [-0.5, 0.5], [-1.2, 1.2]);

    const countX = useTransform(springX, [-0.5, 0.5], [-38, 38]);
    const countY = useTransform(springY, [-0.5, 0.5], [-26, 26]);

    const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);
    const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(176,130,255,0.22), transparent 45%)`;

    const calculateTimeLeft = () => {
      const difference = new Date(upcomingEvent.date).getTime() - Date.now();

      if (difference <= 0) return null;

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }, []);

    const countdown = [
      { label: "DAYS", value: timeLeft?.days },
      { label: "HOURS", value: timeLeft?.hours },
      { label: "MINUTES", value: timeLeft?.minutes },
      { label: "SECONDS", value: timeLeft?.seconds },
    ];

    const handlePointerMove = (event) => {
      if (event.pointerType !== "mouse" || !areaRef.current) return;

      const bounds = areaRef.current.getBoundingClientRect();
      pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
      pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    };

    const resetPointer = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    return (
      <section className="w-full bg-black px-3 py-8 sm:px-4 sm:py-10 md:py-14" style={{ perspective: 1200 }}>
        <a
          ref={areaRef}
          href={upcomingEvent.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Register for ${upcomingEvent.name} on Unstop`}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
          className="exora-link group mx-auto block w-full max-w-6xl cursor-pointer"
        >
          <MotionDiv
            style={{ rotateX: cardRotateX, rotateY: cardRotateY, transformPerspective: 1200 }}
            className="w-full rounded-[1.5rem] shadow-[0_12px_50px_rgba(0,0,0,0.4)] transition-shadow duration-500 group-hover:shadow-[0_20px_70px_rgba(120,70,200,0.3)] sm:rounded-[2rem]"
          >
            <div
              className="exora-card relative h-[400px] w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#070712] transition-[border-color] duration-500 group-hover:border-fuchsia-200/40 sm:h-[500px] sm:rounded-[2rem] md:h-[580px]"
            >
              <MotionDiv
                className="exora-art absolute -inset-8 bg-cover"
                style={{
                  backgroundImage: `url(${upcomingEvent.background})`,
                  backgroundPosition: 'center top',
                  x: bgX,
                  y: bgY,
                }}
              />

              <MotionDiv
                className="pointer-events-none absolute inset-0 mix-blend-screen"
                style={{ backgroundImage: glareBg }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

              <div
                className="pointer-events-none absolute left-1/2 top-[8%] z-20 w-[150%] -translate-x-1/2 sm:top-[2%] sm:w-full"
                style={{ aspectRatio: STAGE_RATIO }}
              >
                <MotionDiv className="absolute inset-0" style={{ x: lineX, y: lineY }}>
                  <div className="h-full w-full origin-[50%_30%] scale-[0.76] sm:scale-100">
                  <div className="exora-float-slow relative h-full w-full">
                    <img
                      src={upcomingEvent.line}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full select-none"
                      draggable={false}
                    />
                    <MotionDiv className="absolute inset-0" style={{ x: walkerX }}>
                      <img
                        src={upcomingEvent.walker}
                        alt=""
                        aria-hidden="true"
                        className="h-full w-full select-none"
                        draggable={false}
                      />
                    </MotionDiv>
                  </div>
                  </div>
                </MotionDiv>

                <MotionDiv
                  className="absolute inset-0"
                  style={{ x: titleX, y: titleY, rotate: titleRotate }}
                >
                  <img
                    src={upcomingEvent.title}
                    alt={upcomingEvent.name}
                    className="absolute inset-0 h-full w-full select-none"
                    draggable={false}
                  />
                  <p className="tagline-text absolute left-1/2 top-[79%] w-[62%] -translate-x-1/2 text-center text-[9px] font-medium leading-snug tracking-[0.04em] sm:w-[56%] sm:text-sm md:text-base">
                    {upcomingEvent.tagline}
                  </p>
                </MotionDiv>
              </div>

              <MotionDiv
                className="absolute inset-x-0 bottom-[5%] z-30 flex flex-col items-center px-4 text-center sm:bottom-[6%]"
                style={{ x: countX, y: countY }}
              >
                {timeLeft ? (
                  <div className="relative w-full max-w-[16.5rem] sm:max-w-[26rem]">
                    <div>
                      <div className="countdown-panel relative isolate overflow-hidden rounded-xl border border-white/20 px-1 py-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_18px_30px_rgba(0,0,0,0.55),0_0_28px_rgba(150,90,240,0.22)] sm:rounded-2xl sm:px-4 sm:py-3.5">
                        <div className="relative z-10 grid grid-cols-4 divide-x divide-white/20">
                          {countdown.map((item) => (
                            <div key={item.label} className="flex min-w-0 flex-col items-center px-0.5 sm:px-2">
                              <div className="event-clock-font text-[clamp(1.05rem,5.8vw,1.3rem)] font-medium leading-none tracking-[-0.05em] tabular-nums text-white drop-shadow-[0_0_8px_rgba(200,150,255,0.45)] sm:text-[1.7rem]">
                                {String(item.value ?? 0).padStart(2, "0")}
                              </div>
                              <span className="mt-1.5 font-[Inter,Arial,sans-serif] text-[6px] font-medium tracking-[0.08em] text-white/75 sm:text-[9px] sm:tracking-[0.22em]">
                                {item.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mx-auto mt-1 h-2 w-3/4 rounded-full bg-black/60 blur-md" />
                      <p className="mt-0.5 font-[Inter,Arial,sans-serif] text-[8px] font-medium tracking-[0.18em] text-white/80 sm:text-[10px] sm:tracking-[0.24em]">
                        THE COUNTDOWN BEGINS
                      </p>
                    </div>
                  </div>
                ) : (
                  <h3 className="rounded-2xl border border-white/20 bg-black/40 px-6 py-3 text-2xl font-black tracking-widest text-white sm:text-4xl">
                    LIVE NOW
                  </h3>
                )}
              </MotionDiv>

              <div className="pointer-events-none absolute right-4 top-4 z-50 flex h-9 w-9 -translate-x-2 translate-y-2 items-center justify-center rounded-full border border-fuchsia-200/30 bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 sm:h-11 sm:w-11">
                <ArrowUpRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              <div className="pointer-events-none absolute inset-3 z-40 rounded-[1.5rem] border border-white/10" />
              <div className="pointer-events-none absolute bottom-0 left-0 z-40 h-px w-full bg-gradient-to-r from-indigo-400/50 via-fuchsia-500/80 to-orange-300/60 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </MotionDiv>
        </a>
      </section>
    );
  };

  return (
    <>
      <div className="sticky top-0 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setShowPast(false)}
              className={`relative px-8 py-3 text-sm font-bold tracking-wider transition-all duration-300 overflow-hidden ${!showPast ? 'text-black' : 'text-white hover:text-gray-300'}`}
            >
              {!showPast && (
                <div
                  className="absolute inset-0 bg-white"
                  style={{
                    animation: 'slideFromRight 0.4s ease-out forwards'
                  }}
                />
              )}
              <span className="relative z-10">UPCOMING EVENTS</span>
            </button>

            <button
              onClick={() => setShowPast(true)}
              className={`relative px-8 py-3 text-sm font-bold tracking-wider transition-all duration-300 overflow-hidden ${showPast ? 'text-black' : 'text-white hover:text-gray-300'}`}
            >
              {showPast && (
                <div
                  className="absolute inset-0 bg-white"
                  style={{
                    animation: 'slideFromLeft 0.4s ease-out forwards'
                  }}
                />
              )}
              <span className="relative z-10">PAST EVENTS</span>
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

          .event-clock-font {
            font-family: 'Space Grotesk', 'Inter', sans-serif;
            font-variant-numeric: tabular-nums;
          }

          @keyframes slideFromLeft {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }

          @keyframes slideFromRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }

          .countdown-panel {
            background:
              radial-gradient(ellipse at 18% 120%, rgba(140, 80, 230, 0.35), transparent 58%),
              linear-gradient(135deg, rgba(22, 14, 44, 0.6), rgba(0, 0, 0, 0.45));
          }

          @keyframes exoraFloatSlow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }

          .exora-float-slow {
            animation: exoraFloatSlow 7s ease-in-out infinite;
          }
          .tagline-text {
            font-family: 'Space Grotesk', 'Inter', sans-serif;
            color: rgba(255, 255, 255, 0.92);
            text-shadow:
              0 1px 2px rgba(0, 0, 0, 0.7),
              0 0 10px rgba(176, 130, 255, 0.35);
          }

          .exora-link:focus-visible {
            outline: 2px solid rgba(190, 140, 255, 0.8);
            outline-offset: 4px;
            border-radius: 2rem;
          }

          @media (prefers-reduced-motion: reduce) {
            .exora-art,
            .countdown-panel,
            .exora-float-slow {
              animation: none !important;
              transition: none !important;
            }
          }
        `}
      </style>

      {!showPast ? (
        <div
          key="upcoming"
          style={{
            animation: 'slideInFromRight 0.5s ease-out'
          }}
        >
          <UpcomingEventsPlaceholder />
        </div>
      ) : (
        <div
          key="past"
          style={{
            animation: 'slideInFromLeft 0.5s ease-out'
          }}
        >
          <div className="min-h-screen bg-black py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-5xl font-bold text-center text-white mb-4">
                Our Journey
              </h1>
              <p className="text-center text-gray-400 mb-16 text-lg">
                Celebrating moments that shaped our community
              </p>

              <div className="relative" ref={timelineRef}>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-zinc-800"></div>

                <div
                  className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-blue-500 ease-out will-change-transform"
                  style={{
                    height: `${scrollProgress * 100}%`,
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                    transition: 'none'
                  }}
                ></div>

                <div
                  className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-lg z-20 will-change-transform"
                  style={{
                    top: `${scrollProgress * 100}%`,
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)',
                    transition: 'none'
                  }}
                >
                  <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute inset-0 bg-white rounded-full scale-50"></div>
                </div>

                {pastEvents.map((event, index) => {
                  const cardElement = cardRefs.current[index];
                  let dotTop = 0;

                  if (cardElement) {
                    const cardRect = cardElement.getBoundingClientRect();
                    const timelineRect = timelineRef.current?.getBoundingClientRect();
                    if (timelineRect) {
                      dotTop = cardRect.top - timelineRect.top + cardRect.height / 2;
                    }
                  }

                  return (
                    <div
                      key={`dot-${event.id}`}
                      className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                      style={{ top: `${dotTop}px` }}
                    >
                      {visibleCards.has(index) && (
                        <div
                          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500/20 rounded-full blur-lg transition-opacity duration-700"
                          style={{
                            transitionDelay: `${index * 200}ms`
                          }}
                        ></div>
                      )}

                      <div
                        className={`w-3 h-3 bg-zinc-900 border-2 border-blue-500 rounded-full transition-all duration-700 relative ${visibleCards.has(index) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                          }`}
                        style={{
                          transitionDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                  );
                })}

                {pastEvents.map((event, index) => (
                  <div
                    key={event.id}
                    ref={(el) => (cardRefs.current[index] = el)}
                    data-index={index}
                    className={`relative mb-12 md:mb-32 transition-all duration-1000 ${
                      event.id % 2 === 1
                        ? 'pr-[52%] md:pr-[52%]'
                        : 'pl-[52%] md:pl-[52%]'
                      } ${visibleCards.has(index)
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-20'
                      }`}
                    style={{
                      transitionDelay: `${index * 150}ms`
                    }}
                  >
                    <div
                      className="relative group"
                      onMouseEnter={() => {
                        if (window.innerWidth >= 768) {
                          setHoveredEvent(event.id);
                        }
                      }}
                      onMouseLeave={() => {
                        if (window.innerWidth >= 768) {
                          setHoveredEvent(null);
                        }
                      }}
                    >
                      <div className="bg-zinc-900 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 md:hover:scale-105 border border-zinc-800 md:hover:border-blue-500/50 relative z-20 max-w-full">
                        <div className="relative h-32 md:h-48 overflow-hidden">
                          <img
                            src={event.coverImage}
                            alt={event.name}
                            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-110 md:group-hover:rotate-1"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        </div>

                        <div className="p-3 md:p-6">
                          <h3 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2 break-words leading-tight md:leading-snug md:group-hover:text-blue-400 transition-colors duration-300">
                            {event.name}
                          </h3>
                          <div className="flex items-center text-gray-400 mb-2 md:mb-3">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                            <span className="text-xs md:text-sm">{event.date}</span>
                          </div>

                          <div
                            className={`hidden md:block overflow-hidden transition-all duration-500 ${hoveredEvent === event.id
                                ? 'max-h-32 opacity-100'
                                : 'max-h-0 opacity-0'
                              }`}
                          >
                            <p className="text-gray-300 text-sm mb-4">
                              {event.description}
                            </p>
                          </div>

                          <div
                            className={`hidden md:block transition-all duration-500 ${hoveredEvent === event.id
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-4 pointer-events-none'
                              }`}
                          >
                            <button
                              onClick={() => setSelectedEvent(event)}
                              className="group relative px-6 py-2 bg-transparent border-2 border-blue-500 text-white font-semibold rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-in-out hover:text-white">
                              <span className="absolute inset-0 bg-blue-500 -z-10 translate-x-full group-hover:translate-x-0 transition-all duration-500 ease-in-out"></span>
                              View More →
                            </button>
                          </div>

                          <div className="md:hidden mt-2">
                            <button
                              onClick={() => setSelectedEvent(event)}
                              className="w-full px-4 py-2 text-sm bg-blue-500 text-white font-semibold rounded-lg transition-all duration-300 active:scale-95">
                              View More →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedEvent && (
              <div
                className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedEvent(null)}
              >
                <div
                  className="bg-zinc-900 rounded-3xl p-8 max-w-3xl w-full border border-zinc-800 shadow-2xl shadow-blue-500/20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {selectedEvent.name}
                      </h2>
                      <p className="text-gray-400 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {selectedEvent.date}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-zinc-800 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {selectedEvent.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    {selectedEvent.gallery.map((img, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-xl shadow-xl border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 group"
                        style={{
                          animation: `gentleBounce ${2 + index * 0.2}s ease-in-out ${index * 0.1}s infinite`
                        }}
                      >
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideInFromLeft {
            from {
              opacity: 0;
              transform: translateX(-50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(50px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes gentleBounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </>
  );
};

export default EventsTimelineWithUpcoming;