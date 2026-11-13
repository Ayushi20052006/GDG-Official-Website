import React, { useState, useEffect } from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import { Link } from "react-router-dom";

function OrganisersAndActingGenerals() {
  const testimonials = [
    {
      quote:
        "Leading with vision, empathy, and purpose. Passionate about empowering developers, fostering collaboration, and transforming curious minds into tomorrow's innovators.",
      name: "Ayushi Jha",
      designation: "Organiser, GDG ABESEC",
      roleBadge: "Organiser",
      src: "/OrganiserAndAG'sImages/Organiser1.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/ayushi-jha-482801310/",
        github: "https://github.com/Ayushi20052006",
      },
    },
    {
      quote:
        "Jill of all trades, master of some, and student of everything. I love translating curiosity into creation, be it through code, design, or community. Forever collecting perspectives, chasing ideas, and occasionally befriending cats.",
      name: "Tajalli Us Samad",
      designation: "Organiser, GDG ABESEC",
      roleBadge: "Organiser",
      src: "/OrganiserAndAG'sImages/Organiser2.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/tajalli-us-samad",
        github: "https://github.com/qrstajalli",
      },
    },
    {
      quote:
        "A committed organiser who brings energy, teamwork, and fresh ideas to empower the community.",
      name: "Krish Srivastava",
      designation: "Organiser, GDG ABESEC",
      roleBadge: "Organiser",
      src: "/OrganiserAndAG'sImages/Organiser3.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/krish-srivastava-012345678/",
        github: "https://github.com/krishsrivastava",
      },
    },
    {
      quote:
        "Driven by curiosity, defined by innovation. Exploring technology, solving complex problems, and transforming ideas into intelligent solutions that create meaningful impact.",
      name: "Aryan Kumar Yadav",
      designation: "Acting General, GDG ABESEC",
      roleBadge: "Acting General",
      src: "/OrganiserAndAG'sImages/ActingGeneral1.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/aryan-kumar-yadav/",
        github: "https://github.com/Aryan-Kr-Yadav",
      },
    },
    {
      quote:
        "Driven by innovation, grounded in collaboration. Passionate about technology, empowering developers, and fostering a culture of continuous learning and growth.",
      name: "Riddhima Agarwal",
      designation: "Acting General, GDG ABESEC",
      roleBadge: "Acting General",
      src: "/OrganiserAndAG'sImages/ActingGeneral2.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/riddhimaagarwalbly/",
        twitter: "https://x.com/Riddhimaagr",
        github: "https://github.com/RiddhimaAgarwal28",
      },
    },
    {
      quote:
        "A curious mind with a creative spark, bringing people together, embracing new ideas, and turning possibilities into meaningful action.",
      name: "Krishna Gupta",
      designation: "Acting General, GDG ABESEC",
      roleBadge: "Acting General",
      src: "/OrganiserAndAG'sImages/ActingGeneral3.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/rollnum21/",
        github: "https://github.com/rollnum21",
      },
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-cycle through the leaders every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIndex, testimonials.length]);

  return (
    <section className="bg-[#0a0a0a] text-white flex flex-col items-center justify-center pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20 px-4 md:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative GDG Ambient Flares */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/10 via-red-600/10 to-green-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12 w-full max-w-4xl relative z-10 px-4">
        {/* GDG Chapter Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 shadow-lg">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4285F4] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4285F4]"></span>
          </span>
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase bg-gradient-to-r from-blue-400 via-yellow-300 to-green-400 bg-clip-text text-transparent">
            GDG ON CAMPUS • ABESEC
          </span>
        </div>

        <h2
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Meet the Leadership{" "}
          <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent">
            Board
          </span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto font-light">
          The driving forces steering our community toward innovation, technical excellence, and impactful collaboration.
        </p>

        {/* Google 4-Color Accent Line */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          <span className="h-1 w-6 rounded-full bg-[#4285F4]" />
          <span className="h-1 w-6 rounded-full bg-[#EA4335]" />
          <span className="h-1 w-6 rounded-full bg-[#FBBC04]" />
          <span className="h-1 w-6 rounded-full bg-[#34A853]" />
        </div>
      </div>

      {/* Quick Interactive Leader Thumbnails Bar (Guaranteed Single Row for all 6 on md+) */}
      <div className="w-full max-w-5xl md:max-w-6xl px-2 sm:px-4 mb-6 relative z-10">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5 md:gap-3 p-2 sm:p-2.5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
          {testimonials.map((leader, idx) => {
            const isCurrent = activeIndex === idx;
            return (
              <button
                key={leader.name}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center justify-center gap-2 px-2.5 py-1.5 sm:py-2 rounded-xl transition-all duration-300 cursor-pointer w-full min-w-0 ${
                  isCurrent
                    ? "bg-white/15 border border-[#4285F4]/60 shadow-[0_0_15px_rgba(66,133,244,0.3)] scale-[1.03]"
                    : "bg-transparent border border-transparent hover:bg-white/5 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={leader.src}
                  alt={leader.name}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover object-top border shrink-0 ${
                    isCurrent ? "border-[#4285F4]" : "border-white/20"
                  }`}
                />
                <div className="text-left min-w-0">
                  <div className={`text-xs font-semibold leading-tight truncate ${isCurrent ? "text-white" : "text-gray-300"}`}>
                    {leader.name.split(" ")[0]}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider truncate">
                    {leader.roleBadge}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Testimonials Card */}
      <div className="w-full max-w-7xl px-2 sm:px-4 relative z-10">
        <div className="animated-testimonials-container w-full">
          <AnimatedTestimonials
            testimonials={testimonials}
            autoplay={false}
            activeIndex={activeIndex}
            onChange={(index) => setActiveIndex(index)}
          />
        </div>
      </div>

      {/* High-Impact CTA Bridging to the Full Core Team Page */}
      <div className="mt-8 text-center relative z-10">
        <Link
          to="/team"
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-white/[0.07] to-white/[0.03] border border-white/15 hover:border-[#4285F4]/60 text-white font-medium backdrop-blur-xl transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(66,133,244,0.25)] hover:scale-105"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#4285F4]" />
          <span className="text-sm sm:text-base tracking-wide">
            Explore Core Team Members & Department Leads
          </span>
          <span className="text-[#4285F4] text-lg group-hover:translate-x-1.5 transition-transform duration-300">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}

export default OrganisersAndActingGenerals;
