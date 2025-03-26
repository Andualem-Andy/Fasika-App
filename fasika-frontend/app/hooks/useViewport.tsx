
import { useEffect, useState } from 'react';

export const useViewport = () => {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewport(
        width < 768 ? 'mobile' : 
        width < 1024 ? 'tablet' : 'desktop'
      );
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { viewport };
};