"use client";
import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  IconHome,
  IconInfoCircle,
  IconCalendarEvent,
  IconUsers,
  IconHelpCircle,
  IconMenu2,
  IconX,
  IconAward,
} from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const MotionLink = motion(Link);

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ============================================================
   Floating Dock Wrapper
   Updated: Accepts className to control visibility
============================================================ */

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
  className,
}) => {
  return (
    <>
      {/* Pass the visibility className to both desktop and mobile */}
      <FloatingDockDesktop
        items={items}
        className={cn(desktopClassName, className)}
      />
      <FloatingDockMobile
        items={items}
        className={cn(mobileClassName, className)}
      />
    </>
  );
};

/* ============================================================
   MOBILE FULLSCREEN HAMBURGER NAVBAR
============================================================ */

const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  return (
    <>
      {/* Toggle Button (☰ / ❌) */}
      <div
        className={cn("fixed top-4 right-4 z-[120] block lg:hidden", className)}
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900 shadow-lg"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <IconX className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <IconMenu2 className="h-6 w-6 text-neutral-700 dark:text-neutral-200" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex flex-col"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-1 flex-col max-w-xs mx-auto px-8 justify-center gap-7"
            >
              {items.map((item, idx) => (
                <MotionLink
                  key={item.title}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex items-center gap-4 text-white text-2xl font-semibold tracking-wide w-full justify-start"
                >
                  <span className="h-7 w-7">{item.icon}</span>
                  {item.title}
                </MotionLink>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ============================================================
   DESKTOP FLOATING DOCK
============================================================ */

const FloatingDockDesktop = ({ items, className }) => {
  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "fixed mx-auto top-14 left-1/2 z-[100] -translate-x-1/2 transform h-16 items-end gap-3.5 rounded-2xl px-4 pb-3 hidden lg:flex shadow-2xl backdrop-blur-md bg-white/5 border border-white/10",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

/* ============================================================
   ICON TO TEXT MORPHING DOCK ITEM
============================================================ */

function IconContainer({ mouseX, title, icon, href, colorClass }) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let width = useSpring(useTransform(distance, [-150, 0, 150], [42, 88, 42]));
  let height = useSpring(useTransform(distance, [-150, 0, 150], [42, 88, 42]));
  let widthIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 36, 20]),
  );
  let heightIcon = useSpring(
    useTransform(distance, [-150, 0, 150], [20, 36, 20]),
  );

  const [hovered, setHovered] = useState(false);

  return (
    <Link to={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-colors duration-300 hover:border-white/40 shadow-lg cursor-pointer overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {hovered ? (
            <motion.span
              key="text"
              initial={{ opacity: 0, scale: 0.65 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.65 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "font-bold text-[11px] tracking-wider uppercase text-center px-1 select-none",
                colorClass,
              )}
            >
              {title}
            </motion.span>
          ) : (
            <motion.div
              key="icon"
              initial={{ opacity: 0, scale: 0.65 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.65 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{ width: widthIcon, height: heightIcon }}
              className="flex items-center justify-center"
            >
              {icon}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Link>
  );
}

/* ============================================================
   NAVBAR EXPORT
============================================================ */

export default function Navbar({ className }) {
  const items = [
    {
      title: "Home",
      icon: <IconHome className="w-full h-full text-blue-400" />,
      colorClass: "text-blue-400",
      href: "/",
    },
    {
      title: "About",
      icon: <IconInfoCircle className="w-full h-full text-green-400" />,
      colorClass: "text-green-400",
      href: "/#about",
    },
    {
      title: "Events",
      icon: <IconCalendarEvent className="w-full h-full text-pink-400" />,
      colorClass: "text-pink-400",
      href: "/events",
    },
    {
      title: "Team",
      icon: <IconUsers className="w-full h-full text-orange-400" />,
      colorClass: "text-orange-400",
      href: "/team",
    },
    {
      title: "Showcase",
      icon: <IconAward className="w-full h-full text-purple-400" />,
      colorClass: "text-purple-400",
      href: "/achievements",
    },
    {
      title: "Contact",
      icon: <IconHelpCircle className="w-full h-full text-yellow-400" />,
      colorClass: "text-yellow-400",
      href: "/contact",
    },
  ];

  return <FloatingDock items={items} className={className} />;
}
