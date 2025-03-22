"use client";

import { useState } from "react";
import Circle from "@/app/components/shapes/Circle";
import Oval from "@/app/components/shapes/Oval";
import { useAboutStore } from "@/app/stores/aboutStore";
import { Card, CardHeader } from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import { CTAButton } from "../components/shapes/CTAButton";

interface AboutContentProps {
  isTablet: boolean;
  isMobile: boolean;
}

export default function AboutContent({ isTablet, isMobile }: AboutContentProps) {
  const { data, error } = useAboutStore();
  const [showMoreHolistic, setShowMoreHolistic] = useState(false);
  const [showMoreSpecialNeeds, setShowMoreSpecialNeeds] = useState(false);
  const [showMoreLearningEnv, setShowMoreLearningEnv] = useState(false);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div></div>;
  }

  const toggleShowMoreHolistic = () => {
    setShowMoreHolistic((prev) => !prev);
  };

  const toggleShowMoreSpecialNeeds = () => {
    setShowMoreSpecialNeeds((prev) => !prev);
  };

  const toggleShowMoreLearningEnv = () => {
    setShowMoreLearningEnv((prev) => !prev);
  };

  return (
    <div className="about-content relative">
      {/* Mobile View */}
      {isMobile && !isTablet && (
        <>
          {/* Mobile-specific UI */}
          <section className="relative">
            <Circle size={50} color="yellow" className="absolute top-2 left-4 -translate-y-14" />
            <div className="text-center mt-16 mb-4">
              <p className="text-base font-normal text-justify top-2 pl-4 mb-4">{data.aboutmotto}</p>
              <h1 className="text-lg font-bold text-[#006400] text-justify pl-16">{data.Missionvision}</h1>
            </div>
          </section>

          {/* Middle Section: Cards Grid */}
          <section className="mt-8 mx-4 grid grid-cols-1 gap-4 justify-items-center">
            {/* Mission Card */}
            <Card className="bg-[#F5DE191A] shadow rounded-2xl w-full max-w-[300px] h-[320px] flex flex-col justify-between items-center p-0">
              <CardHeader className="text-left p-4">
                <div className="flex flex-row items-center">
                  <img src="/mission.svg" alt="Mission" className="h-16 w-16 mr-4" />
                  <h3 className="text-xl text-justify font-semibold">Mission</h3>
                </div>
                <p className="text-base text-justify text-gray-600 mt-4 flex items-start">
                  <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2" />
                  {data.Missiondesc}
                </p>
              </CardHeader>
            </Card>

            {/* Vision Card */}
            <Card className="bg-[#F5DE191A] shadow rounded-2xl w-full max-w-[300px] h-[320px] flex flex-col justify-between items-center p-0">
              <CardHeader className="text-left p-4">
                <div className="flex flex-row items-center">
                  <img src="/vission.svg" alt="Vision" className="h-16 w-16 mr-4" />
                  <h3 className="text-xl font-semibold">Vision</h3>
                </div>
                <p className="text-base text-justify text-gray-600 flex items-start">
                  <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2" />
                  {data.Visiondesc}
                </p>
              </CardHeader>
            </Card>

            {/* Values Card */}
            <div className="w-full max-w-[400px]">
              <Card className="bg-[#F5DE191A] shadow rounded-2xl w-full h-full p-2">
                <CardHeader className="text-center w-full p-0">
                  <div className="flex flex-row items-center">
                    <img src="/value.svg" alt="Values" className="h-16 w-16 mr-4 ml-12" />
                    <h3 className="text-xl font-semibold ml-4">Values</h3>
                  </div>
                  <div className="text-base text-gray-600 flex flex-row gap-4 mt-6 w-full">
                    {/* Left Column: First 6 sections */}
                    <div className="flex-1">
                      {data.Valuesdesc && data.Valuesdesc.includes("---") ? (
                        data.Valuesdesc
                          .split("---")
                          .slice(0, 6)
                          .map((section, index) => (
                            <div key={index} className="flex items-start mt-4">
                              <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                              <p className="text-left">{section.trim()}</p>
                            </div>
                          ))
                      ) : (
                        <div className="flex items-start">
                          <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                          <p className="text-left">{data.Valuesdesc}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Remaining sections */}
                    <div className="flex-1">
                      {data.Valuesdesc && data.Valuesdesc.includes("---") ? (
                        data.Valuesdesc
                          .split("---")
                          .slice(6, 11)
                          .map((section, index) => (
                            <div key={index + 6} className="flex items-start mt-4">
                              <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                              <p className="text-left">{section.trim()}</p>
                            </div>
                          ))
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Bottom Section: Oval */}
          <section className="relative mt-24">
            <Oval className="absolute left-0 bottom-0 ml-6" />
          </section>

          {/* Our Commitment to Child Development */}
          <section className="mt-8">
            <div className="ml-4 p-4">
              <h1 className="text-lg text-[#006400] text-center font-bold mb-2">{data.Commitment}</h1>
              <p className="text-base text-justify">{data.FosteringGrowth}</p>

              {/* Side by Side Layout: Holistic Growth, Support for Special Needs, Learning Environments */}
              <div className="flex flex-col space-y-8 p-5">
                {/* Holistic Growth */}
                <div className="text-left pl-4">
                  <img src="/star.svg" alt="staricon" className="h-12 w-12 mr-6 ml-24" />
                  <div className="flex flex-row items-center mb-4">
                    <h3 className="text-2xl text-center font-semibold ml-10">{data.HolisticGrowth}</h3>
                  </div>

                  {/* Display first 3 paragraphs by default */}
                  {data.HolisticGrowthdesc.slice(0, showMoreHolistic ? data.HolisticGrowthdesc.length : 1).map((paragraph, index) => (
                    <p key={index} className="text-base text-gray-600 text-justify max-w-[250px] mt-4">
                      {paragraph.children[0].text}
                    </p>
                  ))}

                  {/* "Read More" or "Read Less" Button */}
                  {data.HolisticGrowthdesc.length > 1 && (
                    <button
                      className="text-[#006400] underline flex items-center mt-4 ml-16"
                      onClick={toggleShowMoreHolistic}
                    >
                      {showMoreHolistic ? "Read Less" : "Read More"} <MoveRight className="ml-2" />
                    </button>
                  )}
                </div>

                {/* Support for Special Needs */}
                <div className="text-left pl-4">
                  <img src="/star.svg" alt="staricon" className="h-12 w-12 mr-6 ml-24" />
                  <div className="flex flex-row items-center mb-4">
                    <h3 className="text-2xl text-center font-semibold">{data.SpecialNeeds}</h3>
                  </div>

                  {/* Display first 3 paragraphs by default */}
                  {data.SpecialNeedsdesc.slice(0, showMoreSpecialNeeds ? data.SpecialNeedsdesc.length : 1).map((paragraph, index) => (
                    <p key={index} className="text-base text-gray-600 text-justify max-w-[250px] mt-4">
                      {paragraph.children[0].text}
                    </p>
                  ))}

                  {/* "Read More" or "Read Less" Button */}
                  {data.SpecialNeedsdesc.length > 1 && (
                    <button
                      className="text-[#006400] underline flex items-center mt-4 ml-16"
                      onClick={toggleShowMoreSpecialNeeds}
                    >
                      {showMoreSpecialNeeds ? "Read Less" : "Read More"} <MoveRight className="ml-2" />
                    </button>
                  )}
                </div>

                {/* Learning Environments */}
                <div className="text-left pl-4">
                  <img src="/star.svg" alt="staricon" className="h-12 w-12 mr-6 ml-24" />
                  <div className="flex flex-row items-center mb-4">
                    <h3 className="text-2xl font-semibold">{data.Learningevt}</h3>
                  </div>

                  {/* Display first 3 paragraphs by default */}
                  {data.Learningevtdesc.slice(0, showMoreLearningEnv ? data.Learningevtdesc.length : 3).map((paragraph, index) => (
                    <p key={index} className="text-base text-gray-600 text-left max-w-[250px] mt-4">
                      {paragraph.children[0].text}
                    </p>
                  ))}

                  {/* "Read More" or "Read Less" Button */}
                  {data.Learningevtdesc.length > 3 && (
                    <button
                      className="text-[#006400] underline flex items-center mt-4 ml-16"
                      onClick={toggleShowMoreLearningEnv}
                    >
                      {showMoreLearningEnv ? "Read Less" : "Read More"} <MoveRight className="ml-2" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-justify">{data.Everychild}</p>
              <div className="flex justify-center mt-10">
                <CTAButton
                  href="/services"
                  text="Explore All Programs"
                  className="bg-[#073F27] text-[#FFD700] text-xl font-semibold rounded-[80px] px-[24px] py-[14px] flex items-center justify-center gap-[10px] flex-none hover:bg-[#065c3d] hover:text-white transition duration-300"
                />
              </div>
            </div>
          </section>
        </>
      )}


      {/* Tablet View */}
      {isTablet && (
        <>
          {/* Tablet-specific UI */}
          <section className="relative">
            <Circle size={60} color="yellow" className="absolute top-2 left-4 -translate-y-12" />
            <div className="text-center mt-16 ml-4">
              <p className="text-base font-normal text-left mt-2 px-4">
                {data.aboutmotto}
              </p>
              <h1 className="text-xl font-bold text-[#006400] text-left px-4 mt-4 mb-12">
                {data.Missionvision}
              </h1>
            </div>
          </section>

          {/* Middle Section: Cards Grid */}
          <section className="mt-8 mx-8 grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
            {/* Mission Card */}
            <Card className="bg-[#F5DE191A] shadow rounded-2xl w-full max-w-[450px] h-[320px] flex flex-col justify-between items-center p-0">
              <CardHeader className="text-left p-4">
                <div className="flex flex-row items-center">
                  <img src="/mission.svg" alt="Mission" className="h-16 w-16 mr-4 mb-4" />
                  <h3 className="text-xl font-semibold">Mission</h3>
                </div>
                <p className="text-base text-left text-gray-600 mt-4 flex items-start">
                  <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2" />
                  {data.Missiondesc}
                </p>
              </CardHeader>
            </Card>

            {/* Vision Card */}
            <Card className="bg-[#F5DE191A] shadow rounded-2xl w-full max-w-[400px] h-[320px] flex flex-col justify-between items-center p-0">
              <CardHeader className="text-left p-4">
                <div className="flex flex-row items-center">
                  <img src="/vission.svg" alt="Vision" className="h-16 w-16 mr-4 mb-4" />
                  <h3 className="text-xl font-semibold">Vision</h3>
                </div>
                <p className="text-base text-left text-gray-600 flex items-start">
                  <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2" />
                  {data.Visiondesc}
                </p>
              </CardHeader>
            </Card>

            {/* Values Card */}
            <div className="w-full max-w-[500px] col-span-2">
              <Card className="bg-[#F5DE191A] shadow rounded-2xl w-full h-full p-2">
                <CardHeader className="text-center w-full p-0">
                  <div className="flex flex-row items-center justify-center">
                    <img src="/value.svg" alt="Values" className="h-16 w-16 mr-4" />
                    <h3 className="text-xl font-semibold">Values</h3>
                  </div>
                  <div className="text-base text-gray-600 flex flex-col md:flex-row gap-4 mt-4">
                    {/* Left Column: First 6 sections */}
                    <div className="flex-1">
                      {data.Valuesdesc && data.Valuesdesc.includes("---") ? (
                        data.Valuesdesc
                          .split("---")
                          .slice(0, 5)
                          .map((section, index) => (
                            <div key={index} className="flex items-start mt-4">
                              <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                              <p className="text-left">{section.trim()}</p>
                            </div>
                          ))
                      ) : (
                        <div className="flex items-start">
                          <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                          <p className="text-left">{data.Valuesdesc}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Remaining sections */}
                    <div className="flex-1">
                      {data.Valuesdesc && data.Valuesdesc.includes("---") ? (
                        data.Valuesdesc
                          .split("---")
                          .slice(5, 11)
                          .map((section, index) => (
                            <div key={index + 4} className="flex items-start mt-4">
                              <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                              <p className="text-left">{section.trim()}</p>
                            </div>
                          ))
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Bottom Section: Oval */}
          <section className="relative mt-24">
            <Oval className="absolute left-0 bottom-0 ml-6" />
          </section>

          {/* Our Commitment to Child Development */}
          <section className="mt-14">
            <div className="our-commitment ml-4 p-4">
              <h1 className="text-2xl text-[#006400] text-left font-bold">
                {data.Commitment}
              </h1>
              <p className="text-lg text-left mt-4">
                {data.FosteringGrowth}
              </p>

              {/* Side by Side Layout: Holistic Growth, Support for Special Needs, Learning Environments */}
              <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-2 p-2">
                {/* Holistic Growth */}
                <div className="text-left p-4">
                  <div className="flex flex-row items-center mb-4">
                    <img src="/star.svg" alt="staricon" className="h-14 w-14 mr-6" />
                    <h3 className="text-2xl font-semibold">{data.HolisticGrowth}</h3>
                  </div>

                  {/* Display first 3 paragraphs by default */}
                  {data.HolisticGrowthdesc.slice(0, showMoreHolistic ? data.HolisticGrowthdesc.length : 1).map((paragraph, index) => (
                    <p key={index} className="text-base text-justify text-gray-600 text-left max-w-[250px] mt-4">
                      {paragraph.children[0].text}
                    </p>
                  ))}

                  {/* "Read More" or "Read Less" Button */}
                  {data.HolisticGrowthdesc.length > 1 && (
                    <button
                      className="text-[#006400] underline flex items-center mt-4"
                      onClick={toggleShowMoreHolistic}
                    >
                      {showMoreHolistic ? "Read Less" : "Read More"} <MoveRight className="ml-2" />
                    </button>
                  )}
                </div>

                {/* Support for Special Needs */}
                <div className="text-left p-4">
                  <div className="flex flex-row items-center mb-4">
                    <img src="/star.svg" alt="staricon" className="h-14 w-14 mr-6" />
                    <h3 className="text-xl font-semibold">{data.SpecialNeeds}</h3>
                  </div>

                  {/* Display first 3 paragraphs by default */}
                  {data.SpecialNeedsdesc.slice(0, showMoreSpecialNeeds ? data.SpecialNeedsdesc.length : 1).map((paragraph, index) => (
                    <p key={index} className="text-base text-justify text-gray-600 text-left max-w-[250px] mt-4">
                      {paragraph.children[0].text}
                    </p>
                  ))}

                  {/* "Read More" or "Read Less" Button */}
                  {data.SpecialNeedsdesc.length > 1 && (
                    <button
                      className="text-[#006400] underline flex items-center mt-4"
                      onClick={toggleShowMoreSpecialNeeds}
                    >
                      {showMoreSpecialNeeds ? "Read Less" : "Read More"} <MoveRight className="ml-2" />
                    </button>
                  )}
                </div>

                {/* Learning Environments */}
                <div className="text-left p-4">
                  <div className="flex flex-row items-center mb-4">
                    <img src="/star.svg" alt="staricon" className="h-14 w-14 mr-6" />
                    <h3 className="text-2xl font-semibold">{data.Learningevt}</h3>
                  </div>

                  {/* Display first 3 paragraphs by default */}
                  {data.Learningevtdesc.slice(0, showMoreLearningEnv ? data.Learningevtdesc.length : 3).map((paragraph, index) => (
                    <p key={index} className="text-base text-justify text-gray-600 text-left max-w-[250px] mt-4">
                      {paragraph.children[0].text}
                    </p>
                  ))}

                  {/* "Read More" or "Read Less" Button */}
                  {data.Learningevtdesc.length > 3 && (
                    <button
                      className="text-[#006400] underline flex items-center mt-4"
                      onClick={toggleShowMoreLearningEnv}
                    >
                      {showMoreLearningEnv ? "Read Less" : "Read More"} <MoveRight className="ml-2" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-center">{data.Everychild}</p>
              <div className="flex justify-center mt-10">
                <CTAButton
                  href="/services"
                  text="Explore All Programs"
                 className="!bg-[#073F27] !text-[#FFD700] text-xl font-semibold !rounded-[80px] px-[24px] py-[14px] flex items-center justify-center gap-[10px] flex-none hover:!bg-[#065c3d] hover:!text-white transition duration-300"
                />
              </div>
            </div>
          </section>
        </>
      )}
      {/* Desktop View */}
      {!isMobile && !isTablet && (
        <>
          {/* Desktop-specific UI */}
          <section className="relative">
            <Circle size={60} color="yellow" className="absolute top-2 left-4 -translate-y-12 md:-translate-y-8" />
            <div className="text-center mt-16 ml-4 md:ml-14 translate-x-0 md:translate-x-16">
              <p className="text-base font-normal text-left mt-2 px-4 md:px-0 translate-y-8">
                {data.aboutmotto}
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-[#006400] text-left px-4 md:px-0 translate-y-8 mt-4 mb-12">
                {data.Missionvision}
              </h1>
            </div>
          </section>

          {/* Middle Section: Cards Grid */}
          <section className="mt-8 mx-8 md:ml-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-1 justify-items-center">
            {/* Mission Card */}
            <Card className="bg-[#F5DE191A] shadow rounded-2xl w-full max-w-[460px] h-[320px] flex flex-col justify-between items-center p-0">
              <CardHeader className="text-left p-4">
                <div className="flex flex-row items-center">
                  <img src="/mission.svg" alt="Mission" className="h-16 w-16 mr-4 mb-4" />
                  <h3 className="text-xl font-semibold">Mission</h3>
                </div>
                <p className="text-base text-left text-gray-600 mt-4 flex items-start">
                  <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2" />
                  {data.Missiondesc}
                </p>
              </CardHeader>
            </Card>

            {/* Vision Card */}
            <Card className="bg-[#F5DE191A] shadow rounded-2xl w-full max-w-[450px] h-[320px] flex flex-col justify-between items-center p-0">
              <CardHeader className="text-left p-4">
                <div className="flex flex-row items-center">
                  <img src="/vission.svg" alt="Preschool" className="h-16 w-16 mr-4 mb-4" />
                  <h3 className="text-xl font-semibold">Vision</h3>
                </div>
                <p className="text-base text-left text-gray-600 flex items-start">
                  <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2" />
                  {data.Visiondesc}
                </p>
              </CardHeader>
            </Card>

            {/* Values Card */}
            <div className="w-full max-w-[550px] px-2">
              <Card className="bg-[#F5DE191A] shadow rounded-2xl w-full h-full p-2">
                <CardHeader className="text-center w-full p-0">
                  <div className="flex flex-row items-center">
                    <img src="/value.svg" alt="Values" className="h-16 w-16 mr-4" />
                    <h3 className="text-xl font-semibold">Values</h3>
                  </div>
                  <div className="text-base text-gray-600 flex flex-col md:flex-row gap-4 mt-4">
                    {/* Left Column: First 6 sections */}
                    <div className="flex-1">
                      {data.Valuesdesc && data.Valuesdesc.includes("---") ? (
                        data.Valuesdesc
                          .split("---")
                          .slice(0, 5)
                          .map((section, index) => (
                            <div key={index} className="flex items-start mt-4">
                              <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                              <p className="text-left">{section.trim()}</p>
                            </div>
                          ))
                      ) : (
                        <div className="flex items-start">
                          <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                          <p className="text-left">{data.Valuesdesc}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Remaining sections */}
                    <div className="flex-1 overflow-hidden mt-2 h-auto w-auto">
                      {data.Valuesdesc && data.Valuesdesc.includes("---") ? (
                        data.Valuesdesc
                          .split("---")
                          .slice(5, 11)
                          .map((section, index) => (
                            <div key={index + 4} className="flex items-start mt-2">
                              <img src="/reactangel.svg" alt="Bullet" className="h-4 w-4 mr-2 flex-shrink-0 mt-1" />
                              <p className="text-left">{section.trim()}</p>
                            </div>
                          ))
                      ) : null}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Bottom Section: Oval */}
          <section className="relative mt-24">
            <Oval className="absolute left-0 bottom-0 ml-6" />
          </section>

          {/* Our Commitment to Child Development */}
          <section className="mt-14">
            <div className="our-commitment ml-4 md:ml-14 p-4 md:p-6">
              <h1 className="text-2xl md:text-2xl text-[#006400] text-left font-bold">
                {data.Commitment}
              </h1>
              <p className="text-lg text-left mt-4">
                {data.FosteringGrowth}
              </p>

              {/* Side by Side Layout: Holistic Growth, Support for Special Needs, Learning Environments */}
              <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-4 p-5">
                {/* Holistic Growth */}
                <div className="text-left p-4 mobile-align">
                  <div className="flex flex-row items-center mb-4">
                    <img src="/star.svg" alt="staricon" className="h-14 w-14 mr-6" />
                    <h3 className="text-2xl font-semibold">{data.HolisticGrowth}</h3>
                  </div>

                  {/* Display first 3 paragraphs by default */}
                  {data.HolisticGrowthdesc.slice(0, showMoreHolistic ? data.HolisticGrowthdesc.length : 1).map((paragraph, index) => (
                    <p key={index} className="text-base text-justify md:text-md text-gray-600 text-left max-w-[250px] md:translate-x-12 mt-4">
                      {paragraph.children[0].text}
                    </p>
                  ))}

                  {/* "Read More" or "Read Less" Button */}
                  {data.HolisticGrowthdesc.length > 1 && (
                    <button
                      className="text-[#006400] underline flex items-center mt-4 md:translate-x-24"
                      onClick={toggleShowMoreHolistic}
                    >
                      {showMoreHolistic ? "Read Less" : "Read More"} <MoveRight className="ml-2" />
                    </button>
                  )}
                </div>

                {/* Support for Special Needs */}
                <div className="text-left p-4 mobile-align">
                  <div className="flex flex-row items-center mb-4">
                    <img src="/star.svg" alt="staricon" className="h-14 w-14 mr-6" />
                    <h3 className="text-2xl font-semibold">{data.SpecialNeeds}</h3>
                  </div>

                  {/* Display first 3 paragraphs by default */}
                  {data.SpecialNeedsdesc.slice(0, showMoreSpecialNeeds ? data.SpecialNeedsdesc.length : 1).map((paragraph, index) => (
                    <p key={index} className="text-base text-justify md:text-md text-gray-600 text-left max-w-[250px] md:translate-x-16 mt-4">
                      {paragraph.children[0].text}
                    </p>
                  ))}

                  {/* "Read More" or "Read Less" Button */}
                  {data.SpecialNeedsdesc.length > 1 && (
                    <button
                      className="text-[#006400] underline flex items-center mt-4 md:translate-x-24"
                      onClick={toggleShowMoreSpecialNeeds}
                    >
                      {showMoreSpecialNeeds ? "Read Less" : "Read More"} <MoveRight className="ml-2" />
                    </button>
                  )}
                </div>

                {/* Learning Environments */}
                <div className="text-left p-4 mobile-align">
                  <div className="flex flex-row items-center mb-4">
                    <img src="/star.svg" alt="staricon" className="h-14 w-14 mr-6" />
                    <h3 className="text-2xl font-semibold">{data.Learningevt}</h3>
                  </div>

                  {/* Display first 3 paragraphs by default */}
                  {data.Learningevtdesc.slice(0, showMoreLearningEnv ? data.Learningevtdesc.length : 3).map((paragraph, index) => (
                    <p key={index} className="text-base text-justify md:text-md text-gray-600 text-left max-w-[250px] md:translate-x-16 mt-4">
                      {paragraph.children[0].text}
                    </p>
                  ))}

                  {/* "Read More" or "Read Less" Button */}
                  {data.Learningevtdesc.length > 3 && (
                    <button
                      className="text-[#006400] underline flex items-center mt-4 md:translate-x-24"
                      onClick={toggleShowMoreLearningEnv}
                    >
                      {showMoreLearningEnv ? "Read Less" : "Read More"} <MoveRight className="ml-2" />
                    </button>
                  )}
                </div>
              </div>

              <p className="text-center">{data.Everychild}</p>
              <div className="flex justify-center mt-10">
                <CTAButton
                  href="/services"
                  text="Explore All Programs"
                  className="bg-[#073F27] text-[#FFD700] text-xl font-semibold rounded-[80px] px-[24px] py-[14px] flex items-center justify-center gap-[10px] flex-none hover:bg-[#065c3d] hover:text-white transition duration-300"
                />
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}