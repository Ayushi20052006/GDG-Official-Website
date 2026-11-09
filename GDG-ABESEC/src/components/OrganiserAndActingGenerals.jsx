import React, { useState } from "react";
import { AnimatedTestimonials } from "./ui/animated-testimonials";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

function OrganisersAndActingGenerals() {
  const testimonials = [
    {
      quote:
        "Leading with vision and purpose. Inspiring teams as a Team Leader and Community Builder to drive innovation and collaboration impactfully.",
      name: "Ayushi Jha",
      designation: "Organizer, GDG ABESEC",
      src: "OrganiserAndAG'sImages/Organiser1.png",
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
      src: "OrganiserAndAG'sImages/Organiser2.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/tajalli-us-samad",
        github: "https://github.com/qrstajalli",
      },
    },
    {
      quote:
        "Driven by curiosity, defined by innovation. Exploring technology, solving complex problems, and transforming ideas into intelligent solutions that create meaningful impact.",
      name: "Aryan Kumar Yadav",
      designation: "Acting General, GDG ABESEC",
      src: "OrganiserAndAG'sImages/ActingGeneral1.jpeg",
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
      src: "OrganiserAndAG'sImages/ActingGeneral2.jpeg",
      socials: {
        linkedin: "https://www.linkedin.com/in/riddhimaagarwalbly/",
        twitter: "https://x.com/Riddhimaagrwal28",
        github: "https://github.com/RiddhimaAgarwal28",
      },
    },
    {
      quote:
        "A curious mind with a creative spark, bringing people together, embracing new ideas, and turning possibilities into meaningful action",
      name: "Krishna Gupta",
      designation: "Acting General, GDG ABESEC",
      src: "OrganiserAndAG'sImages/ActingGeneral3.png",
      socials: {
        linkedin: "https://www.linkedin.com/in/rollnum21?utm_source=share_via&utm_content=profile&utm_medium=member_android",
        github: "https://github.com/rollnum21",
      },
    },
      // to be edited ->
    {
      quote:
        "Ensuring seamless collaboration and alignment. As a Strategic Maestro, guiding teams with foresight, clarity, and a vision for excellence.",
      name: "Kshitiz Srivastav",
      designation: "Acting General, GDG ABESEC",
      src: "OrganiserAndAG'sImages/ActingGeneral5.jpg",
      socials: {
        linkedin: "https://www.linkedin.com/in/kshitiz-srivastav-a87028333/",
        twitter: "https://x.com/KshitizonX",
        github: "https://github.com/",
      },
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div
      className="bg-[#0a0a0a] text-white flex flex-col items-center justify-center 
    pt-12 pb-3 sm:pt-16 sm:pb-6 lg:pt-20 lg:pb-10 px-4 md:px-6 lg:px-8 overflow-hidden"
    >
      <div className="text-center mt-10 mb-6 sm:mb-10 w-full px-2">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#e5e5e5] mb-4"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Meet the Leadership <span className="text-[#4285F4]">Board</span>
        </h2>

        <div className="h-[2px] w-40 sm:w-60 md:w-80 lg:w-[400px] mx-auto bg-[#4285F4] rounded-full"></div>
      </div>

      <div className="w-full max-w-7xl px-2 sm:px-4">
        <div className="animated-testimonials-container w-full">
          <AnimatedTestimonials
            testimonials={testimonials}
            autoplay={false}
            onChange={(index) => setActiveIndex(index)}
            showSocials={true}
          />
        </div>
      </div>
    </div>
  );
}

export default OrganisersAndActingGenerals;
