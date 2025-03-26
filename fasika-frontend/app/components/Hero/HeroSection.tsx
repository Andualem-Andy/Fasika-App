'use client';
import React, { useEffect, useState } from 'react';
import { useHeroStore } from '@/app/stores/heroStore';
import { Star, Codesandbox, Cpu } from "lucide-react";
import { PageSkeleton } from '@/app/components/skeletons/page-skeleton';
import Image from 'next/image';

// Use environment variable for base URL
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337";

export default function HeroSection() {
  const { heroes, fetchHeroes, loading, error } = useHeroStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetchHeroes();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fetchHeroes]);

  if (loading || error) return <PageSkeleton />;
  const hero = heroes[0];
  if (!hero) return <PageSkeleton />;

  const imageUrl = isMobile && hero.MobileView?.url
    ? `${BASE_URL}${hero.MobileView.url}`
    : hero.hero2image?.url
    ? `${BASE_URL}${hero.hero2image.url}`
    : '/fallback-image.jpg';

  const imageAlt = isMobile 
    ? hero.MobileView?.alternativeText || "Mobile hero image" 
    : hero.hero2image?.alternativeText || "Desktop hero image";

  return (
    <div>
      {isMobile ? (
        // MOBILE LAYOUT WITH FASIKADESC ABOVE IMAGE
        <section className="bg-[#F5DE191A] py-6 px-4">
          <div className="max-w-6xl mx-auto">
            {/* About Section */}
            <div className="text-center mb-3">
              <h3 className="text-base font-bold text-black relative inline-block">
                {hero.about}
                <span className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-yellow-500" />
              </h3>
            </div>

            {/* Main Title */}
            <h1 className="text-2xl font-bold text-[#374151] text-center mb-4">
              {hero.Inspiring}
            </h1>

            {/* Divider Line */}
            <div className="w-full h-[1px] bg-[#073F27] mb-5" />

            {/* Features Grid */}
            <div className="space-y-6 mb-6">
              {[hero.Commitment, hero.Vision, hero.Mission].map((content, index) => (
                <div key={index} className="flex flex-col items-center text-center p-4">
                  <div className="mb-3 p-2 bg-white rounded-full border-2 border-yellow-400">
                    {index === 0 && <Star className="w-5 h-5 text-green-700" />}
                    {index === 1 && <Codesandbox className="w-5 h-5 text-green-700" />}
                    {index === 2 && <Cpu className="w-5 h-5 text-green-700" />}
                  </div>
                  <h2 className="text-lg font-bold text-[#1F2937] mb-1">
                    {["Our Commitment", "Our Vision", "Our Mission"][index]}
                  </h2>
                  <p className="text-xl text-[#4B5563]">{content}</p>
                </div>
              ))}
            </div>

            {/* Divider Line */}
            <div className="w-full h-[1px] bg-[#073F27] my-5" />

            {/* Description Text - Moved Up */}
            <p className="text-lg font-bold text-[#6B7280] text-center mb-4">
              {hero.fasikadesc}
            </p>

            {/* Image Section */}
            <div className="mb-6">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={800}
                height={600}
                className="rounded-lg shadow-lg w-full"
                priority
              />
            </div>

            {/* Mobile Button */}
            <div className="mb-4">
              {hero.CTAButton3?.map((button) => (
                <a
                  key={button.id}
                  href={button.href}
                  className="block w-full bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium shadow-md hover:bg-green-800 text-center"
                >
                  {button.text}
                </a>
              ))}
            </div>
          </div>
        </section>
      ) : (
        // DESKTOP/TABLET LAYOUT
        <section className="bg-[#F5DE191A] py-12 px-6 lg:px-8">
          <div className="max-w-6xl mx-auto lg:ml-32">
            {/* About Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-black relative inline-block">
                {hero.about}
                <span className="absolute bottom-[-3px] left-0 w-full h-[2px] bg-yellow-500" />
              </h3>
            </div>

            {/* Main Title */}
            <h1 className="flex flex-col text-3xl md:text-4xl font-bold text-[#374151] mb-6">
              {hero.Inspiring?.split(" Development")[0] || hero.Inspiring}
              <span className="text-3xl md:text-4xl font-bold text-[#374151]">
                Development
              </span>
            </h1>

            {/* Divider Line */}
            <div className="w-full h-px bg-[#073F27] mb-8" />

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[hero.Commitment, hero.Vision, hero.Mission].map((content, index) => (
                <div key={index} className="flex flex-col p-6">
                  <div className="mb-4 p-2 bg-white rounded-full border-2 border-yellow-400 w-fit">
                    {index === 0 && <Star className="w-6 h-6 text-green-700" />}
                    {index === 1 && <Codesandbox className="w-6 h-6 text-green-700" />}
                    {index === 2 && <Cpu className="w-6 h-6 text-green-700" />}
                  </div>
                  <h2 className="text-xl font-bold text-[#1F2937] mb-2">
                    {["Our Commitment", "Our Vision", "Our Mission"][index]}
                  </h2>
                  <p className="text-base text-[#4B5563]">{content}</p>
                </div>
              ))}
            </div>

            {/* Divider Line */}
            <div className="w-full h-px bg-[#073F27] my-10" />

            {/* Button and Description Row */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
              <div className="flex-1">
                {hero.CTAButton3?.map((button) => (
                  <a
                    key={button.id}
                    href={button.href}
                    className="inline-block bg-[#073F27] text-[#F5DE19] text-bold font-medium shadow-md hover:bg-green-800 
                    rounded-full border border-gray-400 pt-4 pr-6 pb-4 pl-6">
                    {button.text}
                  </a>
                ))}
              </div>
              <p className="flex-1 text-[#6B7280] text-base text-left">
                {hero.fasikadesc}
              </p>
            </div>

            {/* Image Section */}
            <div className="flex justify-center">
              <Image
                src={imageUrl}
                alt={imageAlt}
                width={1200}
                height={800}
                className="rounded-lg shadow-lg w-full max-w-4xl"
                priority
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}