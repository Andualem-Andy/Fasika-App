"use client";

import React, { useEffect, useState } from "react";
import { useHeroStore } from "@/app/stores/heroStore";
import Image from "next/image";
import { PageSkeleton } from "@/app/components/skeletons/page-skeleton";

const BASE_URL = "http://localhost:1337";

export default function BeliefsSection() {
  const { heroes, loading, error, fetchHeroes } = useHeroStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    fetchHeroes();

    // Handle screen resize
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Mobile: below 768px
      setIsTablet(width >= 768 && width <= 1024); // Tablet: 768px to 1024px
      setIsDesktop(width > 1024); // Desktop: 1024px and above
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fetchHeroes]);

  if (loading) return <PageSkeleton />;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  const hero = heroes.length > 0 ? heroes[0] : null;
  if (!hero) return <PageSkeleton />;

  const imageUrl = hero.FredRogersImg?.url
    ? `${BASE_URL}${hero.FredRogersImg.url}`
    : "/fallback-image.jpg";

  return (
    <div>
      {isMobile ? (
        // MOBILE LAYOUT (below 768px)
        <div className="bg-[#F5DE191A] py-8 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Centered Practice */}
            <div className="text-center">
              <div className="relative inline-block">
                <h2 className="text-lg font-semibold text-dark font-bold">{hero.practice}</h2>
                <span className="absolute left-0 bottom-[-6px] w-full h-[4px] bg-yellow-500"></span>
              </div>
            </div>

            {/* Centered Believe */}
            <h2 className="text-2xl font-bold text-gray-800 mt-4 text-center">{hero.Believe}</h2>

            {/* Centered Powerplay */}
            <div className="text-center">
              <p className="text-base text-gray-600 mt-2">{hero.powerplay}</p>
            </div>

            {/* Mobile Card Section */}
            <div className="relative mt-6 mx-2">
              <div className="absolute inset-0 border-2 border-dashed border-black rounded-lg z-0 p-4 translate-y-3 translate-x-4" />

              <div className="bg-white rounded-lg shadow-lg p-4 relative z-10 transform -skew-x-2 -rotate-2 translate-y-4 translate-x-4">
                <div className="flex flex-col items-start text-left transform skew-x-1 rotate-1 mt-4 ml-4">
                  <img
                    src="/quote.svg"
                    alt="Quote icon"
                    className="w-8 h-8 mb-2 text-yellow-500 -translate-y-4"
                  />
                  <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed -translate-y-4">
                    {hero.playdesc}
                  </p>
                </div>

                {/* Mobile Image and Quote Section */}
                <div className="absolute top-2 right-4 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex flex-col sm:flex-row items-end sm:space-x-2 sm:space-y-0 sm:translate-x-0 sm:translate-y-0">
                  {/* Hero Image */}
                  <div className="relative w-full h-full sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                    <Image
                      src={imageUrl}
                      alt={hero?.FredRogersImg?.alternativeText || "Hero Image"}
                      width={96}
                      height={96}
                      className="rounded-xl object-cover w-full h-full absolute top-0 right-0 transform -translate-y-2"
                    />
                  </div>

                  {/* Fred Rogers Quote */}
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-black font-bold text-right transform skew-x-1 sm:translate-x-0 sm:translate-y-0 translate-y-[-10px] whitespace-nowrap">
                    {hero.FredRogers}
                  </p>

                  <div className="absolute top-1/2 right-4 flex flex-col sm:flex-row items-center justify-center">
                    <img
                      src="/quote1.svg"
                      alt="Quote icon"
                      className="w-8 h-8 text-yellow-500 transform translate-y-20 max-w-[430px]:translate-y-16"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isTablet ? (
        // TABLET LAYOUT (768px to 1024px)
        <div className="bg-[#F5DE191A] py-10 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Centered Practice */}
            <div className="text-center">
              <div className="relative inline-block">
                <h2 className="text-lg font-semibold text-dark font-bold">{hero.practice}</h2>
                <span className="absolute left-0 bottom-[-6px] w-full h-[4px] bg-yellow-500"></span>
              </div>
            </div>

            {/* Centered Believe */}
            <h2 className="text-2xl font-bold text-gray-800 mt-6 text-center">{hero.Believe}</h2>

            {/* Centered Powerplay */}
            <div className="text-center">
              <p className="text-base text-gray-600 mt-3">{hero.powerplay}</p>
            </div>

            {/* Tablet Card Section */}
            <div className="relative mt-6 mx-2">
              <div className="absolute inset-0 border-2 border-dashed border-black rounded-lg z-0 p-4 translate-y-3 translate-x-4" />

              <div className="bg-white rounded-lg shadow-lg p-4 relative z-10 transform -skew-x-2 -rotate-2 translate-y-4 translate-x-4">
                <div className="flex flex-col items-start text-left transform skew-x-1 rotate-1 mt-4 ml-4">
                  <img
                    src="/quote.svg"
                    alt="Quote icon"
                    className="w-8 h-8 mb-2 text-yellow-500 translate-y-24"
                  />
                  <p className="text-sm sm:text-base md:text-lg text-gray-800 leading-relaxed translate-y-24">
                    {hero.playdesc}
                  </p>
                </div>

                {/* Tablet Image and Quote Section */}
                <div className="relative flex justify-end items-center mt-4">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 relative">
                    {/* Hero Image */}
                    <Image
                      src={imageUrl}
                      alt={hero?.FredRogersImg?.alternativeText || "Hero Image"}
                      width={96}
                      height={96}
                      className="rounded-xl object-cover w-full h-full transform translate-y-[-170px] sm:translate-y-[-150px] md:translate-y-[-170px] lg:translate-y-[-170px]"
                    />
                  </div>

                  {/* Fred Rogers Quote */}
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg text-black font-bold text-right transform skew-x-1 whitespace-nowrap absolute right-0 translate-y-[-84px] translate-x-[-20px] sm:translate-y-[-74px] sm:translate-x-[-15px] md:translate-y-[-84px] md:translate-x-[-10px] lg:translate-y-[-84px] lg:translate-x-[-5px]">
                    {hero.FredRogers}
                  </p>

                  {/* Quote Icon */}
                  <div className="absolute top-1/2 right-4 flex items-center justify-center transform translate-y-2">
                    <img
                      src="/quote1.svg"
                      alt="Quote icon"
                      className="w-8 h-8 mb-2 text-yellow-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : isDesktop ? (
        // DESKTOP LAYOUT (1024px and above)
        <div className="bg-[#F5DE191A] py-16 px-8">
          <div className="max-w-7xl mx-auto">
            {/* Left-aligned Practice */}
            <div className="relative inline-block">
              <h2 className="text-lg font-semibold text-dark font-bold">{hero.practice}</h2>
              <span className="absolute left-0 bottom-[-6px] w-full h-[4px] bg-yellow-500"></span>
            </div>

            {/* Left-aligned Believe */}
            <h2 className="text-3xl font-bold text-gray-800 mt-6">{hero.Believe}</h2>

            {/* Left-aligned Powerplay */}
            <div className="text-left">
              <p className="text-lg font-bold text-gray-600 mt-4">{hero.powerplay}</p>
            </div>

            {/* Desktop Card Section */}
            <div className="relative mt-8 mr-16">
              <div className="absolute inset-0 border-2 border-dashed border-black rounded-lg z-0 p-8 translate-y-5 translate-x-8" />

              <div className="bg-white rounded-lg shadow-lg p-8 relative z-10 transform -skew-x-3 -rotate-3 translate-x-11 ml-2">
                <div className="flex flex-col items-start text-left transform skew-x-2 rotate-1 mt-12 ml-16">
                  <img
                    src="/quote.svg"
                    alt="Quote icon"
                    className="w-8 h-8 mb-2 text-yellow-500 -translate-y-8"
                  />
                  <p className="text-lg font-bold text-gray-800 leading-relaxed -translate-y-8">
                    {hero.playdesc.split("Play is really the work of child")[0]}
                  </p>
                  <p className="text-lg font-bold text-gray-800 ml-32 -translate-y-6">
                    Play is really the work of a child.
                  </p>
                </div>

                {/* Desktop Image Section */}
                <div className="relative">
                  <div className="absolute top-4 right-4 sm:top-auto sm:bottom-6 sm:right-6 w-16 h-16 sm:w-24 sm:h-24 -translate-x-14 translate-y-[-24px]">
                    {/* Icon */}
                    <img
                      src="/Iconfred.svg"
                      alt="Quote icon"
                      className="absolute top-0 right-0 z-10 w-8 h-8 sm:w-10 sm:h-10 transform -translate-y-2 translate-x-8"
                    />

                    {/* Hero Image */}
                    <Image
                      src={imageUrl}
                      alt={hero?.FredRogersImg?.alternativeText || "Hero Image"}
                      width={96}
                      height={96}
                      className="rounded-xl object-cover w-full h-full"
                    />
                  </div>

                  {/* Fred Rogers Quote */}
                  <div className="relative">
                    <p className="absolute bottom-12 sm:bottom-6 right-4 text-sm sm:text-base text-black font-bold text-right transform skew-x-1 -translate-x-14 mt-8">
                      {hero.FredRogers}
                    </p>

                    <img
                      src="/quote1.svg"
                      alt="Quote icon"
                      className="w-8 h-8 mb-2 text-yellow-500 absolute right-10"
                      style={{ transform: "translateX(-150px) translateY(-32px)" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}