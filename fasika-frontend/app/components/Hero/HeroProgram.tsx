"use client";

import React, { useEffect } from "react";
import { useHeroStore } from "@/app/stores/heroStore";
import { Card, CardHeader } from "@/components/ui/card"; 
import Image from "next/image";
import Circle from "@/app/components/shapes/Circle";
import Oval from "@/app/components/shapes/Oval";
import { PageSkeleton } from "@/app/components/skeletons/page-skeleton";

export default function HeroProgram() {
  const { heroes, loading, error, fetchHeroes } = useHeroStore();

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  if (loading) return <PageSkeleton />;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  const hero = heroes.length > 0 ? heroes[0] : null;
  if (!hero) return <PageSkeleton />;

  return (
    <div className="relative bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <Circle size={60} color="yellow" className="absolute top-8 left-4" />

      <div className="max-w-7xl mx-auto">
        {/* Centered content for mobile, left-aligned for desktop */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 mt-6">
          <h2 className="text-lg font-semibold text-dark font-bold relative inline-block">
            {hero.practice}
            <span className="absolute bottom-0 left-0 w-full h-[4px] bg-yellow-500"></span>
          </h2>
          
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mt-2">
            {hero.Programs}
          </h1>

          <p className="text-base text-gray-600 mt-2 max-w-2xl mx-auto md:mx-0">
            {hero.Nurturing}
          </p>
        </div>

        {/* Cards grid with optimized spacing */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 lg:gap-6 justify-items-center">
          {/* Daycare Card */}
          <Card className="bg-gray-50 shadow rounded-2xl w-full max-w-[328px] h-[288px] flex flex-col justify-between items-center p-0">
            <CardHeader className="text-center p-4">
              <div className="flex flex-col items-center">
                <Image 
                  src="/Daycare.svg" 
                  alt="Daycare" 
                  width={64}
                  height={64}
                  className="h-16 w-16 mb-2"
                />
                <h3 className="mt-2 text-xl font-semibold mb-2">Daycare Services</h3>
                <div className="w-16 h-1 bg-yellow-500 mx-auto mb-2"></div>
                <p className="text-base text-gray-600">
                  {hero.Offeringsafe || "Safe, affectionate environments."}
                </p>
              </div>
            </CardHeader>
          </Card>

          {/* Preschool Card */}
          <Card className="bg-gray-50 shadow rounded-2xl w-full max-w-[328px] h-[288px] flex flex-col justify-between items-center p-0">
            <CardHeader className="text-center p-4">
              <div className="flex flex-col items-center">
                <Image 
                  src="/Preschool.svg" 
                  alt="Preschool" 
                  width={64}
                  height={64}
                  className="h-16 w-16 mb-2"
                />
                <h3 className="mt-2 text-xl font-semibold mb-2">Preschool Education</h3>
                <div className="w-16 h-1 bg-yellow-500 mx-auto mb-2"></div>
                <p className="text-base text-gray-600">
                  {hero.curriculum || "Character development and creativity."}
                </p>
              </div>
            </CardHeader>
          </Card>

          {/* Nanny Card */}
          <Card className="bg-gray-50 shadow rounded-2xl w-full max-w-[328px] h-[288px] flex flex-col justify-between items-center p-0">
            <CardHeader className="text-center p-4">
              <div className="flex flex-col items-center">
                <Image 
                  src="/Nanny.svg" 
                  alt="Nanny" 
                  width={64}
                  height={64}
                  className="h-16 w-16 mb-2"
                />
                <h3 className="mt-2 text-xl font-semibold mb-2">Nanny Training Center</h3>
                <div className="w-16 h-1 bg-yellow-500 mx-auto mb-2"></div>
                <p className="text-base text-gray-600">
                  {hero.TrainingDesc || "Skilled caretakers training."}
                </p>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>

      <Oval className="absolute left-0 bottom-0 ml-6" />
    </div>
  );
}