"use client";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  IconMenu2,
  IconX,
  IconArrowRight,
  IconSparkles,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "/logo.webp";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ============================================================
   GOOGLE DYNAMIC ISLAND NAVBAR (DESKTOP)
============================================================ */

const DynamicIslandDesktop = ({ items, className }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-5 left-1/2 -translate-x-1/2 z-[100] hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-full",
        "bg-neutral-950/80 backdrop-blur-2xl border border-white/[0.12]",
        "shadow-[0_20px_45px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.2)]",
        className,
      )}
    >
      {/* 1. Left Brand Identity */}
      <Link
        to="/"
        className="group flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-full transition-transform duration-200 active:scale-95 shrink-0"
      >
        <img
          src={logo}
          alt="GDG Logo"
          className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-200 shrink-0"
        />
        <div className="flex items-center gap-1.5 select-none font-['Space_Grotesk'] shrink-0">
          <span className="text-white font-bold text-sm tracking-tight">GDG</span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-[#4285F4] border border-blue-500/30 shrink-0">
            ABESEC
          </span>
        </div>
      </Link>

      {/* Subtle Hairline Divider with clear spacing so it never overlaps the ABESEC badge */}
      <div className="h-4 w-[1px] bg-white/20 ml-3 mr-2 shrink-0" />

      {/* 2. Center Nav Items with Magnetic Sliding Capsule */}
      <div
        onMouseLeave={() => setHoveredIdx(null)}
        className="relative flex items-center gap-0.5"
      >
        {items.map((item, idx) => {
          const isActive =
            (item.href === "/" && location.pathname === "/" && !location.hash) ||
            (item.href === "/#about" && location.hash === "#about") ||
            (item.href !== "/" && !item.href.includes("#") && location.pathname.startsWith(item.href));

          const isHovered = hoveredIdx === idx;

          return (
            <Link
              key={item.title}
              to={item.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              className={cn(
                "relative px-3.5 py-1.5 text-[13px] font-medium tracking-wide transition-colors duration-150 select-none rounded-full shrink-0",
                isActive ? "text-white font-semibold" : "text-neutral-400 hover:text-white",
              )}
            >
              {/* Sliding Hover Capsule (Linear style) */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    layoutId="dynamicNavHoverPill"
                    className="absolute inset-0 rounded-full bg-white/[0.10] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              {/* Active Route Capsule (When not hovering another item) */}
              {isActive && hoveredIdx === null && (
                <motion.div
                  layoutId="dynamicNavActivePill"
                  className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/15"
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                />
              )}

              {/* Text Label */}
              <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                {item.title}
                {/* Active Indicator Micro-Dot */}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4] shadow-[0_0_8px_#4285F4]" />
                )}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Subtle Hairline Divider before Contact Button */}
      <div className="h-4 w-[1px] bg-white/20 ml-2 mr-1 shrink-0" />

      {/* 3. Right Call to Action Button: Single-row Flexbox Contact Button */}
      {(() => {
        const isContactActive = location.pathname === "/contact";
        return (
          <Link
            to="/contact"
            className={cn(
              "group relative inline-flex flex-row items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-200 select-none",
              isContactActive
                ? "bg-[#4285F4] text-white shadow-[0_0_24px_rgba(66,133,244,0.6)] ring-1 ring-white/40"
                : "bg-gradient-to-r from-[#4285F4] to-[#1a73e8] hover:from-[#5294ff] hover:to-[#2284fc] text-white shadow-[0_0_18px_rgba(66,133,244,0.35)] hover:shadow-[0_0_26px_rgba(66,133,244,0.6)] hover:scale-[1.03] active:scale-95",
            )}
          >
            <span className="whitespace-nowrap">Contact</span>
            <IconArrowRight
              size={13}
              className="text-white group-hover:translate-x-0.5 transition-transform duration-200 shrink-0"
            />
          </Link>
        );
      })()}
    </motion.nav>
  );
};

/* ============================================================
   GOOGLE DYNAMIC ISLAND (MOBILE)
============================================================ */

const DynamicIslandMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <>
      {/* Floating Island Mobile Bar */}
      <div
        className={cn(
          "fixed top-3 left-4 right-4 z-[120] flex lg:hidden items-center justify-between px-4 py-2.5 rounded-full",
          "bg-neutral-950/85 backdrop-blur-2xl border border-white/15 shadow-2xl",
          className,
        )}
      >
        {/* Brand */}
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
          <img src={logo} alt="GDG Logo" className="w-6 h-6 object-contain" />
          <div className="flex items-center gap-1.5 font-['Space_Grotesk']">
            <span className="text-white font-bold text-sm tracking-tight">GDG</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/15 text-[#4285F4] border border-blue-500/30">
              ABESEC
            </span>
          </div>
        </Link>

        {/* Hamburger Toggle Button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle Navigation"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/10 text-white active:scale-90 transition-transform"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <IconX size={18} className="text-neutral-200" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <IconMenu2 size={18} className="text-neutral-200" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Full Screen Overlay Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[110] bg-black/92 flex flex-col justify-between pt-24 pb-12 px-6 lg:hidden"
          >
            {/* Top Brand Banner */}
            <div className="max-w-sm mx-auto w-full">
              <div className="text-[11px] uppercase tracking-widest text-[#4285F4] font-semibold mb-4 px-3">
                Navigation Menu
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col gap-2">
                {items.map((item, idx) => {
                  const isActive =
                    (item.href === "/" && location.pathname === "/" && !location.hash) ||
                    (item.href === "/#about" && location.hash === "#about") ||
                    (item.href !== "/" && !item.href.includes("#") && location.pathname.startsWith(item.href));

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200",
                          isActive
                            ? "bg-white/10 text-white font-semibold border border-white/15 shadow-lg"
                            : "text-neutral-400 hover:text-white hover:bg-white/5",
                        )}
                      >
                        <span className="text-xl tracking-tight">{item.title}</span>
                        {isActive && (
                          <span className="h-2 w-2 rounded-full bg-[#4285F4] shadow-[0_0_10px_#4285F4]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Bottom CTA in Drawer */}
            <div className="max-w-sm mx-auto w-full pt-6 border-t border-white/10">
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#4285F4] to-[#1a73e8] shadow-[0_0_25px_rgba(66,133,244,0.4)] active:scale-95 transition-transform"
              >
                <IconSparkles size={16} />
                <span>Join GDG ABESEC</span>
                <IconArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ============================================================
   NAVBAR ROOT EXPORT
============================================================ */

export default function Navbar({ className }) {
  const items = [
    { title: "Home", href: "/" },
    { title: "About", href: "/#about" },
    { title: "Events", href: "/events" },
    { title: "Team", href: "/team" },
    { title: "Showcase", href: "/achievements" },
    { title: "Contact", href: "/contact" },
  ];

  // Desktop uses the 5 core sections in the center, and the dedicated Contact CTA on the right
  const desktopItems = items.filter((item) => item.title !== "Contact");

  return (
    <>
      <DynamicIslandDesktop items={desktopItems} className={className} />
      <DynamicIslandMobile items={items} className={className} />
    </>
  );
}
