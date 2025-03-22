"use client";

import { useEffect, useState } from "react";

const ScrollDownArrow = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Scroll down function
  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  // Hide the arrow when the user reaches the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight - 100) {
        setIsVisible(false); // Hide the arrow at the bottom of the page
      } else {
        setIsVisible(true); // Show the arrow otherwise
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-8 right-8 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollDown}
        className="p-3 bg-[#073F27] text-white rounded-full shadow-lg hover:bg-[#073F27]/90 transition-colors"
        aria-label="Scroll down"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollDownArrow;