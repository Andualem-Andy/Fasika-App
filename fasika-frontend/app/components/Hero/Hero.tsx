'use client';
import { useEffect } from 'react';
import { useHeroStore } from '@/app/stores/heroStore';
import { CTAButton } from '@/app/components/shapes/CTAButton';
import { HeroImage } from '@/app/components/shapes/HeroImage';
import { PageSkeleton } from '@/app/components/skeletons/page-skeleton';

export default function HeroPage() {
  const { heroes, loading, error, fetchHeroes } = useHeroStore();

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  if (loading) return <PageSkeleton />;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="relative bg-white">
      {heroes.map((hero) => (
        <div key={hero.id} className="flex flex-col lg:flex-row items-center gap-6 px-4 lg:px-20 py-10">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left lg:ml-4">
            <h3 className="text-black font-semibold text-sm relative inline-block">
              {hero.welcome}
              {/* Custom Underline */}
              <span className="absolute left-0 bottom-[-5px] w-full h-1 bg-yellow-500"></span>
            </h3>

            <h1 className="text-2xl lg:text-4xl font-bold text-[#073F27] my-4">
              {hero.title}
            </h1>
            <h1 className="text-2xl lg:text-4xl font-bold text-[#073F27] my-4">
              {hero.subtitle}
            </h1>
            <p className="text-gray-600 text-base lg:text-lg">{hero.description}</p>
            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {hero.CTAButton1 && (
                <CTAButton
                  href={hero.CTAButton1.href}
                  text={hero.CTAButton1.text}
                  className="text-base font-bold text-base font-bold bg-[#073F27] text-[#F1F027] hover:bg-[#065B39]"
                />
              )}
              {hero.CTAButton2 &&
                hero.CTAButton2.map((button) => (
                  <CTAButton
                    key={button.id}
                    href={button.href}
                    text={button.text}
                    className="text-base font-bold bg-transparent border-2 border-yellow-500 text-[#073F27] font-bold hover:bg-green-900 group hover:text-[#F5DE19]"
                  />
                ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            {/* Dark Green Background Div */}
            {/* <div className="hidden lg:block absolute top-[-100px] right-[-20%] h-[120%] w-[60%] bg-[#073F27] z-0"></div> */}

            {/* Hero Image */}
            <div className="relative z-10 w-full flex justify-center lg:justify-end right-[-10%]">
              {hero.image?.url ? (
                <HeroImage
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${hero.image.url}`}
                  alt={hero.title}
                  className="w-full max-w-md lg:max-w-lg"
                />
              ) : (
                <p className="text-gray-500">No Image Available</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}