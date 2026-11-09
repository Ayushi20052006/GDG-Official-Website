import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight,
  Star,
  Calendar,
  Code2,
  X,
} from "lucide-react";
import Navbar from "../components/ui/Navbar";
import ScrollProgressBar from "../components/ScrollProgressBar";
import CursorTrail from "../components/ui/CursorTrail";
import Footer from "../components/Footer";
import logo from "/logo.png";

const mockProjects = [
  {
    id: 1,
    title: "PowerMesh",
    description:
      "PowerMesh is a decentralized distributed computing platform that connects users who need computational power with devices that have idle CPU or GPU resources. It offers a cost-effective alternative to traditional cloud computing by enabling secure, peer-to-peer resource sharing using containerized execution and workload isolation.",
    thumbnail_url: "/projects-imgs/kavya-projects.png",
    owner_image: "/projects-imgs/kavya.png",
    owner_name: "Kavya Jain",
    github_url: "https://github.com/kavya-jain14/POWERMESH",
    linkedin_url: "https://www.linkedin.com/in/kavya-jain-421119390/",
    deployed_url: "https://powermesh-gargi-demo.onrender.com/",
    tech_stack: ["Next.js", "React", "TypeScript", "Fastify", "Node.js", "PostgreSQL", "Docker", "CUDA"]
  },
  {
    id: 2,
    title: "Metrologic",
    description:
      "Evidence-Backed AI for Legal Metrology Inspection: MetroLogic is an AI-assisted inspection platform for checking selected packaged-commodity declarations under Legal Metrology requirements.",
    thumbnail_url: "/projects-imgs/ayushman-projects.jpg",
    owner_image: "/projects-imgs/ayushman.jpeg",
    owner_name: "Ayushman Shukla",
    github_url: "https://github.com/ayushmanshukla362/Metrologic",
    linkedin_url: "https://www.linkedin.com/in/ayushman-shukla-30b714391/",
    deployed_url: "https://metrologic-frontend.onrender.com/",
    tech_stack: ["Python", "FastAPI", "PostgreSQL", "Google Gemini API", "Docker", "JavaScript"]
  },
  {
    id: 3,
    title: "TaxGenie",
    description:
      "TaxGenie is an AI-powered platform simplifying tax management, GST compliance, and financial filing for individuals and small businesses in India.",
    thumbnail_url: "/projects-imgs/uday-projects.png",
    owner_image: "/projects-imgs/uday.jpeg",
    owner_name: "Uday Jain",
    github_url: "https://github.com/udayjain06/CA-Assistant",
    linkedin_url: "https://www.linkedin.com/in/uday-jain-80a312308/",
    deployed_url: "https://ca-assistant-lac.vercel.app/dashboard",
    tech_stack: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Python", "FastAPI"]
  },
  {
    id: 4,
    title: "ZARA COLLECTION",
    description:
      "ZARA COLLECTION is a responsive fashion website showcasing affordable ethnic wear, including short kurtis, long kurtis, Farsi suits, and layered gowns. Visitors can browse product designs, sizes, and price ranges, read customer reviews, and contact the store to order through WhatsApp",
    thumbnail_url: "/projects-imgs/anjali-projects.png",
    owner_image: "/projects-imgs/anjali.jpeg",
    owner_name: "Anjali Dewari",
    github_url: "https://github.com/AnjaliDewari19/Project--Zara",
    linkedin_url: "https://www.linkedin.com/in/anjali-dewari/",
    deployed_url: "https://zaracollection26.netlify.app/",
    tech_stack: ["React.js", "JavaScript", "HTML5", "CSS3"]
  },
  {
    id: 5,
    title: "AceStudy",
    description:
      "Acestudy is a smart learning platform offering notes, previous year question papers, discussion forums, and a faculty dashboard, enabling organized study, collaboration, and effective academic management.",
    thumbnail_url: "/projects-imgs/priyatosh-project.png",
    owner_image: "/projects-imgs/priyatosh.jpg",
    owner_name: "Priyatosh Kumar",
    github_url: "https://github.com/PriyatoshKumarShahi/Study-Library",
    linkedin_url: "https://www.linkedin.com/in/priyatoshkumarshahi/",
    deployed_url: "https://acestudy.onrender.com/",
    tech_stack: [
      "React JS",
      "Express",
      "Web Sockets",
      "Node JS",
      "Mongo DB",
      "JWT",
    ],
  },
  {
    id: 6,
    title: "Smart Resume Reviewer",
    description:
      "Smart Resume Reviewer is a web-based application that analyzes resumes and provides structured feedback along with an improved version of the resume. It evaluates content, formatting, and skills presentation, highlighting areas of improvement to help users create clearer and more effective resumes.",
    thumbnail_url: "/projects-imgs/riddhima-project.jpg",
    owner_image: "/projects-imgs/riddhima.jpg",
    owner_name: "Riddhima Agarwal",
    github_url:
      "https://github.com/RiddhimaAgarwal28/Smart_Resume_Reviewer_Project",
    linkedin_url: "https://www.linkedin.com/in/riddhimaagarwalbly/",
    deployed_url: "https://smart-resume-reviewer-project.onrender.com",
    tech_stack: ["HTML", "CSS", "JavaScript", "Python", "Flask", "Flask-CORS"],
  },
  {
    id: 7,
    title: "CampusShield",
    description:
      "CampusShield is a secure, anonymous web application designed to facilitate student complaint reporting with comprehensive admin management capabilities. Built with modern web technologies for reliability, security, and user experience.",
    thumbnail_url: "/projects-imgs/anmol-project.png",
    owner_image: "/projects-imgs/anmol.jpg",
    owner_name: "Anmol Anand",
    github_url: "https://github.com/anandanmol1010/CampusShield",
    linkedin_url: "https://www.linkedin.com/in/anandanmol1010/",
    deployed_url: "https://campus--shield.vercel.app/",
    tech_stack: ["React JS", "Typescript", "Tailwind CSS", "Firebase"],
  },
  {
    id: 8,
    title: "Muvies",
    description:
      "Muvies is a full-stack multimedia platform designed to provide users with seamless access to movies and music in one place. The application allows users to explore movies, watch trailers, and create personalized watchlists. Alongside movies, users can stream and download music, making it a complete entertainment solution.",
    thumbnail_url: "/projects-imgs/tanishq-project.png",
    owner_image: "/projects-imgs/tanishq.jpeg",
    owner_name: "Tanishq Saxena",
    github_url: "https://github.com/Tanishq-7777/miniProjectMoviesSpace",
    linkedin_url: "https://www.linkedin.com/in/tanishq-saxena-20bb75344/",
    deployed_url: "https://mini-project-movies-space.vercel.app/",
    tech_stack: ["React JS", "Node JS", "Tailwind CSS", "Express JS"],
  },
];
const mockAchievements = [
  {
    id: 5,
    title: "RocketRide Buildathon",
    subtitle: "Second Runner-Up at RocketRide Buildathon",
    description:
      "Secured second runner-up at the RocketRide Buildathon in Delhi, organised at SDGI Global University.",
    image_url: "/projects-imgs/kritika-achievement.jpg",
    achiever_image: "/projects-imgs/kritika.jpg",
    achiever_name: "Kritika Singh",
    github_url: "https://github.com/kritikarajora2410-bot",
    linkedin_url: "https://www.linkedin.com/in/kritika-singh-a739a937b",
    category: "Hackathon",
    achievement_date: "2026-09-01",
    rank: "Second Runner-Up",
  },
  {
    id: 8,
    title: "30-Hour Offline Hackathon",
    subtitle: "Third Place in a 30-Hour Hackathon",
    description:
      "Achieved third place in a competitive 30-hour offline hackathon, demonstrating rapid prototyping and cross-functional execution under rigorous time constraints.",
    image_url: "/projects-imgs/tushti-achievement.jpg",
    achiever_image: "/projects-imgs/tushti.jpg",
    achiever_name: "Tushti Gupta",
    github_url: "https://github.com/TushtiGupta26",
    linkedin_url: "https://www.linkedin.com/in/tushtigupta26/",
    category: "Hackathon",
    achievement_date: "2026-04-16",
    rank: "Third Place",
  },
  {
    id: 7,
    title: "Problem Solving Milestone",
    subtitle: "980+ Problems Solved",
    description:
      "Solved over 980 problems across LeetCode, CodeChef, HackerRank, and GeeksforGeeks, demonstrating strong problem-solving skills, consistency, and proficiency in Data Structures and Algorithms through competitive programming.",
    image_url: "/projects-imgs/nidhi-achievement.png",
    achiever_image: "/projects-imgs/nidhi.jpg",
    achiever_name: "Nidhi Rathor",
    github_url: "https://github.com/nidhirathor6260-ui",
    linkedin_url: "https://www.linkedin.com/in/nidhi-rathor-6656aa382/",
    category: "Problem Solving",
    achievement_date: "2026-11-06",
    rank: "980+ Solved",
  },
  {
    id: 4,
    title: "Brainwave 2026",
    subtitle: "Top 7 in the Open Innovation Track",
    description:
      "Secured a top-7 position among 2,744 registrations in the Open Innovation track at Brainwave 2026, a national-level hackathon held at GGSIPU's East Delhi campus.",
    image_url: "/projects-imgs/paavni-achievement.jpg",
    achiever_image: "/projects-imgs/paavni.jpg",
    achiever_name: "Paavni Rastogi",
    github_url: "https://github.com/paavnirastogi0109",
    linkedin_url: "https://www.linkedin.com/in/paavni-rastogi-b4213536b",
    category: "Hackathon",
    achievement_date: "2026-08-22",
    rank: "Top 7",
  },
  {
    id: 6,
    title: "Decode SIH 2026",
    subtitle: "National-Level Hackathon Finalist",
    description:
      "Reached the national-level finals of Decode SIH at IIIT Delhi as part of Team Lumora. The team built a Smart Traffic Controller using intelligent traffic analysis, digital twin technology, dynamic signal management, and emergency vehicle prioritisation.",
    image_url: "/projects-imgs/sonali-achievement.jpg",
    achiever_image: "/projects-imgs/sonali.jpg",
    achiever_name: "Sonali Singh",
    github_url: "https://github.com/Sonali7985",
    linkedin_url: "https://www.linkedin.com/in/sonali-singh-823a2a3a1",
    category: "Hackathon",
    achievement_date: "2026-05-09",
    rank: "Finalist",
  },
  {
    id: 1,
    title: "Clash of Coders",
    subtitle: "Winner of Clash of Coders 2025",
    description:
      "Secured first place in Clash of Coders 2025, a prestigious competitive programming contest, by demonstrating exceptional problem-solving skills and algorithmic expertise.",
    image_url: "/projects-imgs/uttkarsh-achievement.jpeg",
    achiever_image: "/projects-imgs/uttkarsh.jpg",
    achiever_name: "Utkarsh Agarwal",
    github_url: "https://github.com/Utkarsh-cod",
    linkedin_url: "https://www.linkedin.com/in/utkarsh-agarwal-8b0342362/",
    category: "Competitive Programming",
    achievement_date: "12-01-2025",
    rank: "Winner",
  },
  {
    id: 2,
    title: "Smart India Hackathon",
    subtitle: "Winner of Smart India Hackathon 2025",
    description:
      "Won Smart India Hackathon 2025, a prestigious national level innovation competition organized by the Government of India, showcasing excellence in problem-solving and technological innovation.",
    image_url: "/projects-imgs/anmol-achievement.jpg",
    achiever_image: "/projects-imgs/anmol.jpg",
    achiever_name: "Anmol Anand",
    github_url: "https://github.com/anandanmol1010",
    linkedin_url: "https://www.linkedin.com/in/anandanmol1010/",
    category: "Competitive Programming",
    achievement_date: "2025-12-10",
    rank: "Winner",
  },
  {
    id: 3,
    title: "Problem Solving Milestone",
    subtitle: "920+ Problems Solved",
    description:
      "Solved over 920 data structures and algorithm problems across multiple coding platforms, demonstrating strong problem-solving skills, consistency, and deep understanding of core DSA concepts.",
    image_url: "/projects-imgs/ayushi-achievement.png",
    achiever_image: "/projects-imgs/ayushi.jpg",
    achiever_name: "Ayushi Jha",
    github_url: "https://github.com/Ayushi20052006",
    linkedin_url: "https://www.linkedin.com/in/ayushi-jha-482801310/",
    category: "Problem Solving",
    achievement_date: "2025-12-27",
    rank: "920+ Solved",
  },
];

const Showcase = () => {
  const [activeTab, setActiveTab] = useState("projects");

  // 1. Branding Visibility State (Visible ONLY when scroll < windowHeight)
  const [showBrandText, setShowBrandText] = useState(true);

  // 2. Navbar Visibility State (Hide on Down, Show on Up)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Logic A: Branding Text (100vh check)
      setShowBrandText(currentScrollY < windowHeight);

      // Logic B: Navbar Smart Scroll (Hide Down / Show Up)
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        setIsNavbarVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Shared class for Navbar Animation
  const navAnimationClass = `transition-transform duration-300 ease-in-out ${
    isNavbarVisible ? "translate-y-0" : "-translate-y-[250%]"
  }`;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ScrollProgressBar />
      <CursorTrail />

      {/* ================= BRANDING ================= */}
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-20 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
           <img
                                              src={logo}
                                              className="h-8 w-10 sm:h-12 sm:w-14 md:h-14 md:w-20"
                                              alt="gdgLogo"
                                            />

          {/* Google Text */}
          <div
            className={`flex items-center gap-0.5 font-bold text-xl sm:text-2xl md:text-3xl
      transition-all duration-500 ease-out
      ${!showBrandText ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0"}`}
          >
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-300">o</span>
            <span className="text-green-500">g</span>
            <span className="text-blue-500">l</span>
            <span className="text-red-500">e</span>
          </div>
        </div>

        {/* Developer Groups */}
        <div
          className={`text-white text-sm sm:text-base md:text-lg tracking-wide ml-0.5
    transition-all duration-500 ease-out
    ${!showBrandText ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}`}
        >
          Developer Groups
        </div>
      </div>

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

      {/* ================= NAVBAR ================= */}
      {/* Moved outside the hero section for better fixed positioning behavior */}
      <Navbar className={navAnimationClass} />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 w-full h-px bg-white"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-white"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-white"></div>
          <div className="absolute top-0 left-1/4 h-full w-px bg-white"></div>
          <div className="absolute top-0 left-1/2 h-full w-px bg-white"></div>
          <div className="absolute top-0 left-3/4 h-full w-px bg-white"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-white text-black text-sm font-semibold tracking-wider">
              EXCELLENCE IN INNOVATION
            </span>
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
    SHOWCASE
  </motion.span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base md:text-xl text-gray-500 max-w-3xl mx-auto mb-12"
            style={{
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 300,
            }}
          >
            A curated collection of impactful work and milestones{" "}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center justify-center gap-2 text-gray-500 text-xs"
            style={{
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            <span>Scroll down to explore</span>
          </motion.div>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-[0] bg-black/80 backdrop-blur-xl border-b border-white/10"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActiveTab("projects")}
              className={`relative px-10 py-4 text-base font-bold tracking-wider transition-all duration-300 ${
                activeTab === "projects"
                  ? "text-black"
                  : "text-white hover:text-gray-300"
              }`}
            >
              {activeTab === "projects" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">PROJECTS</span>
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`relative px-10 py-4 text-base font-bold tracking-wider transition-all duration-300 ${
                activeTab === "achievements"
                  ? "text-black"
                  : "text-white hover:text-gray-300"
              }`}
            >
              {activeTab === "achievements" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">ACHIEVEMENTS</span>
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === "projects" ? (
          <ProjectsSection key="projects" projects={mockProjects} />
        ) : (
          <AchievementsSection
            key="achievements"
            achievements={mockAchievements}
          />
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

const ProjectsSection = ({ projects }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      {/* <Footer /> */}
    </motion.div>
  );
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: index * 0.1 }}
        className="mb-32 last:mb-40"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:hidden flex items-center gap-4 mb-6">
            <span className="text-6xl font-black text-white/10">
              0{project.id}
            </span>
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-sm font-semibold tracking-wider text-gray-500">
              {project.year}
            </span>
          </div>

          <div
            className={`flex flex-col justify-between order-1 ${
              index % 2 === 0 ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="hidden lg:flex items-center gap-4 mb-6">
                <span className="text-6xl font-black text-white/10">
                  0{project.id}
                </span>
                <div className="flex-1 h-px bg-white/20"></div>
              </div>

              <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                {project.title}
              </h3>

              <div className="flex items-center gap-3 mb-6">
                <img
                  src={project.owner_image}
                  alt={project.owner_name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                />
                <div>
                  <p className="text-xs font-semibold tracking-wider text-gray-500">
                    CREATED BY
                  </p>
                  <p className="text-lg font-bold">{project.owner_name}</p>
                </div>
              </div>

              <p className="text-gray-400 text-base leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="mb-10">
                <p className="text-xs font-semibold tracking-wider text-gray-500 mb-4">
                  TECH STACK
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.tech_stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-2 bg-white text-black text-sm font-semibold tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  href={project.deployed_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                  title="View Live Project"
                >
                  <ExternalLink className="w-5 h-5 text-white group-hover:text-white transition-colors" />
                </motion.a>

                <motion.a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/5 hover:bg-purple-600 transition-all duration-300 group"
                  title="View on GitHub"
                >
                  <Github className="w-5 h-5 text-white" />
                </motion.a>

                <motion.a
                  href={project.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white/5 hover:bg-blue-600 transition-all duration-300 group"
                  title="View on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          <motion.div
            className={`relative h-[450px] order-2 ${
              index % 2 === 0 ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <motion.a
              href={project.deployed_url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block h-full overflow-hidden bg-zinc-900 group cursor-pointer"
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
            >
              <motion.img
                src={project.thumbnail_url}
                alt={project.title}
                className="w-full h-full object-cover object-center"
                animate={{ scale: imageHovered ? 1.05 : 1 }}
                transition={{ duration: 0.6 }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: imageHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/60 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: imageHovered ? 1 : 0.8,
                    opacity: imageHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <ExternalLink className="w-10 h-10 mx-auto mb-1" />
                  <p className="text-sm font-semibold tracking-wider">
                    VIEW PROJECT
                  </p>
                </motion.div>
              </motion.div>
            </motion.a>

            <motion.div
              className="absolute top-3 left-3 w-25 h-25 overflow-hidden bg-zinc-900 border-4 border-black rounded-[50%]  shadow-2xl cursor-pointer"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsImageEnlarged(true)}
            >
              <img
                src={project.owner_image}
                alt={project.owner_name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isImageEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageEnlarged(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
              onClick={() => setIsImageEnlarged(false)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-2xl max-h-[80vh] rounded-lg bg-cover overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={project.owner_image}
                alt={project.owner_name}
                className="w-full h-[500px] object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <p className="text-xs font-semibold tracking-wider text-gray-400 mb-1">
                  CREATED BY
                </p>
                <p className="text-2xl font-black">{project.owner_name}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const AchievementsSection = ({ achievements }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const AchievementCard = ({ achievement, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        className="group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="relative h-full bg-zinc-950 overflow-hidden flex flex-col">
          {/* Image section */}
          <div className="relative h-64 overflow-hidden">
            <div
              className="relative w-full h-full overflow-hidden cursor-pointer"
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
            >
              <motion.img
                src={achievement.image_url}
                alt={achievement.title}
                className="w-full h-full object-cover object-center"
                animate={{ scale: imageHovered ? 1.1 : 1 }}
                transition={{ duration: 0.6 }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: imageHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-black/70"
              />
            </div>

            {/* Achiever image (click to enlarge) */}
            <motion.div
              className="absolute top-3 left-3 w-24 h-24 overflow-hidden bg-zinc-900 border-4 border-black rounded-full shadow-2xl cursor-pointer z-10"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsImageEnlarged(true)}
            >
              <img
                src={achievement.achiever_image}
                alt={achievement.achiever_name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8 bg-zinc-950 flex-1 flex flex-col">
            <h3 className="text-2xl font-black mb-2 tracking-tight">
              {achievement.title}
            </h3>

            <p className="text-sm font-semibold text-gray-500 mb-4 tracking-wider">
              {achievement.subtitle}
            </p>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={achievement.achiever_image}
                alt={achievement.achiever_name}
                className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <p className="text-xs font-semibold tracking-wider text-gray-500">
                  ACHIEVED BY
                </p>
                <p className="text-base font-bold">
                  {achievement.achiever_name}
                </p>
              </div>
            </div>

            <p
              className="text-gray-400 leading-relaxed mb-6"
              style={{ fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.6 }}
            >
              {achievement.description}
            </p>

            <div className="flex items-center gap-3 mb-6 text-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-gray-400">
                {new Date(achievement.achievement_date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </span>
            </div>

            <div className="border-t border-white/10 pt-6 flex justify-end mt-auto">
              <div className="flex gap-3">
                <motion.a
                  href={achievement.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 bg-white/5 hover:bg-purple-600 transition-all duration-300"
                >
                  <Github className="w-4 h-4" />
                </motion.a>

                <motion.a
                  href={achievement.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 bg-white/5 hover:bg-blue-600 transition-all duration-300"
                >
                  <Linkedin className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enlarged Image Modal */}
      <AnimatePresence>
        {isImageEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsImageEnlarged(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full"
              onClick={() => setIsImageEnlarged(false)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={achievement.achiever_image}
                alt={achievement.achiever_name}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              <div className="absolute bottom-4 left-16 z-10">
                <p className="text-xs font-semibold tracking-wider text-gray-500">
                  ACHIEVED BY
                </p>
                <p className="text-2xl font-black text-white">
                  {achievement.achiever_name}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Showcase;
