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
   HELPERS
============================================================ */
const formatTwitterUrl = (urlOrHandle) => {
  if (!urlOrHandle) return "";
  if (urlOrHandle.startsWith("http://") || urlOrHandle.startsWith("https://")) {
    return urlOrHandle;
  }
  return `https://x.com/${urlOrHandle.replace(/^@/, "")}`;
};

const formatGithubUrl = (urlOrHandle) => {
  if (!urlOrHandle) return "";
  if (urlOrHandle.startsWith("http://") || urlOrHandle.startsWith("https://")) {
    return urlOrHandle;
  }
  return `https://${urlOrHandle}`;
};

/* ============================================================
   TEAM DATA
============================================================ */
const teamMembers = {
  organisers: [
    {
      name: "Ayushi Jha",
      role: "Organiser",
      description:
        "Leading with vision, empathy, and purpose. Passionate about empowering developers, fostering collaboration, and transforming curious minds into tomorrow's innovators.",
      img: "/TeamPageImages/Ayushi_Jha_Org.png",
      linkedin: "https://www.linkedin.com/in/ayushi-jha-482801310/",
      github: "https://github.com/Ayushi20052006",
    },
    {
      name: "Tajalli Us Samad",
      role: "Organiser",
      description:
        "Jill of all trades, master of some, and student of everything. I love translating curiosity into creation, be it through code, design, or community. Forever collecting perspectives, chasing ideas, and occasionally befriending cats.",
      img: "/TeamPageImages/Tejalli_Us_Samad_Org.png",
      linkedin: "https://www.linkedin.com/in/tajalli-us-samad",
      github: "https://github.com/qrstajalli",
    },
    {
      name: "Krish Srivastava",
      role: "Organiser",
      description:
        "A committed organiser who brings energy, teamwork and fresh ideas to the community.",
      img: "/TeamPageImages/Krish_Srivastava_Org.png",
      linkedin: "https://www.linkedin.com/in/krish-srivastava-012345678/",
      github: "https://github.com/krishsrivastava",
    },
  ],
  actingGenerals: [
    {
      name: "Aryan Kumar Yadav",
      role: "Acting General & Social Media Head",
      description:
        "Driven by curiosity, defined by innovation. Exploring technology, solving complex problems, and transforming ideas into intelligent solutions that create meaningful impact.",
      img: "/TeamPageImages/Aryan_Kumar_Yadav_AG.png",
      linkedin: "https://www.linkedin.com/in/aryan-kumar-yadav/",
      github: "https://github.com/Aryan-Kr-Yadav",
    },
    {
      name: "Riddhima Agarwal",
      role: "Acting General & Technical Lead",
      description:
        "Driven by innovation, grounded in collaboration. Passionate about technology, empowering developers, and fostering a culture of continuous learning and growth.",
      img: "/TeamPageImages/Riddhima_Agarwal_AG.png",
      linkedin: "https://www.linkedin.com/in/riddhimaagarwalbly/",
      github: "https://github.com/RiddhimaAgarwal28",
      twitter: "https://x.com/Riddhimaagr",
    },
    {
      name: "Krishna Gupta",
      role: "Acting General",
      description:
        "A curious mind with a creative spark, bringing people together, embracing new ideas, and turning possibilities into meaningful action",
      img: "/TeamPageImages/Krishna_Gupta_AG.png",
      linkedin: "https://www.linkedin.com/in/rollnum21/",
      github: "https://github.com/rollnum21",
    },
  ],
  overallCoordinator: {
    name: "Krish Bansal",
    role: "Overall Coordinator",
    description: "Just a fun loving person",
    img: "/TeamPageImages/Krish_Bansal_OC.png",
    linkedin: "https://www.linkedin.com/in/krish-bansal-662aa13bb/",
    github: "https://github.com/krishbansall",
  },
  departments: [
    {
      name: "Technical Department",
      leads: [
        {
          name: "Riddhima Agarwal",
          role: "Technical Lead",
          description:
            "Driven by innovation, grounded in collaboration. Passionate about technology, empowering developers, and fostering a culture of continuous learning and growth.",
          img: "/TeamPageImages/Riddhima_Agarwal_TL.png",
          linkedin: "https://www.linkedin.com/in/riddhimaagarwalbly/",
          github: "https://github.com/RiddhimaAgarwal28",
          twitter: "https://x.com/Riddhimaagr",
        },
        {
          name: "Vansh Saxena",
          role: "Tech Lead",
          description:
            "Hey I am your tech lead currently diving more into the cloud engineering and devops field and I love to play cricket and listening good in my free time and my in my time  I love to do gym and seeking advice from much more experience people around me to help me in future and career growth. And I think I am a good listener as well. So always here to listen up to your queries.",
          img: "/TeamPageImages/Vansh_Saxena_TL.png",
          linkedin: "https://in.linkedin.com/in/vansh-saxena-a75026362",
          github: "https://github.com/Vansh1812",
        },
      ],
    },
    {
      name: "Design Department",
      leads: [
        {
          name: "Dipanshi Gupta",
          role: "Design Lead",
          description:
            "Somewhere between creativity, curiosity, and a little perfectionism.",
          img: "/TeamPageImages/Dipanshi_Gupta_DL.png",
          linkedin: "https://www.linkedin.com/in/dipanshi-gupta/",
          github: "https://github.com/Dipanshi1",
          twitter: "https://x.com/dipanshig28",
        },
        {
          name: "Drishti Yadav",
          role: "Design Lead",
          description:
            "Crafting intuitive, visually captivating experiences that leave a lasting impression through creative imagination.",
          img: "/TeamPageImages/Drishti_Yadav_DL.png",
          linkedin: "",
          github: "",
        },
      ],
    },
    {
      name: "Events Department",
      leads: [
        {
          name: "Rajbir Singh",
          role: "Events Lead",
          description: "i know ball (idk)",
          img: "/TeamPageImages/Rajbir_Singh_EL.png",
          linkedin: "https://www.linkedin.com/in/rajbir-singh-438802324",
          github: "https://github.com/rjvrr",
        },
        {
          name: "Nandini Vasudev",
          role: "Events Lead",
          description:
            "A dedicated events lead who brings creativity, coordination and lively energy to every gathering.",
          img: "/TeamPageImages/Nandini_Vasudev_EL.png",
          linkedin: "",
          github: "",
        },
      ],
    },
    {
      name: "Promotions Department",
      leads: [
        {
          name: "Mudit Chaturvedi",
          role: "Promotions Lead",
          description: "I love anime",
          img: "/TeamPageImages/Mudit_Chaturvedi_PL.png",
          linkedin: "https://www.linkedin.com/in/mudit-chaturvedi-42904838b/",
          github: "https://github.com/Mudit1147",
        },
        {
          name: "Rajshree",
          role: "Promotions Lead",
          description:
            "My Spotify knows me better than humans, hehehe well I am your cute(🃏)Promotion lead, saath me fun krengeee sblog",
          img: "/TeamPageImages/Rajshree_PL.png",
          linkedin: "https://www.linkedin.com/in/rajshreesinha/",
          github: "https://github.com/rajshrees093-ai",
        },
      ],
    },
    {
      name: "Social Media Department",
      leads: [
        {
          name: "Aryan Kumar Yadav",
          role: "Social Media Head",
          description:
            "Driven by curiosity, defined by innovation. Exploring technology, solving complex problems, and transforming ideas into intelligent solutions that create meaningful impact.",
          img: "/TeamPageImages/Aryan_Kumar_Yadav_SMH.png",
          linkedin: "https://www.linkedin.com/in/aryan-kumar-yadav/",
          github: "https://github.com/Aryan-Kr-Yadav",
        },
        {
          name: "Gouri Parashar",
          role: "Social Media Lead",
          description: "The Trend Whisperer",
          img: "/TeamPageImages/Gouri_Parashar_SML.png",
          linkedin: "https://www.linkedin.com/in/gouriparasharghaziabad/",
          github: "https://github.com/Gouri313",
          twitter: "https://x.com/gouri_parashar3",
        },
      ],
    },
    {
      name: "Production Department",
      leads: [
        {
          name: "Vivek Yadav",
          role: "Production Lead",
          description: "Just energy conserving",
          img: "/TeamPageImages/Vivek_Yadav_PL.png",
          linkedin: "https://www.linkedin.com/in/vivek-yadav-sde",
          github: "https://github.com/Naivete07",
        },
        {
          name: "Anjali Chahar",
          role: "Production Lead",
          description: "Never outgrow the curiosity.",
          img: "/TeamPageImages/Anjali_Chahar_PL.png",
          linkedin: "https://www.linkedin.com/in/anjali-chahar-b40a39333",
          github: "https://github.com/Anjali-ch",
          twitter: "https://x.com/anjalii0302",
        },
      ],
    },
    {
      name: "Outreach Department",
      leads: [
        {
          name: "Dev Upadhyay",
          role: "Outreach Lead",
          description:
            "I handle outreach, make things happen, and somehow know everyone",
          img: "/TeamPageImages/Dev_Upadhyay_OL.png",
          linkedin: "https://www.linkedin.com/in/dev-upadhyay-87b64530b/",
          github: "https://github.com/devuphub",
        },
        {
          name: "Harshit Soni",
          role: "Outreach Lead",
          description:
            "I'm a curious tech enthusiast who loves exploring new things, building random projects, and occasionally getting lost in debugging. Into AI/ML, always learning something new, and trying to figure out what I want to be when I grow up (still loading...)",
          img: "/TeamPageImages/Harshit_Soni_OL.png",
          linkedin: "https://www.linkedin.com/in/harshitxsoni/",
          github: "https://github.com/Harshit-Soni-1905",
        },
      ],
    },
  ],
};

/* ============================================================
   TEAM MEMBER DETAIL MODAL (GDG ACCENTS, PORTRAIT, QUOTE & SOCIALS)
============================================================ */
const TeamMemberModal = ({ member, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  if (!member) return null;

  const twitterUrl = formatTwitterUrl(member.twitter || member.x);
  const githubUrl = formatGithubUrl(member.github);
  const linkedinUrl = member.linkedin;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#14141c] via-[#0d0d12] to-[#07070a] rounded-3xl border border-white/10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(66,133,244,0.18)] overflow-hidden max-h-[92vh] flex flex-col"
      >
        {/* Top Signature GDG 4-Color Glowing Gradient Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />

        {/* Ambient Glow Orbs inside Modal */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 border border-white/15 text-gray-400 hover:text-white hover:border-[#4285F4] hover:bg-white/10 transition-all duration-300 hover:rotate-90 cursor-pointer shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-6 sm:p-8 md:p-10 relative z-10 custom-modal-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* LEFT SIDE: Nicely Portrayed Image Frame with GDG Accents */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] max-h-[420px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-neutral-900 group">
                {member.img ? (
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#1b1b22] to-[#09090c] p-6 text-center">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#4285F4]/50 flex items-center justify-center text-[#4285F4] mb-4 bg-blue-500/10 shadow-[0_0_20px_rgba(66,133,244,0.2)]">
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="text-xl font-bold text-white">{member.name}</span>
                    <span className="text-xs uppercase tracking-wider text-blue-400 mt-1">{member.role}</span>
                  </div>
                )}

                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Bottom Chapter Pill on Image */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-black/75 backdrop-blur-md text-white border border-white/20">
                    GDG ABESEC
                  </span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                    <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                    <span className="w-2 h-2 rounded-full bg-[#FBBC04]" />
                    <span className="w-2 h-2 rounded-full bg-[#34A853]" />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Name, Role, Framed Quote, and Socials */}
            <div className="md:col-span-7 flex flex-col justify-between h-full">
              <div>
                {/* Role Pill with Animated Pulsing Dot */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  {member.role}
                </div>

                {/* Name */}
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {member.name}
                </h2>

                {/* Nicely Framed Quote with GDG Stylized Quotation Mark */}
                <div className="mt-6 relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-inner">
                  <span className="text-5xl font-serif text-[#4285F4]/30 absolute -top-4 -left-1 select-none pointer-events-none">
                    “
                  </span>
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                    Personal Philosophy & Thought
                  </div>
                  <p className="text-base sm:text-lg text-gray-100 italic leading-relaxed font-light relative z-10">
                    {member.description}
                  </p>
                </div>
              </div>

              {/* Socials Connection Buttons */}
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                  Connect With {member.name.split(" ")[0]}
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  {linkedinUrl && (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077b5]/15 hover:bg-[#0077b5]/30 border border-[#0077b5]/30 text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md"
                    >
                      <svg className="w-4 h-4 text-[#00a0dc]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span>LinkedIn Profile</span>
                    </a>
                  )}

                  {githubUrl && (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md"
                    >
                      <svg className="w-4 h-4 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                  )}

                  {twitterUrl && (
                    <a
                      href={twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-neutral-900 border border-neutral-700 hover:border-white/50 text-white text-xs sm:text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span>Follow on X</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Modal Footer Watermark */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                <span>Google Developer Groups • ABESEC Chapter</span>
                <span className="font-mono text-[#4285F4]">Core Leadership 2026</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ============================================================
   TEAM CARD COMPONENT (WITH PARALLAX SCROLL EFFECT PRESERVED)
============================================================ */
const TeamMemberCard = ({ member, onSelect }) => {
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

  const twitterUrl = formatTwitterUrl(member.twitter || member.x);
  const githubUrl = formatGithubUrl(member.github);
  const linkedinUrl = member.linkedin;

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity, transformOrigin: "bottom center" }}
      className="tm-card"
      onClick={() => onSelect && onSelect(member)}
    >
      <div className="tm-card-inner">
        {member.img ? (
          <img src={member.img} alt={member.name} className="tm-image" />
        ) : (
          <div className="tm-placeholder">
            <div className="tm-placeholder-content">
              <div className="tm-placeholder-avatar">
                <svg
                  className="tm-placeholder-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h4 className="tm-placeholder-name">{member.name}</h4>
              <span className="tm-placeholder-role">{member.role}</span>
            </div>
          </div>
        )}
        <div className="tm-overlay">
          <div className="tm-content">
            <h3 className="tm-name">{member.name}</h3>
            <p className="tm-role">{member.role}</p>
            <p className="tm-description">{member.description}</p>
            <div className="tm-click-prompt">
              <span>Click to view spotlight & details ↗</span>
            </div>
            <div className="tm-socials" onClick={(e) => e.stopPropagation()}>
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tm-social-link tm-linkedin-link"
                  aria-label={`${member.name} LinkedIn`}
                >
                  <svg
                    className="tm-social-icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tm-social-link tm-github-link"
                  aria-label={`${member.name} GitHub`}
                >
                  <svg
                    className="tm-social-icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tm-social-link tm-twitter-link"
                  aria-label={`${member.name} X`}
                >
                  <svg
                    className="tm-social-icon"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
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
          cursor: pointer;
        }
        .tm-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: #1a1a1a;
          cursor: pointer;
          transition: transform 0.3s ease, border-color 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .tm-card-inner:hover {
          transform: translateY(-8px);
          border-color: rgba(66, 133, 244, 0.3);
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
        .tm-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(
              circle at 50% 30%,
              rgba(66, 133, 244, 0.15),
              transparent 60%
            ),
            linear-gradient(180deg, #18181b 0%, #09090b 100%);
          position: relative;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .tm-placeholder-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          padding: 24px;
        }
        .tm-placeholder-avatar {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 2px dashed rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #71717a;
          transition: all 0.3s ease;
          margin-bottom: 8px;
        }
        .tm-card-inner:hover .tm-placeholder-avatar {
          border-color: rgba(66, 133, 244, 0.5);
          color: #4285f4;
          transform: scale(1.05);
        }
        .tm-placeholder-icon {
          width: 52px;
          height: 52px;
        }
        .tm-placeholder-name {
          font-size: 1.6rem;
          font-weight: 700;
          color: #f4f4f5;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .tm-placeholder-role {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #a1a1aa;
          font-weight: 500;
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
          margin: 0 0 16px 0;
          font-weight: 500;
        }
        .tm-description {
          font-size: 0.95rem;
          color: #ccc;
          line-height: 1.6;
          margin: 0 0 18px 0;
          font-weight: 300;
        }
        .tm-click-prompt {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          color: #4285f4;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 20px;
          opacity: 0.9;
          transition: transform 0.2s ease;
        }
        .tm-card-inner:hover .tm-click-prompt:hover {
          transform: translateX(4px);
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
        .tm-twitter-link::before {
          background: linear-gradient(135deg, #000000 0%, #2a2a2a 100%);
        }
        .tm-twitter-link:hover {
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }
        .tm-twitter-link:hover::before {
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
  // Modal selection state
  const [selectedMember, setSelectedMember] = useState(null);

  // 1. Branding Visibility State (Visible ONLY when scroll < windowHeight)
  const [showBrandText, setShowBrandText] = useState(true);

  // 2. Navbar Visibility State (Hide on Down, Show on Up)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Branding Text Logic
      setShowBrandText(currentScrollY < windowHeight);

      // Navbar Smart Scroll Logic
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
          min-height: 100vh;
          background: #0a0a0a;
          padding: 100px 0;
          position: relative;
        }
        .tm-organiser-section {
          margin-bottom: 120px;
        }
        .tm-generals-section {
          margin-top: 100px;
          margin-bottom: 120px;
        }
        .tm-coordinator-section {
          margin-top: 100px;
          margin-bottom: 120px;
        }
        .tm-leads-section {
          margin-top: 100px;
          margin-bottom: 60px;
        }
        .tm-department-group {
          margin-bottom: 80px;
        }
        .tm-dept-badge-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 45px;
          padding: 0 20px;
        }
        .tm-dept-pill {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 10px 28px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #f4f4f5;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        }
        .tm-dept-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
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
          margin: 50px auto 0;
          padding: 0 60px;
          display: flex;
          justify-content: center;
        }
        .tm-grid-single .tm-card {
          max-width: 700px;
        }
        @media (max-width: 1400px) {
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
          .tm-coordinator-section,
          .tm-leads-section {
            margin-bottom: 80px;
          }
          .tm-department-group {
            margin-bottom: 60px;
          }
          .tm-dept-pill {
            padding: 8px 20px;
            font-size: 0.8rem;
            letter-spacing: 0.15em;
          }
          .tm-grid {
            padding: 0 20px;
            gap: 40px;
            row-gap: 40px;
          }
          .tm-grid-single {
            padding: 0 20px;
            margin-top: 40px;
            margin-bottom: 40px;
          }
        }
      `}</style>

      {/* ================= SPOTLIGHT MODAL SHOWCASE ================= */}
      <AnimatePresence>
        {selectedMember && (
          <TeamMemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>

      <div className="tm-wrapper">
        {/* ================= BRANDING ================= */}
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

        {/* ================= HERO SECTION ================= */}
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
              leading-tight
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
              <span>Scroll down to explore • Click any card for spotlight</span>
            </motion.div>
          </div>
        </section>

        {/* ================= TEAM SECTIONS (PRESERVING SCROLL ANIMATION) ================= */}
        <div className="tm-section">
          {/* 1. ORGANISERS (3) */}
          <div className="tm-organiser-section">
            <SectionHeading title="ORGANISERS" />
            <div className="tm-grid">
              <TeamMemberCard member={teamMembers.organisers[0]} onSelect={setSelectedMember} />
              <TeamMemberCard member={teamMembers.organisers[1]} onSelect={setSelectedMember} />
            </div>
            <div className="tm-grid-single">
              <TeamMemberCard member={teamMembers.organisers[2]} onSelect={setSelectedMember} />
            </div>
          </div>

          {/* 2. ACTING GENERALS (3) */}
          <div className="tm-generals-section">
            <SectionHeading title="ACTING GENERALS" />
            <div className="tm-grid">
              <TeamMemberCard member={teamMembers.actingGenerals[0]} onSelect={setSelectedMember} />
              <TeamMemberCard member={teamMembers.actingGenerals[1]} onSelect={setSelectedMember} />
            </div>
            <div className="tm-grid-single">
              <TeamMemberCard member={teamMembers.actingGenerals[2]} onSelect={setSelectedMember} />
            </div>
          </div>

          {/* 3. OVERALL COORDINATOR (1) */}
          <div className="tm-coordinator-section">
            <SectionHeading title="OVERALL COORDINATOR" />
            <div className="tm-grid-single">
              <TeamMemberCard member={teamMembers.overallCoordinator} onSelect={setSelectedMember} />
            </div>
          </div>

          {/* 4. DEPARTMENT LEADS (2 in each department, Outreach last) */}
          <div className="tm-leads-section">
            <SectionHeading title="DEPARTMENT LEADS" />
            <div className="tm-departments-container">
              {teamMembers.departments.map((dept, index) => (
                <div key={dept.name} className="tm-department-group">
                  <div className="tm-dept-badge-wrapper">
                    <span className="tm-dept-pill">
                      <span
                        className="tm-dept-dot"
                        style={{
                          backgroundColor:
                            index % 4 === 0
                              ? "#4285F4"
                              : index % 4 === 1
                              ? "#EA4335"
                              : index % 4 === 2
                              ? "#FBBC04"
                              : "#34A853",
                          boxShadow: `0 0 10px ${
                            index % 4 === 0
                              ? "#4285F4"
                              : index % 4 === 1
                              ? "#EA4335"
                              : index % 4 === 2
                              ? "#FBBC04"
                              : "#34A853"
                          }`,
                        }}
                      />
                      {dept.name}
                    </span>
                  </div>
                  <div className="tm-grid">
                    {dept.leads.map((member, i) => (
                      <TeamMemberCard key={i} member={member} onSelect={setSelectedMember} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
