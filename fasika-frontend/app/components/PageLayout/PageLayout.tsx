'use client';

import React from 'react'; // Add this import
import Navbar from '@/app/components/header/Navbar';
import ScrollDownArrow from '../shapes/ScrollDownArrow';

interface PageLayoutProps {
  title: string;
  bgImageUrl?: string;
  children: React.ReactNode;
  loading: boolean;
  error?: string | null;
  isBlogPage?: boolean; // New prop for blog page
}

export default function PageLayout({
  title,
  bgImageUrl,
  children,
  loading,
  error,
  isBlogPage = false, // Default to false
}: PageLayoutProps) {
  const [screenWidth, setScreenWidth] = React.useState(0);
  const [screenHeight, setScreenHeight] = React.useState(0);
  const [isClient, setIsClient] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (isClient) {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      handleResize();

      setTimeout(() => {
        setIsLoading(false);
      }, 600);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isClient]);

  const isMobile = screenWidth < 600;
  const isTablet = screenWidth >= 600 && screenWidth < 1280;
  const isSmallTablet = isTablet && screenHeight < 800;
  const isShortDevice = screenHeight < 720;
  const is540x720 = screenWidth === 540 && screenHeight === 720;
  const is1280x800 = screenWidth === 1280 && screenHeight === 800;

  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <div className="w-screen relative left-1/2 transform -translate-x-1/2">
        <div
          className="w-full h-auto block max-w-full relative"
          style={{
            minHeight: isMobile
              ? isShortDevice
                ? '30vh'
                : is540x720
                ? '40vh'
                : '24vh'
              : isSmallTablet
              ? '80vh'
              : is1280x800
              ? '75vh'
              : isTablet
              ? '33vh'
              : '100vh',
            overflow: 'hidden',
          }}
        >
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : 'none',
              backgroundColor: bgImageUrl ? 'transparent' : '#f0f0f0',
              maskImage: `url(/page.svg), linear-gradient(to top, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 130%)`,
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              zIndex: -1,
              objectFit: 'cover',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              transform: isMobile
                ? 'translateY(-15%)'
                : isSmallTablet
                ? 'translateY(-10%)'
                : isTablet
                ? 'translateY(-10%)'
                : 'translateY(-11%)',
            }}
          />

          <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <img
              src="/page.svg"
              alt={title}
              className="w-full h-full object-contain pointer-events-none sm:object-cover"
              style={{
                maxWidth: '100%',
                height: 'auto',
                objectPosition: 'center center',
              }}
              loading="lazy"
            />
          </div>

          {!isLoading && (
            <div
              className="absolute inset-0 w-full h-full flex justify-center items-start z-20"
              style={{
                top: isMobile
                  ? '15%'
                  : isSmallTablet
                  ? '25%'
                  : isTablet
                  ? '25%'
                  : '25%',
              }}
            >
              <h1
                className="font-bold text-[#073F27] text-center"
                style={{
                  fontSize: isBlogPage // Conditionally adjust font size for blog page
                    ? isMobile
                      ? isShortDevice
                        ? '1.5rem' // Smaller font size for mobile
                        : is540x720
                        ? '2rem' // Smaller font size for 540x720
                        : '2rem' // Smaller font size for other mobile devices
                      : isSmallTablet
                      ? '3rem' // Smaller font size for small tablets
                      : is1280x800
                      ? '4rem' // Smaller font size for 1280x800
                      : isTablet
                      ? '4rem' // Smaller font size for tablets
                      : '5rem' // Smaller font size for desktops
                    : isMobile
                    ? isShortDevice
                      ? '2rem'
                      : is540x720
                      ? '4rem'
                      : '3rem'
                    : isSmallTablet
                    ? '5rem'
                    : is1280x800
                    ? '6rem'
                    : isTablet
                    ? '6rem'
                    : '8rem', // Default font size for other pages
                  lineHeight: '1',
                  maxWidth: '80%',
                }}
              >
                {title}
              </h1>
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}