"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
      setIsMobile(width <= 767);
      setIsTablet(width >= 768 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [data, loading, error, fetchAboutData]);

  const genesisImageUrl = data?.Genesisimg?.formats?.large?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.Genesisimg.formats.large.url}`
    : data?.Genesisimg?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.Genesisimg.url}`
    : null;

  const bgImageUrl = data?.aboutbg?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.aboutbg.url}`
    : "";

  return (
    <PageLayout title="About Us" loading={loading} error={error} bgImageUrl={bgImageUrl}>
      <div className="text-center ml-8 lg:translate-x-16">
        {/* Mobile View */}
        {isMobile && !isTablet && (
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

            <div className="relative w-56 h-[250px] mx-auto">
              {genesisImageUrl && (
                <div className="relative w-full h-full">
                  <Image
                    src={genesisImageUrl}
                    alt="Genesis Image"
                    width={224}
                    height={250}
                    className="absolute bottom-0 rounded-lg shadow-2xl object-contain transform -translate-x-4 translate-y-10 transition-all duration-300 hover:translate-x-6 hover:translate-y-10 hover:scale-105 hover:shadow-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold hover:opacity-90"
                    priority // Add priority for LCP images
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Tablet View */}
        {isTablet && (
          <section className="mt-4 flex flex-row items-start justify-center gap-8">
            <div className="flex-1 text-center">
              <h3 className="text-3xl font-bold text-[#006400]">{data?.Genesis}</h3>
              <p className="text-lg font-normal text-center mt-8">{data?.aboutmotto}</p>
              {genesisSections.map((section, index) => (
                <p className="text-sm font-normal text-left mt-8" key={index}>
                  {section}
                </p>
              ))}
            </div>

            <div className="relative w-64 h-[300px] mx-auto">
              {genesisImageUrl && (
                <div className="relative w-full h-full transform translate-y-16">
                  <div className="absolute inset-0 bg-[#F5DE19] rounded-lg shadow-md transform translate-y-12" />
                  <Image
                    src={genesisImageUrl}
                    alt="Genesis Image"
                    width={256}
                    height={300}
                    className="absolute bottom-0 rounded-lg shadow-md transform translate-y-12"
                    priority // Add priority for LCP images
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Desktop View */}
        {!isMobile && !isTablet && (
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

            <div className="flex-1 relative">
              {genesisImageUrl && (
                <div className="relative w-80 h-[487px] mx-auto md:w-[480px]">
                  <Image
                    src={`${genesisImageUrl}?width=1200&quality=90`}
                    alt="Genesis Image"
                    width={280}
                    height={287}
                    className="absolute bottom-0 rounded-lg shadow-2xl object-contain transform translate-x-4 -translate-y-16 transition-all duration-300 hover:translate-x-6 hover:translate-y-10 hover:scale-105 hover:shadow-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white font-semibold hover:opacity-90"
                    priority // Add priority for LCP images
                  />
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      <AboutContent isTablet={isTablet} isMobile={isMobile} />
      <ScrollDownArrow />
      <NewsletterSection />
      <Footer />
    </PageLayout>
  );
}