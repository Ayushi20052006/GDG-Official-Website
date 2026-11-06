import React, { useState, useEffect, useRef } from 'react';
import { Calendar, X, Clock } from 'lucide-react';

const EventsTimelineWithUpcoming = () => {
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showPast, setShowPast] = useState(true); // Default to Past Events
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

    // Small delay to ensure refs are populated
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
      
      // Start earlier by reducing the initial offset
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

  const UpcomingEventsPlaceholder = () => (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center text-white mb-4">
          Upcoming Events
        </h1>
        <p className="text-center text-gray-400 mb-16 text-lg">
          Exciting new experiences on the horizon
        </p>

        <div className="flex justify-center">
          <div
            className="relative bg-zinc-900/40 backdrop-blur-md rounded-2xl overflow-hidden border border-zinc-800/50 hover:border-blue-500/30 transition-all duration-500 group w-full max-w-2xl"
            style={{
              animation: `fadeInUp 0.6s ease-out both`
            }}
          >
            <div className="relative h-64 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop')] bg-cover bg-center blur-xl opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
              
              <div className="absolute top-4 right-4 px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full">
                <span className="text-blue-400 text-xs font-semibold tracking-wider">COMING SOON</span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-10 h-10 text-gray-500" />
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="h-4 w-3/4 bg-zinc-800/50 rounded mb-4 animate-pulse"></div>
              <div className="h-3 w-1/2 bg-zinc-800/30 rounded mb-6 animate-pulse"></div>
              
              <div className="space-y-3 mb-6">
                <div className="h-2 w-full bg-zinc-800/20 rounded animate-pulse"></div>
                <div className="h-2 w-11/12 bg-zinc-800/20 rounded animate-pulse"></div>
                <div className="h-2 w-4/5 bg-zinc-800/20 rounded animate-pulse"></div>
              </div>

              <button 
                disabled
                className="w-full px-6 py-3 bg-zinc-800/30 text-gray-600 font-semibold rounded-lg cursor-not-allowed border border-zinc-700/30"
              >
                Details Soon
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-full">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <p className="text-gray-400 text-sm">
              We're preparing exciting new experiences for you
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );

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

                      <div className={`w-3 h-3 bg-zinc-900 border-2 border-blue-500 rounded-full transition-all duration-700 relative ${visibleCards.has(index) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                        }`}
                        style={{
                          transitionDelay: `${index * 200}ms`
                        }}>
                      </div>
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

                          {/* Desktop: Show on hover */}
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

                          {/* Desktop: Button shows on hover */}
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

                          {/* Mobile: Button always visible */}
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