'use client';

import { useEffect, useState } from 'react';

export default function HydrationGuard({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Clean up extension-added attributes
    const html = document.documentElement;
    html.removeAttribute('data-qb-installed');
    html.removeAttribute('suppresshydrationwarning');
  }, []);

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  return <>{children}</>;
}