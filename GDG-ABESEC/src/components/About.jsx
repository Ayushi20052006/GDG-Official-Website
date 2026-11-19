import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import StatsSection from "./StatsSection";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: false,
      offset: 100,
    });
  }, []);

  return (
    <>
      <section
        id="about"
        className="min-h-screen bg-[#0a0a0a] pt-32 pb-20 px-6 md:px-12 lg:px-20 relative overflow-hidden -mt-16 "
        style={{
          background: "linear-gradient(to bottom, #080808 0%, #0a0a0a 60%)",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8" data-aos="fade-right">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span className="text-white">Empowering developers</span>
                <br />
                <span className="text-[#4285F4]">through innovation</span>
                <br />
                <span className="text-white">and collaboration</span>
              </h2>

              <p
                className="text-[#a3a3a3] text-lg leading-relaxed max-w-xl"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Google Developer Groups on Campus ABESEC is a vibrant community
                of passionate developers, designers, and innovators. We bridge
                the gap between classroom learning and real-world experience
                through hands-on workshops, exciting hackathons, and
                collaborative tech sessions.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/team"
                  className="group relative px-8 py-3 bg-transparent border-2 border-[#4285F4] text-[#4285F4] font-semibold rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:text-white"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span className="relative z-10">Meet Our Team →</span>
                  <div className="absolute bottom-0 left-0 w-full h-0 bg-[#1a73e8] group-hover:h-full transition-all duration-500 ease-out"></div>
                </a>

                <a
                  href="/events"
                  className="group relative px-8 py-3 bg-transparent border-2 border-[#34A853] text-[#34A853] font-semibold rounded-lg overflow-hidden cursor-pointer transition-all duration-500 ease-out hover:text-white"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <span className="relative z-10">Explore Events →</span>
                  <div className="absolute bottom-0 left-0 w-full h-0 bg-[#1f8c4c] group-hover:h-full transition-all duration-500 ease-out"></div>
                </a>
              </div>
            </div>

            <div
              className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8"
              data-aos="fade-left"
            >
              <div
                className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 ease-out hover:scale-[1.05] cursor-pointer"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <img
                  src="/image4ForDomeGal.jpg"
                  alt="Team collaboration"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover object-center bg-black transition-transform duration-700 ease-out hover:scale-110"
                />
              </div>

              <div
                className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 ease-out hover:scale-[1.05] cursor-pointer"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <img
                  src="/hackheaven5.jpeg"
                  alt="Workshop session"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover object-center bg-black transition-transform duration-700 ease-out hover:scale-110"
                />
              </div>

              <div
                className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 ease-out hover:scale-[1.05] cursor-pointer"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <img
                  src="techwinter4.jpeg"
                  alt="Innovation hub"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover object-center bg-black transition-transform duration-700 ease-out hover:scale-110"
                />
              </div>

              <div
                className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 ease-out hover:scale-[1.05] cursor-pointer"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <img
                  src="mtg2.0.jpg"
                  alt="Developer community"
                  loading="lazy"
                  decoding="async"
                  className="w-full  h-48 sm:h-56 md:h-64 lg:h-72 object-cover object-center bg-black transition-transform duration-700 ease-out hover:scale-110"
                />
              </div>

              <div className="absolute -top-8 -right-8 w-24 h-24 bg-[#4285F4] opacity-10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#34A853] opacity-10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
    </>
  );
}
