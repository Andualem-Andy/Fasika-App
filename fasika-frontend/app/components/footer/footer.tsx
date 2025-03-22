'use client'
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useHeroStore } from "@/app/stores/heroStore";
import { PageSkeleton } from "@/app/components/skeletons/page-skeleton";
import { Facebook, Instagram, Linkedin, Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  const { heroes, loading, error, fetchHeroes } = useHeroStore();

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  if (loading) return <PageSkeleton />;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  const hero = heroes.length > 0 ? heroes[0] : null;
  if (!hero) return <PageSkeleton />;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto">
      {/* Top Section */}
      <div className="bg-[#1A472A] text-white py-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-center gap-16 md:gap-32 text-center md:text-left">
          
          {/* Company Info */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">{hero.CompanyInfo}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-green-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-green-300 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:text-green-300 transition-colors">
                  Admission
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-green-300 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 text-yellow-400">{hero.GetInTouch}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-yellow-400" />
                <div className="flex gap-4">
                  <Link href={`tel:${hero.Phone1}`} className="hover:text-green-300">
                    {hero.Phone1}
                  </Link>
                  <Link href={`tel:${hero.Phone2}`} className="hover:text-green-300">
                    {hero.Phone2}
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-yellow-400" />
                <span>{hero.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-yellow-400" />
                <Link href={`mailto:${hero.fasikaemail}`} className="hover:text-green-300">
                  {hero.fasikaemail}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-black text-white py-4 px-4 md:px-6 lg:px-8">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    {/* Copyright - Centered on mobile, slightly right on desktop */}
    <div className="text-sm md:ml-8 text-center md:text-left">
      © {new Date().getFullYear()} {hero.FASIKAInternational}. All rights reserved
    </div>
    
    {/* Social Icons - Always right-aligned */}
    <div className="flex gap-6">
      {/* Facebook */}
      {hero.Icon?.[0]?.href && (
        <Link 
          href={hero.Icon[0].href.startsWith('http') ? hero.Icon[0].href : `https://${hero.Icon[0].href}`} 
          target="_blank" 
          className="text-yellow-400 hover:text-green-300"
        >
          <Facebook className="h-6 w-6" />
        </Link>
      )}

      {/* TikTok */}
      {hero.Icon2?.[0]?.href && (
        <Link 
          href={hero.Icon2[0].href.startsWith('http') ? hero.Icon2[0].href : `https://${hero.Icon2[0].href}`} 
          target="_blank" 
          className="text-yellow-400 hover:text-green-300"
        >
          <svg 
            className="h-6 w-6" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.255a6.723 6.723 0 0 0 4.5 1.726v-3.5a4.061 4.061 0 0 1-1.094-.171Z"/>
          </svg>
        </Link>
      )}

      {/* Instagram */}
      {hero.Icon3?.[0]?.href && (
        <Link 
          href={hero.Icon3[0].href.startsWith('http') ? hero.Icon3[0].href : `https://${hero.Icon3[0].href}`} 
          target="_blank" 
          className="text-yellow-400 hover:text-green-300"
        >
          <Instagram className="h-6 w-6" />
        </Link>
      )}

      {/* LinkedIn */}
      {hero.Icon4?.[0]?.href && (
        <Link 
          href={hero.Icon4[0].href.startsWith('http') ? hero.Icon4[0].href : `https://${hero.Icon4[0].href}`} 
          target="_blank" 
          className="text-yellow-400 hover:text-green-300"
        >
          <Linkedin className="h-6 w-6" />
        </Link>
      )}
    </div>
  </div>
</div>
    </footer>
  );
}