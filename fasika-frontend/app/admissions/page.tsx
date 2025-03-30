'use client';

import React, { useEffect, useState, useCallback } from 'react';
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

  // Memoized fetch function with proper dependencies
  const fetchData = useCallback(() => {
    if (!data) fetchServiceData();
  }, [data, fetchServiceData]);

  // Fetch data effect
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set image URLs effect
  useEffect(() => {
    if (data?.admissionbg?.formats?.large?.url) {
      const fullBgUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.admissionbg.formats.large.url}`;
      setBgImageUrl(fullBgUrl);
    }

    if (data?.enrollimg?.url) {
      const fullEnrollUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.enrollimg.url}`;
      setEnrollImageUrl(fullEnrollUrl);
    }
  }, [data]);

  // Screen size detection effect
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

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderLayout = () => {
    switch (screenSize) {
      case 'desktop':
        return (
          <div className="hidden lg:block">
            <div style={{ width: '100%', textAlign: 'center' }}>
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
                  {['submitapplication', 'childassesment', 'parent-teacher', 'complete-enrollment'].map((icon) => (
                    <svg key={icon} className="w-48 h-48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      <image href={`/${icon}.svg`} x="0" y="0" width="80" height="80" />
                    </svg>
                  ))}
                </div>

                <svg className="absolute top-[14.26px] left-[25px] w-[250px] h-[500px] -z-10 opacity-10">
                  <image href="/addmissionbg2.svg" x="0" y="0" width="100%" height="100%" />
                </svg>

                <svg className="absolute top-[-130px] left-[-6.33px] w-[250px] h-[750px] transform -translate-x-[6.33px] translate-y-[35px] z-0">
                  <image href="/addmissionbg2.svg" x="0" y="0" width="100%" height="100%" />
                </svg>

                {enrollImageUrl && (
                  <div className="absolute top-[120px] left-[30px] z-10 w-[280px] h-[500px]">
                    <Image
                      src={enrollImageUrl}
                      alt={data?.enrollimg?.alternativeText || 'Enrollment Image'}
                      width={280}
                      height={500}
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                <svg className="absolute top-[300px] left-[1080px] w-[100px] h-[100px] z-10">
                  <image href="/addmissionarrow.svg" x="0" y="0" width="100%" height="100%" />
                </svg>

                <svg className="absolute top-[410px] left-[calc(20%+120px)] w-[100px] h-[200px] z-10">
                  <image href="/admisiondot.svg" x="0" y="0" width="100%" height="100%" />
                </svg>
              </div>

              <div className="bg-yellow-50 py-24">
                <div className="flex flex-col md:flex-row justify-between gap-8">
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
                      {[
                        { icon: 'childcert', text: data?.BirthCert },
                        { icon: 'childimmun', text: data?.ImmunizationCard },
                        { icon: 'childpassport', text: data?.PassportPhoto4 },
                        { icon: '1passport', text: data?.Passportsize1 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start">
                          <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <image href={`/${item.icon}.svg`} x="0" y="0" width="60" height="60" />
                          </svg>
                          <h1 className="text-[#073F27] text-xl font-bold mt-4">
                            {item.text?.split('---').map((part, i) => (
                              <p key={i}>{part.trim()}</p>
                            ))}
                          </h1>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:pl-10">
                    <h1 className="text-right text-x font-bold text-[#073F27] mt-32 pr-24">{data?.downloadTitle}</h1>
                    <div className="text-right mt-12">
                      {data?.DownloadsPdf?.[0] && (
                        <FilePreview
                          fileName={data.DownloadsPdf[0].name || 'Brochure'}
                          fileUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.DownloadsPdf[0].url}`}
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
            <div className="w-full text-center">
              <div className="w-full overflow-x-hidden relative" style={{ height: 'auto', overflow: 'hidden' }}>
                <div className="text-center p-4">
                  <h1 className="inline-block text-[#073F27] font-bold text-3xl">
                    {data?.Enroll}
                    <span className="border-b-4 border-yellow-500 inline-block w-1/5"></span>
                  </h1>
                  <p className="text-base font-normal mt-4 mb-8">{data?.simpleProcess}</p>
                </div>
                <div className="grid grid-cols-2 gap-8 mt-4">
                  {['submitapplication', 'childassesment', 'parent-teacher', 'complete-enrollment'].map((icon) => (
                    <div key={icon} className="flex flex-col items-center">
                      <svg className="w-32 h-32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <image href={`/${icon}.svg`} x="0" y="0" width="60" height="60" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

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
                    {[
                      { icon: 'childcert', text: data?.BirthCert },
                      { icon: 'childimmun', text: data?.ImmunizationCard },
                      { icon: 'childpassport', text: data?.PassportPhoto4 },
                      { icon: '1passport', text: data?.Passportsize1, x: -10, width: 80 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <image href={`/${item.icon}.svg`} x={item.x || 0} y="0" width={item.width || 60} height="60" />
                        </svg>
                        <h1 className="text-[#073F27] text-lg font-bold mt-4">
                          {item.text?.split('---').map((part, i) => (
                            <p key={i} className="mb-2 -translate-x-4">
                              {part.trim()}
                            </p>
                          ))}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4">
                  <h1 className="text-left text-lg font-bold text-[#073F27] mt-4">{data?.downloadTitle}</h1>
                  <div className="text-right mt-4">
                    {data?.DownloadsPdf?.[0] && (
                      <FilePreview
                        fileName={data.DownloadsPdf[0].name || 'Brochure'}
                        fileUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.DownloadsPdf[0].url}`}
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
            <div className="w-full text-center">
              <div className="w-full overflow-x-hidden relative" style={{ height: 'auto', overflow: 'hidden' }}>
                <div className="text-center p-2">
                  <h1 className="inline-block text-[#073F27] font-bold text-2xl">
                    {data?.Enroll}
                    <span className="border-b-4 border-yellow-500 inline-block w-1/5"></span>
                  </h1>
                  <p className="text-base font-normal mt-4 mb-8">{data?.simpleProcess}</p>
                </div>
                <div className="grid grid-cols-2 gap-12 -mt-2 -mb-16 ml-28">
                  {['submitapplication', 'childassesment', 'parent-teacher', 'complete-enrollment'].map((icon, index) => (
                    <div key={icon} className={`flex flex-col items-center ${index >= 2 ? 'mt-[-100px]' : ''}`}>
                      <svg className="w-80 h-80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <image href={`/${icon}.svg`} x="0" y="0" width="60" height="60" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

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
                    {[
                      { icon: 'childcert', text: data?.BirthCert },
                      { icon: 'childimmun', text: data?.ImmunizationCard },
                      { icon: 'childpassport', text: data?.PassportPhoto4 },
                      { icon: '1passport', text: data?.Passportsize1, x: -10, width: 80 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="w-24 h-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                          <image href={`/${item.icon}.svg`} x={item.x || 0} y="0" width={item.width || 60} height="60" />
                        </svg>
                        <h1 className="text-[#073F27] text-lg font-bold mt-4">
                          {item.text?.split('---').map((part, i) => (
                            <p key={i} className="mb-2 -translate-x-4">
                              {part.trim()}
                            </p>
                          ))}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-1">
                  <h1 className="text-left text-lg font-bold text-[#073F27] mt-4">{data?.downloadTitle}</h1>
                  <div className="text-right mt-4">
                    {data?.DownloadsPdf?.[0] && (
                      <FilePreview
                        fileName={data.DownloadsPdf[0].name || 'Brochure'}
                        fileUrl={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data.DownloadsPdf[0].url}`}
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