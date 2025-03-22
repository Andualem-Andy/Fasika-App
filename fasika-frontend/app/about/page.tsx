"use client";

import { useEffect, useState } from "react";
import { useAboutStore } from "@/app/stores/aboutStore";
import PageLayout from "@/app/components/PageLayout/PageLayout";
import NewsletterSection from "../components/Newsletter/Newsletter";
import Footer from "../components/footer/footer";
import AboutContent from "./AboutContent";
import ScrollDownArrow from "../components/shapes/ScrollDownArrow";

export default function AboutPage() {
  const { data, loading, error, fetchAboutData } = useAboutStore();
  const [genesisSections, setGenesisSections] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Fetch data and detect screen size on mount
  useEffect(() => {
    if (!data && !loading && !error) {
      fetchAboutData();
    }

    if (data?.Genesisdesc) {
      const sections = data.Genesisdesc.includes("---")
        ? data.Genesisdesc.split("---").map((section: string) => section.trim())
        : [data.Genesisdesc];
      setGenesisSections(sections);
    }

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 767); // Mobile: width <= 767px
      setIsTablet(width >=768 && width < 1024); // Tablet: width >= 768px and width < 1024px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data, loading, error, fetchAboutData]);

  // Set the background image URL dynamically
  const genesisImageUrl = data?.Genesisimg?.formats?.large?.url
    ? `http://localhost:1337${data.Genesisimg.formats.large.url}`
    : data?.Genesisimg?.url
    ? `http://localhost:1337${data.Genesisimg.url}`
    : null;

  // Set the about page background image URL dynamically
  const bgImageUrl = data?.aboutbg?.url
    ? `http://localhost:1337${data.aboutbg.url}`
    : "";

  return (
    <PageLayout title="About Us" loading={loading} error={error} bgImageUrl={bgImageUrl}>
      {/* Apply translate-x-16 only for desktop */}
      <div className="text-center ml-8 lg:translate-x-16">
        {/* Mobile View */}
        {isMobile && !isTablet && (
          <>
            {/* Mobile-specific UI */}
            <section className="mt-3 flex flex-col gap-2 px-4">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-[#006400] mt-2">{data?.Genesis}</h1>
                <p className="text-base font-normal text-center mt-2">{data?.aboutmotto}</p>
                <div className="flex flex-col items-center gap-4 mt-4">
                  {genesisSections.map((section, index) => (
                    <p className="text-base font-normal text-justify justify-start w-full mx-auto mt-4" key={index}>
                      {section}
                    </p>
                  ))}
                </div>
              </div>

              {/* Mobile Genesis Image */}
              <div className="relative w-56 h-[250px] mx-auto">
                {genesisImageUrl && (
                  <div className="relative w-full h-full">
                    <img
                      src={genesisImageUrl}
                      alt="Genesis Image"
                      className="absolute bottom-0 w-56 h-80px rounded-lg shadow-2xl object-contain transform -translate-x-4 translate-y-10 transition-all duration-300 hover:translate-x-6 hover:translate-y-10 hover:scale-105 hover:shadow-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold hover:opacity-90"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* Tablet View */}
        {isTablet && (
          <>
            {/* Tablet-specific UI */}
            <section className="mt-4 flex flex-row items-start justify-center gap-8">
              {/* Left Side: Genesis Description */}
              <div className="flex-1 text-center">
                <h3 className="text-3xl font-bold text-[#006400]">{data?.Genesis}</h3>
                <p className="text-lg font-normal text-center mt-8">{data?.aboutmotto}</p>
                {genesisSections.map((section, index) => (
                  <p className="text-sm font-normal text-left mt-8" key={index}>
                    {section}
                  </p>
                ))}
              </div>

              {/* Right Side: Genesis Image */}
              <div className="relative w-64 h-[300px] mx-auto">
                {genesisImageUrl && (
                  <div className="relative w-full h-full transform translate-y-16">
                    <div className="absolute inset-0 bg-[#F5DE19] rounded-lg shadow-md transform translate-y-12" />
                    <img
                      src={genesisImageUrl}
                      alt="Genesis Image"
                      className="absolute bottom-0 w-64 h-[300px] rounded-lg shadow-md transform translate-y-12"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* Desktop View */}
        {!isMobile && !isTablet && (
          <>
            {/* Desktop-specific UI */}
            <section className="mt-4 flex flex-row items-start gap-8">
              <div className="flex-1">
                <p className="text-base font-normal text-left mt-2 ml-4">{data?.aboutmotto}</p>
                <h3 className="text-4xl font-bold text-[#006400] text-left ml-4 mt-4">{data?.Genesis}</h3>
                {genesisSections.map((section, index) => (
                  <div className="flex flex-row items-start gap-4" key={index}>
                    <p className="text-lg font-normal text-left mt-4 ml-4">{section}</p>
                  </div>
                ))}
              </div>

              {/* Right Side: Genesis Image */}
              <div className="flex-1 relative">
                {genesisImageUrl && (
                  <div className="relative w-80 h-80px mx-auto md:w-120 md:h-[487px]">
                    <img
                      src={`${genesisImageUrl}?width=1200&quality=90`}
                      alt="Genesis Image"
                      className="absolute bottom-0 w-full h-80px rounded-lg shadow-2xl object-contain transform translate-x-4 -translate-y-16 transition-all duration-300 hover:translate-x-6 hover:translate-y-10 hover:scale-105 hover:shadow-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold hover:opacity-90"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </div>

      {/* AboutContent Component */}
      <AboutContent isTablet={isTablet} isMobile={isMobile} />

      {/* Optional additional sections */}
      <ScrollDownArrow />
      <NewsletterSection />
      <Footer />
    </PageLayout>
  );
}