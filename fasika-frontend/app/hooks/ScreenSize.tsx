import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('sm');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1536) {
        setScreenSize('2xl');
      } else if (width >= 1280) {
        setScreenSize('xl');
      } else if (width >= 1024) {
        setScreenSize('lg');
      } else if (width >= 768) {
        setScreenSize('md');
      } else if (width >= 640) {
        setScreenSize('sm');
      } else {
        setScreenSize('sm');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial detection
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export default useScreenSize;