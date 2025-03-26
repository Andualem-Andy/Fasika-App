'use client';

import React, { useEffect, useState } from 'react';
import { useAdmissionStore } from '@/app/stores/admissionStore';
import PageLayout from '@/app/components/PageLayout/PageLayout';
import NewsletterSection from '../components/Newsletter/Newsletter';
import FilePreview from '../components/shapes/FilePreview';
import Footer from '../components/footer/footer';
import FAQsPage from './FAQsPage';
import Image from 'next/image';
import { FAQChatbot } from '../Chatbot/FAQChatbot';

export default function AdmissionPage() {
  const { data, loading, error, fetchServiceData } = useAdmissionStore();
  const [bgImageUrl, setBgImageUrl] = useState<string>('');
  const [enrollImageUrl, setEnrollImageUrl] = useState<string>('');
  const [screenSize, setScreenSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Fetch data
  useEffect(() => {
    if (!data) fetchServiceData();
  }, []);

  // Set background and enrollment image URLs
  useEffect(() => {
    if (data?.admissionbg?.formats?.large?.url) {
      const fullBgUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${data.admissionbg.formats.large.url}`;
      setBgImageUrl(fullBgUrl);
    }

    if (data?.enrollimg?.url) {
      const fullEnrollUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${data.enrollimg.url}`;
      setEnrollImageUrl(fullEnrollUrl);
    }
  }, [data]);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize('desktop');
      } else if (width >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    // Initial detection
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render based on screen size
  const renderLayout = () => {
    switch (screenSize) {
      case 'desktop':
        return (
          <div className="hidden lg:block">
            {/* Desktop Layout */}
            <div style={{ width: '100%', textAlign: 'center' }}>
              {/* First Section */}
              <div className="w-full overflow-x-hidden relative" style={{ height: '550px', overflow: 'hidden' }}>
                <div className='text-left ml-64'>
                  <svg className="absolute right-0 w-48 h-48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <image href="/halfcircle.svg" x="40" y="0" width="80" height="80" />
                  </svg>
                  <h1 className="inline-block text-[#073F27] font-bold text-3xl ml-48">
                    {data?.Enroll}
                    <span className="border-b-4 border-yellow-500 inline-block w-1/5"></span>
                  </h1>
                  <p className="text-base font-normal mt-6 ml-48">{data?.simpleProcess}</p>
                </div>
                <div className="flex justify-center gap-2 mt-5 ml-32">
                  <svg className="w-48 h-48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <image href="/submitapplication.svg" x="0" y="0" width="80" height="80" />
                  </svg>
                  <svg className="w-48 h-48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <image href="/childassesment.svg" x="0" y="0" width="80" height="80" />
                  </svg>
                  <svg className="w-48 h-48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <image href="/parent-teacher.svg" x="0" y="0" width="80" height="80" />
                  </svg>
                  <svg className="w-48 h-48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <image href="/complete-enrollment.svg" x="0" y="0" width="80" height="80" />
                  </svg>
                </div>

                {/* Second SVG positioned behind the first SVG */}
                <svg className="absolute top-[14.26px] left-[25px] w-[250px] h-[500px] -z-10 opacity-10">
                  <image href="/addmissionbg2.svg" x="0" y="0" width="100%" height="100%" />
                </svg>

                {/* First SVG positioned on the left */}
                <svg className="absolute top-[-130px] left-[-6.33px] w-[250px] h-[750px] transform -translate-x-[6.33px] translate-y-[35px] z-0">
                  <image href="/addmissionbg2.svg" x="0" y="0" width="100%" height="100%" />
                </svg>

                {/* Image positioned to overlap with the SVG */}
                {enrollImageUrl && (
                  <div className="absolute top-[120px] left-[30px] z-10 w-[280px] h-[500px]">
                    <Image
                      src={enrollImageUrl}
                      alt={data?.enrollimg?.alternativeText || 'Enrollment Image'}
                      width={280}
                      height={500}
                      className="object-cover"
                    />
                  </div>
                )}

                {/* New SVG to the right of the overlapping image */}
                <svg className="absolute top-[300px] left-[1080px] w-[100px] h-[100px] z-10">
                  <image href="/addmissionarrow.svg" x="0" y="0" width="100%" height="100%" />
                </svg>

                {/* New SVG at the bottom of the complete-enrollment.svg */}
                <svg className="absolute top-[410px] left-[calc(20%+120px)] w-[100px] h-[200px] z-10">
                  <image href="/admisiondot.svg" x="0" y="0" width="100%" height="100%" />
                </svg>
              </div>

              {/* Second Section */}
              <div className="bg-yellow-50 py-24">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  {/* Left Content */}
                  <div className="-ml-4">
                    <h1 className="relative inline-block text-5xl text-left font-bold text-[#073F27] mb-4 -ml-24 after:block after:w-1/2 after:border-b-8 after:border-yellow-500 after:pt-2">
                      {data?.Registration}
                    </h1>
                    <p className="text-[#073F27] text-xl text-left font-bold mb-4 ml-48">{data?.ItemRequired}</p>
                    {data?.RequiredDesc?.split('---').map((desc, index) => (
                      <p key={index} className="text-[#073F27] text-xl font-bold text-left pl-48">
                        {desc.trim()}
                      </p>
                    ))}
                    <div className="flex flex-col mt-8 pl-24 ml-24">
                      <div className="flex items-start">
                        <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <image href="/childcert.svg" x="0" y="0" width="60" height="60" />
                        </svg>
                        <h1 className="text-[#073F27] text-xl font-bold mt-4">{data?.BirthCert}</h1>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <image href="/childimmun.svg" x="0" y="0" width="60" height="60" />
                        </svg>
                        <h1 className="text-[#073F27] text-xl font-bold mt-4">{data?.ImmunizationCard}</h1>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <image href="/childpassport.svg" x="0" y="0" width="60" height="60" />
                        </svg>
                        <h1 className="text-[#073F27] text-xl font-bold mt-4">{data?.PassportPhoto4}</h1>
                      </div>
                      <div className="flex items-start">
                        <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <image href="/1passport.svg" x="0" y="0" width="80" height="80" />
                        </svg>
                        <div>
                          {data?.Passportsize1?.split('---').map((part, index) => (
                            <p key={index} className="text-[#073F27] text-xl font-bold mb-3 mt-4">
                              {part.trim()}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PDF Download Section */}
                  <div className="md:pl-10">
                    <h1 className="text-right text-x font-bold text-[#073F27] mt-32 pr-24">{data?.downloadTitle}</h1>
                    <div className="text-right mt-12">
                      {data?.DownloadsPdf?.[0] && (
                        <FilePreview
                          fileName={data.DownloadsPdf[0].name || 'Brochure'}
                          fileUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${data.DownloadsPdf[0].url}`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'tablet':
        return (
          <div className="hidden md:block lg:hidden">
            {/* Tablet Layout */}
            <div className="w-full text-center">
              {/* First Section */}
              <div className="w-full overflow-x-hidden relative" style={{ height: 'auto', overflow: 'hidden' }}>
                <div className="text-center p-4">
                  <h1 className="inline-block text-[#073F27] font-bold text-3xl">
                    {data?.Enroll}
                    <span className="border-b-4 border-yellow-500 inline-block w-1/5"></span>
                  </h1>
                  <p className="text-base font-normal mt-4 mb-8">{data?.simpleProcess}</p>
                </div>
                {/* Grid for Icons */}
                <div className="grid grid-cols-2 gap-8 mt-4">
                  <div className="flex flex-col items-center">
                    <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <image href="/submitapplication.svg" x="0" y="0" width="60" height="60" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <image href="/childassesment.svg" x="0" y="0" width="60" height="60" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <image href="/parent-teacher.svg" x="0" y="0" width="60" height="60" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <image href="/complete-enrollment.svg" x="0" y="0" width="60" height="60" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Second Section */}
              <div className="bg-yellow-50 py-12">
                <div className="flex flex-col text-center p-4">
                  <h1 className="relative inline-block text-4xl font-bold text-[#073F27] mb-4 after:block after:w-1/3 after:border-b-4 after:border-yellow-500 after:pt-2 after:mx-auto">
                    {data?.Registration}
                  </h1>
                  <p className="text-[#073F27] text-lg text-left font-bold mb-4 ml-8">{data?.ItemRequired}</p>
                  {data?.RequiredDesc?.split('---').map((desc, index) => (
                    <p key={index} className="text-[#073F27] text-left text-lg font-bold text-left ml-8">
                      {desc.trim()}
                    </p>
                  ))}
                  <div className="flex flex-col mt-8 p-4">
                    <div className="flex items-start">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <image href="/childcert.svg" x="0" y="0" width="60" height="60" />
                      </svg>
                      <h1 className="text-[#073F27] text-lg font-bold mt-4">{data?.BirthCert}</h1>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <image href="/childimmun.svg" x="0" y="0" width="60" height="60" />
                      </svg>
                      <h1 className="text-[#073F27] text-lg font-bold mt-4">{data?.ImmunizationCard}</h1>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <image href="/childpassport.svg" x="0" y="0" width="60" height="60" />
                      </svg>
                      <h1 className="text-[#073F27] text-lg font-bold text-left mt-4">{data?.PassportPhoto4}</h1>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <image href="/1passport.svg" x="-10" y="0" width="80" height="80" />
                      </svg>
                      <div>
                        {data?.Passportsize1?.split('---').map((part, index) => (
                          <p key={index} className="text-[#073F27] text-lg font-bold mb-2 -translate-x-4">
                            {part.trim()}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* PDF Download Section */}
                <div className="p-4">
                  <h1 className="text-left text-lg font-bold text-[#073F27] mt-4">{data?.downloadTitle}</h1>
                  <div className="text-right mt-4">
                    {data?.DownloadsPdf?.[0] && (
                      <FilePreview
                        fileName={data.DownloadsPdf[0].name || 'Brochure'}
                        fileUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${data.DownloadsPdf[0].url}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'mobile':
        return (
          <div className="block md:hidden">
            {/* Mobile Layout */}
            <div className="w-full text-center">
              {/* First Section */}
              <div className="w-full overflow-x-hidden relative" style={{ height: 'auto', overflow: 'hidden' }}>
                <div className="text-center p-2">
                  <h1 className="inline-block text-[#073F27] font-bold text-2xl">
                    {data?.Enroll}
                    <span className="border-b-4 border-yellow-500 inline-block w-1/5"></span>
                  </h1>
                  <p className="text-base font-normal mt-4 mb-8">{data?.simpleProcess}</p>
                </div>
                {/* Grid for Icons */}
                <div className="grid grid-cols-2 gap-12 -mt-2 -mb-16 ml-28">
                  <div className="flex flex-col items-center">
                    <svg className="w-80 h-80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <image href="/submitapplication.svg" x="0" y="0" width="60" height="60" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center">
                    <svg className="w-80 h-80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <image href="/childassesment.svg" x="0" y="0" width="60" height="60" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center mt-[-100px]">
                    <svg className="w-80 h-80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <image href="/parent-teacher.svg" x="0" y="0" width="60" height="60" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center mt-[-100px]">
                    <svg className="w-80 h-80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <image href="/complete-enrollment.svg" x="0" y="0" width="60" height="60" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Second Section */}
              <div className="bg-yellow-50 py-12">
                <div className="flex flex-col text-center p-4">
                  <h1 className="relative inline-block text-3xl font-bold text-[#073F27] mb-4 after:block after:w-1/3 after:border-b-4 after:border-yellow-500 after:pt-2 after:mx-auto">
                    {data?.Registration}
                  </h1>
                  <p className="text-[#073F27] text-lg text-left font-bold mb-4 ml-8">{data?.ItemRequired}</p>
                  {data?.RequiredDesc?.split('---').map((desc, index) => (
                    <p key={index} className="text-[#073F27] text-left text-lg font-bold text-left ml-8">
                      {desc.trim()}
                    </p>
                  ))}
                  <div className="flex flex-col mt-8 p-4">
                    <div className="flex items-start">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <image href="/childcert.svg" x="0" y="0" width="60" height="60" />
                      </svg>
                      <h1 className="text-[#073F27] text-lg font-bold mt-4">{data?.BirthCert}</h1>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <image href="/childimmun.svg" x="0" y="0" width="60" height="60" />
                      </svg>
                      <h1 className="text-[#073F27] text-lg font-bold mt-4">{data?.ImmunizationCard}</h1>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <image href="/childpassport.svg" x="0" y="0" width="60" height="60" />
                      </svg>
                      <h1 className="text-[#073F27] text-lg font-bold text-left mt-4">{data?.PassportPhoto4}</h1>
                    </div>
                    <div className="flex items-start">
                      <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <image href="/1passport.svg" x="-10" y="0" width="80" height="80" />
                      </svg>
                      <div>
                        {data?.Passportsize1?.split('---').map((part, index) => (
                          <p key={index} className="text-[#073F27] text-lg font-bold mb-2 -translate-x-4">
                            {part.trim()}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* PDF Download Section */}
                <div className="p-1">
                  <h1 className="text-left text-lg font-bold text-[#073F27] mt-4">{data?.downloadTitle}</h1>
                  <div className="text-right mt-4">
                    {data?.DownloadsPdf?.[0] && (
                      <FilePreview
                        fileName={data.DownloadsPdf[0].name || 'Brochure'}
                        fileUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${data.DownloadsPdf[0].url}`}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <PageLayout
      title="Admissions"
      bgImageUrl={bgImageUrl}
      loading={loading}
      error={error}
    >
      {renderLayout()}

      <FAQsPage />
      <NewsletterSection />
      <Footer />
      <FAQChatbot />
    </PageLayout>
  );
}