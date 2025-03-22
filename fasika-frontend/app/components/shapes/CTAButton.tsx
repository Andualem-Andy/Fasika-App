import React from 'react';

interface CTAButtonProps {
  href: string;
  text: string;
  className?: string;
  external?: boolean;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ href, text, className, external = false }) => (
  <a
    href={href}
    target={external ? '_blank' : '_self'}
    rel={external ? 'noopener noreferrer' : ''}
    className={`px-6 py-2 shadow-lg transition ${className}`} // Removed rounded-lg
  >
    {text}
  </a>
);