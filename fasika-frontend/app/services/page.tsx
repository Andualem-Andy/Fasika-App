'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useServiceStore } from '@/app/stores/serviceStore';
import PageLayout from '@/app/components/PageLayout/PageLayout';
import NewsletterSection from '../components/Newsletter/Newsletter';
import Footer from '../components/footer/footer';
import ReadMoreList from '@/app/components/shapes/Readmore';
import ScrollDownArrow from '../components/shapes/ScrollDownArrow';

export default function ServicesPage() {
  const { data, loading, error, fetchServiceData } = useServiceStore();
  const [bgImageUrl, setBgImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServiceData();
  }, [fetchServiceData]);

  useEffect(() => {
    if (data?.servicebgimg?.formats?.large?.url) {
      setBgImageUrl(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.servicebgimg.formats.large.url}`
      );
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading || isLoading) {
    return (
      <PageLayout title="Programs & Services" loading={true}>
        <div className="w-full overflow-x-hidden">
          {/* Skeleton Loaders remain the same */}
          {/* ... */}
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Services"
      bgImageUrl={bgImageUrl}
      loading={loading}
      error={error}
    >
      <div className="w-full overflow-x-hidden">
        {/* Section 1: Daycare Services */}
        <div className="flex flex-col md:flex-row bg-white p-4 md:p-10">
          <div className="flex-1 pr-0 md:pr-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#073F27] mb-4 relative after:block after:w-32 after:h-2 after:bg-yellow-400 after:mt-2">
              {data?.SafeandEngaging}
            </h2>
            <h3 className="text-base md:text-lg text-gray-600 mb-6">{data?.NurturingDaycare}</h3>
            <h1 className="text-3xl md:text-4xl font-bold text-[#073F27] mb-6">{data?.DaycareService}</h1>
            <ReadMoreList
              items={data?.DaycareServicelistdown.split('---') || []}
              maxItems={3}
            />
          </div>
          <div className="flex-1 mt-6 md:mt-0 relative">
            <div className="relative w-full md:w-[400px] mx-auto">
              <div className="absolute -bottom-4 -left-8 w-[200px] h-[200px] md:w-[242px] md:h-[242px] bg-[#F5DE19] rounded-lg z-0" />
              <div className="relative z-10 border-2 border-yellow-400 rounded-lg h-64 md:h-80 overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data?.daycareimg.url}`}
                  alt="Daycare Services"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Preschool Curriculum */}
        <div className="flex flex-col md:flex-row bg-yellow-50 p-4 md:p-10">
          <div className="flex-1 order-2 md:order-1 mt-6 md:mt-0 relative">
            <div className="relative w-full md:w-[400px] mx-auto">
              <div className="absolute -bottom-4 -left-8 w-[200px] h-[200px] md:w-[242px] md:h-[242px] bg-[#F5DE19] rounded-lg z-0" />
              <div className="relative z-10 border-2 border-yellow-400 rounded-lg h-64 md:h-80 overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data?.preschoolimg.url}`}
                  alt="Preschool Curriculum"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 pl-0 md:pl-10 order-1 md:order-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#073F27] mb-4 after:block after:w-32 after:h-2 after:bg-yellow-400 after:mt-2">{data?.titlemotto1}</h2>
            <h3 className="text-base md:text-lg text-gray-600 mb-6">{data?.foundation}</h3>
            <h1 className="text-3xl md:text-4xl font-bold text-[#073F27] mb-6">{data?.PreschoolCurriculum}</h1>
            <ReadMoreList
              items={data?.PreschoolCurriculumlist.split('---') || []}
              maxItems={3}
            />
          </div>
        </div>

        {/* Section 3: Special Needs Services */}
        <div className="flex flex-col md:flex-row bg-white p-4 md:p-10">
          <div className="flex-1 pr-0 md:pr-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#073F27] mb-4 relative after:block after:w-32 after:h-2 after:bg-yellow-400 after:mt-2">
              {data?.SafeandEngaging}
            </h2>
            <h3 className="text-base md:text-lg text-gray-600 mb-6">{data?.NurturingDaycare}</h3>
            <h1 className="text-3xl md:text-4xl font-bold text-[#073F27] mb-6">{data?.SpecialNeedsServices}</h1>
            <ReadMoreList
              items={data?.SpecialNeedslistdown.split('---') || []}
              maxItems={3}
            />
          </div>
          <div className="flex-1 mt-6 md:mt-0 relative">
            <div className="relative w-full md:w-[400px] mx-auto">
              <div className="absolute -bottom-4 -left-8 w-[200px] h-[200px] md:w-[242px] md:h-[242px] bg-[#F5DE19] rounded-lg z-0" />
              <div className="relative z-10 border-2 border-yellow-400 rounded-lg h-64 md:h-80 overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data?.specialimg.url}`}
                  alt="Special Needs Services"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Nanny Training Center */}
        <div className="flex flex-col md:flex-row bg-yellow-50 p-4 md:p-10">
          <div className="flex-1 order-2 md:order-1 mt-6 md:mt-0 relative">
            <div className="relative w-full md:w-[400px] mx-auto">
              <div className="absolute -bottom-4 -left-8 w-[200px] h-[200px] md:w-[242px] md:h-[242px] bg-[#F5DE19] rounded-lg z-0" />
              <div className="relative z-10 border-2 border-yellow-400 rounded-lg h-64 md:h-80 overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data?.nannyimg.url}`}
                  alt="Nanny Training Center"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
          <div className="flex-1 pl-0 md:pl-10 order-1 md:order-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#073F27] mb-4 after:block after:w-32 after:h-2 after:bg-yellow-400 after:mt-2">{data?.titlemotto1}</h2>
            <h3 className="text-base md:text-lg text-gray-600 mb-6">{data?.foundation}</h3>
            <h1 className="text-3xl md:text-4xl font-bold text-[#073F27] mb-6">{data?.NannyTrainingCenter}</h1>
            <ReadMoreList
              items={data?.NannyTraininglistdown.split('---') || []}
              maxItems={3}
            />
          </div>
        </div>

        {/* Section 5: Early Intervention */}
        <div className="flex flex-col md:flex-row bg-white p-4 md:p-10">
          <div className="flex-1 pr-0 md:pr-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#073F27] mb-4 relative after:block after:w-32 after:h-2 after:bg-yellow-400 after:mt-4">
              {data?.SafeandEngaging}
            </h2>
            <h3 className="text-base md:text-lg text-gray-600 mb-6">{data?.NurturingDaycare}</h3>
            <h1 className="text-3xl md:text-4xl font-bold text-[#073F27] mb-6">{data?.EarlyIntervention}</h1>
            <ReadMoreList
              items={data?.EarlyInterventionlistdown.split('---') || []}
              maxItems={3}
            />
          </div>
          <div className="flex-1 mt-6 md:mt-0 relative">
            <div className="relative w-full md:w-[400px] mx-auto">
              <div className="absolute -bottom-4 -left-8 w-[200px] h-[200px] md:w-[242px] md:h-[242px] bg-[#F5DE19] rounded-lg z-0" />
              <div className="relative z-10 border-2 border-yellow-400 rounded-lg h-64 md:h-80 overflow-hidden">
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data?.earlyimg.url}`}
                  alt="Early Intervention"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        <ScrollDownArrow />
        <NewsletterSection />
        <Footer />
      </div>
    </PageLayout>
  );
}