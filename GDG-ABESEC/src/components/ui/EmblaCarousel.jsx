import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

export function EmblaCarousel({
  slides = [],
  options = { loop: true },
  autoplayDelay = 4000,
  renderSlide,
  className = "",
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    options,
    autoplayDelay ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })] : []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Embla Viewport */}
      <div className="overflow-hidden w-full rounded-2xl" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              {renderSlide ? renderSlide(slide, index) : slide}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons and Dots */}
      <div className="flex items-center justify-between mt-6 px-2">
        {/* Navigation Dots */}
        <div className="flex items-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === selectedIndex
                  ? "w-7 bg-[#4285F4] shadow-[0_0_10px_rgba(66,133,244,0.5)]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#4285F4]/50 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <IconArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next slide"
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#4285F4]/50 hover:bg-white/10 text-gray-300 hover:text-white transition-all duration-300 cursor-pointer"
          >
            <IconArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmblaCarousel;
