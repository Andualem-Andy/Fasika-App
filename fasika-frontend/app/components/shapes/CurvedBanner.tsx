import React from 'react';
import Image from 'next/image';

interface CurvedBannerProps { 
  title: string;          
  imageSrc?: string;      
}

const CurvedBanner: React.FC<CurvedBannerProps> = ({ title, imageSrc }) => {
  return (
    <div className="relative py-16 overflow-hidden">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-30"
        />
      )}
      <div className="relative z-10 bg-[#FAF9F6] py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#1A472A]">
            {title}
          </h2>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-white rounded-t-[3rem] -z-20"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-[#E8F0DE] rounded-t-[2.5rem] -z-30"></div>
      </div>
    </div>
  );
};

export default CurvedBanner;