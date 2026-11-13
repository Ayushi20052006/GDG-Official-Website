import Navbar from "./ui/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  User,
  MessageSquare,
  Loader2,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import logo from "/logo.png";

export default function Contact() {
  /* ================= EXISTING LOGIC (UNCHANGED) ================= */
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email" && errors.email) {
      if (!value.trim() || !validateEmail(value)) {
        setErrors({ ...errors, email: "Please enter a valid email" });
      } else {
        setErrors({ ...errors, email: "" });
      }
    } else if (name !== "email") {
      if (errors[name] && value.trim()) {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSubmitted(true);
          setFormData({ name: "", email: "", subject: "", message: "" });
          setTimeout(() => setSubmitted(false), 5000);
        } else {
          setErrors({
            submit: data.error || "Failed to send message. Please try again.",
          });
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setErrors({ submit: "Failed to send message. Please try again." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      content: "ABES Engineering College",
      subContent: "Ghaziabad, India",
      themeHex: "#4285F4",
    },
    {
      icon: Mail,
      title: "Email",
      content: "dsc@abes.ac.in",
      subContent: "We reply within 24 hours",
      themeHex: "#EA4335",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 9870190631",
      subContent: "+91 8115779988",
      themeHex: "#34A853",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  /* ================= NEW SCROLL LOGIC ================= */
  // 1. Branding Visibility State (Visible ONLY when scroll < windowHeight)
  const [showBrandText, setShowBrandText] = useState(true);

  // 2. Navbar Visibility State (Hide on Down, Show on Up)
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Shared class for Navbar Animation
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

      {/* ================= UPDATED BRANDING ================= */}
      <div className="fixed top-4 left-4 md:top-8 md:left-8 z-20 flex flex-col gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
           <img
                                  src={logo}
                                  className="h-8 w-10 sm:h-12 sm:w-14 md:h-14 md:w-20"
                                  alt="gdgLogo"
                                />

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

      {/* ================= UPDATED NAVBAR ================= */}
      {/* Moved outside motion.section for correct fixed positioning */}
      <Navbar className={navAnimationClass} />

      {/* Hero Section - PRESERVED EXACTLY */}
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
              IDEAS INTO ACTION
            </span>
          </motion.div>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative inline-block px-4 text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter"
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
            ">
              GET IN TOUCH
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
            Share your thoughts, questions, or feedback — we'd love to hear
            it.{" "}
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

      {/* REDESIGNED CONTACT SECTION (UNCHANGED) */}
      <section className="w-full py-20 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Let's <span className="text-[#4285F4]">Connect</span>
            </h2>
            <p className="text-[#737373] max-w-2xl mx-auto">
              Have a question, idea, or just want to say hello? We're always
              excited to hear from fellow developers and tech enthusiasts.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-center">
            {/* Left Side - Contact Info Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="lg:col-span-2 space-y-6"
            >
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div key={index} variants={itemVariants}>
                    <Tilt
                      glareEnable={false}
                      tiltMaxAngleX={8}
                      tiltMaxAngleY={8}
                      scale={1.02}
                      transitionSpeed={2500}
                    >
                      <div
                        className="group relative p-6 rounded-2xl bg-[#151515] border transition-all duration-700 hover:scale-[1.03] hover:-translate-y-1 overflow-hidden"
                        style={{
                          borderColor: info.themeHex,
                          boxShadow: `0 4px 24px ${info.themeHex}15`,
                        }}
                      >
                        {/* Hover Glow Effect */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none rounded-2xl"
                          style={{
                            background: `radial-gradient(circle at center, ${info.themeHex}18, transparent 70%)`,
                          }}
                        />

                        <div className="relative z-10 flex items-start gap-4">
                          <div
                            className="p-3 rounded-xl transition-all duration-500 group-hover:scale-110"
                            style={{
                              backgroundColor: `${info.themeHex}15`,
                              border: `2px solid ${info.themeHex}60`,
                              color: info.themeHex,
                            }}
                          >
                            <Icon size={24} />
                          </div>

                          <div className="flex-1">
                            <h3
                              className="text-lg font-semibold text-[#e5e5e5] mb-1"
                              style={{
                                fontFamily: "'Space Grotesk', sans-serif",
                              }}
                            >
                              {info.title}
                            </h3>
                            <p className="text-[#a3a3a3] font-medium">
                              {info.content}
                            </p>
                            <p className="text-[#737373] text-sm mt-1">
                              {info.subContent}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Tilt>
                  </motion.div>
                );
              })}

              {/* Response Time Info */}
              <motion.div variants={itemVariants}>
                <Tilt
                  glareEnable={false}
                  tiltMaxAngleX={8}
                  tiltMaxAngleY={8}
                  scale={1.02}
                  transitionSpeed={2500}
                >
                  <div
                    className="group relative p-6 rounded-2xl bg-[#151515] border transition-all duration-700 hover:scale-[1.03] hover:-translate-y-1 overflow-hidden"
                    style={{
                      borderColor: "#FBBC05",
                      boxShadow: "0 4px 24px #FBBC0515",
                    }}
                  >
                    {/* Hover Glow Effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none rounded-2xl"
                      style={{
                        background:
                          "radial-gradient(circle at center, #FBBC0518, transparent 70%)",
                      }}
                    />

                    <div className="relative z-10 flex items-start gap-4">
                      <div
                        className="p-3 rounded-xl transition-all duration-500 group-hover:scale-110"
                        style={{
                          backgroundColor: "#FBBC0515",
                          border: "2px solid #FBBC0560",
                          color: "#FBBC05",
                        }}
                      >
                        <Phone size={24} />
                      </div>

                      <div className="flex-1">
                        <h3
                          className="text-lg font-semibold text-[#e5e5e5] mb-1"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          Response Time
                        </h3>
                        <p className="text-[#a3a3a3] font-medium">
                          Within 24-48 hours
                        </p>
                        <p className="text-[#737373] text-sm mt-1">
                          For urgent queries, DM us on socials
                        </p>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="relative p-8 md:p-10 rounded-2xl bg-[#151515] border border-[#4285F4]/30 overflow-hidden">
                {/* Subtle corner accent */}
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-20"
                  style={{
                    background: "linear-gradient(135deg, #4285F4, #34A853)",
                  }}
                />

                <h2
                  className="text-2xl md:text-3xl font-bold text-[#e5e5e5] mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Send Us a Message
                </h2>
                <p className="text-[#737373] mb-8">
                  Fill out the form below and we'll get back to you soon.
                </p>

                <div className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="relative">
                      <label className="block text-[#a3a3a3] text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]">
                          <User size={18} />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0a0a0a] border-2 text-[#e5e5e5] placeholder-[#525252] focus:outline-none transition-all duration-300"
                          style={{
                            borderColor: errors.name
                              ? "#EA4335"
                              : focusedField === "name"
                                ? "#4285F4"
                                : "#262626",
                            boxShadow: errors.name
                              ? "0 0 20px #EA433520"
                              : focusedField === "name"
                                ? "0 0 20px #4285F420"
                                : "none",
                          }}
                          placeholder="Your Name"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-[#EA4335] text-sm mt-2">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <label className="block text-[#a3a3a3] text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0a0a0a] border-2 text-[#e5e5e5] placeholder-[#525252] focus:outline-none transition-all duration-300"
                          style={{
                            borderColor: errors.email
                              ? "#EA4335"
                              : focusedField === "email"
                                ? "#4285F4"
                                : "#262626",
                            boxShadow: errors.email
                              ? "0 0 20px #EA433520"
                              : focusedField === "email"
                                ? "0 0 20px #4285F420"
                                : "none",
                          }}
                          placeholder="Your Email"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[#EA4335] text-sm mt-2">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="relative">
                    <label className="block text-[#a3a3a3] text-sm font-medium mb-2">
                      Subject
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737373]">
                        <MessageSquare size={18} />
                      </div>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("subject")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#0a0a0a] border-2 text-[#e5e5e5] placeholder-[#525252] focus:outline-none transition-all duration-300"
                        style={{
                          borderColor: errors.subject
                            ? "#EA4335"
                            : focusedField === "subject"
                              ? "#4285F4"
                              : "#262626",
                          boxShadow: errors.subject
                            ? "0 0 20px #EA433520"
                            : focusedField === "subject"
                              ? "0 0 20px #4285F420"
                              : "none",
                        }}
                        placeholder="How can we help you?"
                      />
                    </div>
                    {errors.subject && (
                      <p className="text-[#EA4335] text-sm mt-2">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="relative">
                    <label className="block text-[#a3a3a3] text-sm font-medium mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows="5"
                      className="w-full px-4 py-4 rounded-xl bg-[#0a0a0a] border-2 text-[#e5e5e5] placeholder-[#525252] focus:outline-none transition-all duration-300 resize-none"
                      style={{
                        borderColor: errors.message
                          ? "#EA4335"
                          : focusedField === "message"
                            ? "#4285F4"
                            : "#262626",
                        boxShadow: errors.message
                          ? "0 0 20px #EA433520"
                          : focusedField === "message"
                            ? "0 0 20px #4285F420"
                            : "none",
                      }}
                      placeholder="Tell us about your project, idea, or question..."
                    />
                    {errors.message && (
                      <p className="text-[#EA4335] text-sm mt-2">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button - Matching "Meet Our Team" style */}
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`group relative w-full md:w-auto px-10 py-4 bg-transparent border-2 border-[#4285F4] text-[#4285F4] font-semibold rounded-lg overflow-hidden transition-all duration-500 ease-out hover:text-white ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </span>
                    <div className="absolute bottom-0 left-0 w-full h-0 bg-[#1a73e8] group-hover:h-full transition-all duration-500 ease-out"></div>
                  </button>

                  {/* Submit Error Message */}
                  {errors.submit && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#EA4335]/15 border border-[#EA4335]/40 text-[#EA4335] px-5 py-4 rounded-xl mt-3 flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#EA4335]/20 flex items-center justify-center">
                        ✕
                      </div>
                      <span>{errors.submit}</span>
                    </motion.div>
                  )}

                  {/* Success Message */}
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#34A853]/15 border border-[#34A853]/40 text-[#34A853] px-5 py-4 rounded-xl mt-3 flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#34A853]/20 flex items-center justify-center">
                        ✓
                      </div>
                      <span>
                        Thank you! Your message has been sent successfully.
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
