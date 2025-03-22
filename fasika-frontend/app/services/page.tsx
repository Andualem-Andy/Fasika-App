'use client';

import React, { useEffect, useState } from 'react';
import { useServiceStore } from '@/app/stores/serviceStore';
import PageLayout from '@/app/components/PageLayout/PageLayout';
import NewsletterSection from '../components/Newsletter/Newsletter';
import Footer from '../components/footer/footer';
import ReadMoreList from '@/app/components/shapes/Readmore'; // Import the ReadMoreList component
import ScrollDownArrow from '../components/shapes/ScrollDownArrow';

export default function ServicesPage() {
  const { data, loading, error, fetchServiceData } = useServiceStore();
  const [bgImageUrl, setBgImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServiceData(); // Fetch data on mount
  }, [fetchServiceData]);

  useEffect(() => {
    // Set the background image URL when the data is fetched
    if (data?.servicebgimg?.formats?.large?.url) {
      setBgImageUrl(`http://localhost:1337${data.servicebgimg.formats.large.url}`);
    }
  }, [data]);

  // Simulate loading delay (you can replace this with actual loading logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after a delay
    }, 1200); // Adjust the delay as needed

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Loading state
  if (loading || isLoading) {
    return (
      <PageLayout title="Programs & Services" loading={true}>
        <div className="w-full overflow-x-hidden">
          {/* Section 1: Skeleton loader */}
          <div className="flex flex-col md:flex-row bg-white p-4 md:p-10 animate-pulse">
            <div className="flex-1 pr-0 md:pr-10">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            </div>
            <div className="flex-1 mt-6 md:mt-0 relative">
              <div className="relative w-full md:w-[400px] mx-auto">
                <div className="absolute -bottom-4 -left-8 w-[200px] h-[200px] md:w-[242px] md:h-[242px] bg-gray-200 rounded-lg z-0"></div>
                <div className="relative z-10 border-2 border-gray-200 rounded-lg w-full h-64 md:h-80 bg-gray-200"></div>
              </div>
            </div>
          </div>

          {/* Section 2: Skeleton loader */}
          <div className="flex flex-col md:flex-row bg-yellow-50 p-4 md:p-10 animate-pulse">
            <div className="flex-1 order-2 md:order-1 mt-6 md:mt-0 relative">
              <div className="relative w-full md:w-[400px] mx-auto">
                <div className="absolute -bottom-4 -left-8 w-[200px] h-[200px] md:w-[242px] md:h-[242px] bg-gray-200 rounded-lg z-0"></div>
                <div className="relative z-10 border-2 border-gray-200 rounded-lg w-full h-64 md:h-80 bg-gray-200"></div>
              </div>
            </div>
            <div className="flex-1 pl-0 md:pl-10 order-1 md:order-2">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-6"></div>
              <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            </div>
          </div>
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
        {/* Section 1: White background, left text, right image */}
        <div className="flex flex-col md:flex-row bg-white p-4 md:p-10">
          <div className="flex-1 pr-0 md:pr-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#073F27] mb-4 relative after:block after:w-32 after:h-2 after:bg-yellow-400 after:mt-2">
              {data?.SafeandEngaging}
            </h2>
            <h3 className="text-base md:text-lg text-gray-600 mb-6">{data?.NurturingDaycare}</h3>
            <h1 className="text-3xl md:text-4xl font-bold text-[#073F27] mb-6">{data?.DaycareService}</h1>
            {/* Replace list with ReadMoreList */}
            <ReadMoreList
              items={data?.DaycareServicelistdown.split('---') || []}
              maxItems={3}
            />
          </div>
          <div className="flex-1 mt-6 md:mt-0 relative">
            <div className="relative w-full md:w-[400px] mx-auto">
              {/* Yellow rectangle behind the image */}
              <div
                className="absolute -bottom-4 -left-8 w-[200px] h-[200px] md:w-[242px] md:h-[242px] bg-[#F5DE19] border border-[#F5DE19] rounded-lg z-0"
              ></div>
              {/* Image with thick yellow border */}
              <div className="relative z-10 border-2 border-yellow-400 rounded-lg">
                <img
                  src={`http://localhost:1337${data?.daycareimg.url}`}
                  alt="Daycare Services"
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback for broken images
                    e.currentTarget.src = '/path/to/fallback-image.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Yellow opacity 10 background, left image, right text */}
        <div className="flex flex-col md:flex-row bg-yellow-50 p-4 md:p-10">
          <div className="flex-1 order-2 md:order-1 mt-6 md:mt-0 relative">
            <div className="relative w-full md:w-[400px] mx-auto">
              {/* Yellow rectangle behind the image */}
              <div
                className="absolute -bottom-4 -left-8 w-[200px] h-[200px] md:w-[242px] md:h-[242px] bg-[#F5DE19] border border-[#F5DE19] rounded-lg z-0"
              ></div>
              {/* Image with thick yellow border */}
              <div className="relative z-10 border-2 border-yellow-400 rounded-lg">
                <img
                  src={`http://localhost:1337${data?.preschoolimg.url}`}
                  alt="Preschool Curriculum"
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback for broken images
                    e.currentTarget.src = '/path/to/fallback-image.jpg';
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 pl-0 md:pl-10 order-1 md:order-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#073F27] mb-4 after:block after:w-32 after:h-2 after:bg-yellow-400 after:mt-2">{data?.titlemotto1}</h2>
            <h3 className="text-base md:text-lg text-gray-600 mb-6">{data?.foundation}</h3>
            <h1 className="text-3xl md:text-4xl font-bold text-[#073F27] mb-6">{data?.PreschoolCurriculum}</h1>
            {/* Replace list with ReadMoreList */}
            <ReadMoreList
              items={data?.PreschoolCurriculumlist.split('---') || []}
              maxItems={3}
            />
          </div>
        </div>

        {/* Section 3: White background, left text, right image */}
        <div className="flex flex-col md:flex-row bg-white p-4 md:p-10">
          <div className="flex-1 pr-0 md:pr-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#073F27] mb-4 relative after:block after:w-32 after:h-2 after:bg-yellow-400 after:mt-2">
              {data?.SafeandEngaging}
            </h2>
            <h3 className="text-base md:text-lg text-gray-600 mb-6">{data?.NurturingDaycare}</h3>
            <h1 className="text-3xl md:text-4xl font-bold text-[#073F27] mb-6">{data?.SpecialNeedsServices}</h1>
            {/* Replace list with ReadMoreList */}
            <ReadMoreList
              items={data?.SpecialNeedslistdown.split('---') || []}
              maxItems={3}
            />
          </div>
          <div className="flex-1 mt-6 md:mt-0 relative">
            <div className="relative w-full md:w-[400px] mx-auto">
              {/* Yellow rectangle behind the image */}
              <div
                className="absolute -bottom-4 -left-8 w-[200px] h-[200px] md:w-[242px] md:h-[242px] bg-[#F5DE19] border border-[#F5DE19] rounded-lg z-0"
              ></div>
              {/* Image with thick yellow border */}
              <div className="relative z-10 border-2 border-yellow-400 rounded-lg">
                <img
                  src={`http://localhost:1337${data?.specialimg.url}`}
                  alt="Special Needs Services"
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback for broken images
                    e.currentTarget.src = '/path/to/fallback-image.jpg';
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Yellow opacity 10 background, left image, right text */}
        <div className="flex flex-col md:flex-row bg-yellow-50 p-4 md:p-10">
          <div className="flex-1 order-2 md:order-1 mt-6 md:mt-0 relative">
            <div className="relative w-full md:w-[400px] mx-auto">
              {/* Yellow rectangle behind the image */}
              <div
                className="absolute -bottom-4 -left-8 w-[200px] h-[200px] md:w-[242px] md:h-[242px] bg-[#F5DE19] border border-[#F5DE19] rounded-lg z-0"
              ></div>
              {/* Image with thick yellow border */}
              <div className="relative z-10 border-2 border-yellow-400 rounded-lg">
                <img
                  src={`http://localhost:1337${data?.nannyimg.url}`}
                  alt="Nanny Training Center"
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback for broken images
                    e.currentTarget.src = '/path/to/fallback-image.jpg';
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 pl-0 md:pl-10 order-1 md:order-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#073F27] mb-4 after:block after:w-32 after:h-2 after:bg-yellow-400 after:mt-2">{data?.titlemotto1}</h2>
            <h3 className="text-base md:text-lg text-gray-600 mb-6">{data?.foundation}</h3>
            <h1 className="text-3xl md:text-4xl font-bold text-[#073F27] mb-6">{data?.NannyTrainingCenter}</h1>
            {/* Replace list with ReadMoreList */}
            <ReadMoreList
              items={data?.NannyTraininglistdown.split('---') || []}
              maxItems={3}
            />
          </div>
        </div>

        {/* Section 5: White background, left text, right image */}
        <div className="flex flex-col md:flex-row bg-white p-4 md:p-10">
          <div className="flex-1 pr-0 md:pr-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#073F27] mb-4 relative after:block after:w-32 after:h-2 after:bg-yellow-400 after:mt-4">
              {data?.SafeandEngaging}
            </h2>
            <h3 className="text-base md:text-lg text-gray-600 mb-6">{data?.NurturingDaycare}</h3>
            <h1 className="text-3xl md:text-4xl font-bold text-[#073F27] mb-6">{data?.EarlyIntervention}</h1>
            {/* Replace list with ReadMoreList */}
            <ReadMoreList
              items={data?.EarlyInterventionlistdown.split('---') || []}
              maxItems={3}
            />
          </div>
          <div className="flex-1 mt-6 md:mt-0 relative">
            <div className="relative w-full md:w-[400px] mx-auto">
              {/* Yellow rectangle behind the image */}
              <div
                className="absolute -bottom-4 -left-8 w-[200px] h-[200px] md:w-[242px] md:h-[242px] bg-[#F5DE19] border border-[#F5DE19] rounded-lg z-0"
              ></div>
              {/* Image with thick yellow border */}
              <div className="relative z-10 border-2 border-yellow-400 rounded-lg">
                <img
                  src={`http://localhost:1337${data?.earlyimg.url}`}
                  alt="Early Intervention"
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                  onError={(e) => {
                    // Fallback for broken images
                    e.currentTarget.src = '/path/to/fallback-image.jpg';
                  }}
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