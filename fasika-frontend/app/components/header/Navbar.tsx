'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { useNavbarStore } from '@/app/stores/navbarStore';

export default function Navbar() {
  const { data, loading, fetchNavbar } = useNavbarStore();
  const pathname = usePathname();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchNavbar();
  }, [fetchNavbar]);

  if (loading) return null;

  return (
    <header className="bg-green-900 md:bg-white shadow-sm sticky top-0 z-50 border-none h-16 w-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-full w-full">
        {/* Logo Section - Left */}
        <div className="flex items-center h-full">
          <a href={data?.logoLink?.href || '/'} className="flex items-center space-x-2 h-full">
            {data?.logoLink?.image?.url && (
              <Image
                src={`${apiUrl}${data.logoLink.image.url}`}
                alt={data.logoLink.image.alternativeText || 'Logo'}
                width={180}  // Adjusted for better performance
                height={80}   // Adjusted for better performance
                className="h-12 sm:h-12 w-auto object-contain" // Using object-contain
                priority={true} // Only for above-the-fold images
                quality={80}   // Optimized quality
              />
            )}
            <span className="text-lg sm:text-xl font-bold text-white md:text-green-800 hover:text-green-200 transition-colors">
              {data?.logoLink?.text}
            </span>
          </a>
        </div>

        {/* Tablet Navigation & CTA */}
        <div className="hidden sm:flex lg:hidden items-center w-full justify-start ml-16 h-full">
          <nav className="flex space-x-4 justify-start w-full overflow-x-auto h-full">
            {data?.link
              ?.filter((link) => link.text !== 'Contact Us')
              .map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.external ? '_blank' : '_self'}
                  rel={link.external ? 'noopener noreferrer' : ''}
                  className={`text-gray-700 hover:text-green-800 transition-colors relative group whitespace-nowrap h-full flex items-center ${
                    pathname === link.href ? 'active-nav-item' : ''
                  }`}
                >
                  {link.text}
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-green-800 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
          </nav>

          {data?.cta && (
            <Button
              asChild
              variant="default"
              className="bg-green-800 hover:bg-green-700 text-white border-none rounded-lg transition-all shadow-md hover:shadow-lg whitespace-nowrap px-4 py-2 text-sm sm:text-base ml-4"
            >
              <a
                href={data.cta.href}
                target={data.cta.external ? '_blank' : '_self'}
                rel={data.cta.external ? 'noopener noreferrer' : ''}
              >
                {data.cta.text}
              </a>
            </Button>
          )}
        </div>

        {/* Desktop Navigation & CTA */}
        <div className="hidden lg:flex items-center w-full justify-between ml-24 h-full">
          <nav className="flex space-x-8 h-full">
            {data?.link?.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target={link.external ? '_blank' : '_self'}
                rel={link.external ? 'noopener noreferrer' : ''}
                className={`text-base font-bold text-gray-700 hover:text-green-800 transition-colors relative group whitespace-nowrap h-full flex items-center ${
                  pathname === link.href ? 'active-nav-item' : ''
                }`}
              >
                {link.text}
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-green-800 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {data?.cta && (
            <Button
              asChild
              variant="default"
              className="text-base font-bold bg-green-800 hover:bg-green-700 text-yellow-100 border-none rounded-lg transition-all shadow-md hover:shadow-lg px-6 py-3 min-w-fit text-lg"
            >
              <a
                href={data.cta.href}
                target={data.cta.external ? '_blank' : '_self'}
                rel={data.cta.external ? 'noopener noreferrer' : ''}
              >
                {data.cta.text}
              </a>
            </Button>
          )}
        </div>

        {/* Mobile Menu (Dropdown) */}
        <div className="sm:hidden h-full">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="border-none hover:bg-green-800 rounded-lg transition-all"
              >
                <HamburgerMenuIcon className="h-6 w-6 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 border-none shadow-lg rounded-lg bg-green-900 text-white"
            >
              {data?.link?.map((link) => (
                <DropdownMenuItem key={link.id} asChild>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : '_self'}
                    rel={link.external ? 'noopener noreferrer' : ''}
                    className={`text-base font-bold w-full px-4 py-2 text-white hover:bg-green-800 rounded-md transition-all ${
                      pathname === link.href ? 'bg-yellow-400 text-gray-700' : ''
                    }`}
                  >
                    {link.text}
                  </a>
                </DropdownMenuItem>
              ))}
              {data?.cta && (
                <DropdownMenuItem asChild>
                  <a
                    href={data.cta.href}
                    target={data.cta.external ? '_blank' : '_self'}
                    rel={data.cta.external ? 'noopener noreferrer' : ''}
                    className="text-base font-bold w-full px-4 py-2 text-white hover:bg-green-800 rounded-md transition-all"
                  >
                    {data.cta.text}
                  </a>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <style jsx global>{`
        .active-nav-item::before {
          content: '';
          position: absolute;
          background: #F5DE19;
          width: 74px;
          height: calc(100% + 2rem);
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          border-bottom: 2px solid #065F46;
          border-radius: 0 0 20px 20px;
          z-index: -1;
        }
        html, body {
          overflow-x: hidden;
          width: 100%;
        }
      `}</style>
    </header>
  );
}