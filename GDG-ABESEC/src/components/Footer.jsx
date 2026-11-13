"use client";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
} from "lucide-react";

import { FooterBackgroundGradient } from "./ui/hover-footer";
import { TextHoverEffect } from "./ui/hover-footer";
import { Link } from "react-router-dom";

function Footer() {
  // Footer link data
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Events", href: "/events" },
        { label: "Team", href: "/team" },
        { label: "Showcase", href: "/achievements" },
        { label: "Contact", href: "/contact" },
        { label: "Back to Top", action:"scrollTop" },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3ca2fa]" />,
      text: "dsc@abes.ac.in",
      href: "mailto:dsc@abes.ac.in",
    },
    {
      icon: <Phone size={18} className="text-[#3ca2fa]" />,
      text: "+91 98388 91188",
      href: "tel:+919838891188",
    },
    {
      icon: <MapPin size={18} className="text-[#3ca2fa]" />,
      text: "ABES Engineering College, Ghaziabad, India",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/company/gdg-abesec/", hoverColor: "hover:text-[#0A66C2]", },
    { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/gdg.abesec/", hoverColor: "hover:text-[#E4405F]", },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      label: "X",
      href: "https://x.com/gdgabesec",
      hoverColor: "hover:text-white",
    },
  ];

  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden mx-2 my-4 sm:mx-4 sm:my-6 md:m-8">
      <div className="max-w-7xl mx-auto px-3 py-4 sm:px-4 sm:py-7 lg:p-14 relative z-50 text-gray-300">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 lg:gap-16 pb-3 md:pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-2 md:col-span-2 md:order-1 md:items-center lg:col-span-1 lg:order-none items-center md:items-center lg:items-start text-center lg:text-left mb-6 md:mb-8 lg:mb-0">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <img src="/logo.png" alt="GDG Logo" className="h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10 object-contain"/>
              {/* ONE LINE — Mobile & Tablet */}
              <span className="text-lg sm:text-xl font-semibold text-white break-words max-w-[98%] text-center lg:hidden">
                Google Developer Groups
                </span>
                
                {/* TWO LINES — Desktop */}
                <div className="hidden lg:block leading-tight">
                  <div className="text-2xl font-bold text-white">
                    Google
                    </div>
                    <div className="text-lg font-medium text-gray-300">
                      Developer Groups
                      </div>
                      </div>
                      </div>


            <p className="text-sm leading-snug md:leading-relaxed md:text-center lg:text-left">
              A community of developers passionate about Google technologies and building innovative solutions.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="mx-auto w-fit md:order-2 lg:order-none">
              <h4 className="text-white text-lg font-semibold mb-2 md:mb-6 text-center">
                {section.title}
              </h4>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    {link.action === "scrollTop" ? (
                      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      className="hover:text-[#3ca2fa] transition-colors">
                        {link.label}
                        </button>
                        ) : (
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-[#3ca2fa] transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  )}
                    {link.pulse && (
                      <span className="absolute top-0 right-[-10px] w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div className="md:order-3 lg:order-none">
            <h4 className="text-white text-lg font-semibold mb-6 text-center lg:text-left">
              Contact Us
            </h4>
            <ul className="space-y-1.5 flex flex-col items-center md:items-start">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-[#3ca2fa] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="hover:text-[#3ca2fa] transition-colors text-sm break-words max-w-[98%]">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-700 my-3 sm:my-6" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-1 md:space-y-0">
          {/* Social icons */}
          <div className="flex space-x-3">
            {socialLinks.map(({ icon, label, href, hoverColor }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`text-gray-400 transition-colors ${hoverColor}`}
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} GDG ABESEC. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36 pointer-events-none z-0">
        <TextHoverEffect text="GDG ABESEC" className="pointer-events-auto" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default Footer;