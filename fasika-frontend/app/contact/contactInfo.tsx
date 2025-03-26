"use client";

import { useEffect, useMemo, memo } from 'react';
import { useContactStore } from '@/app/stores/contactStore';
import Image from 'next/image';
import { useViewport } from '@/app/hooks/useViewport'; 

const IMAGE_BASE_PATH = process.env.NEXT_PUBLIC_IMAGE_BASE_PATH || '';

interface ContactItemProps {
  icon: string;
  title: string;
  content: string[];
  isMobile?: boolean;
  isTablet?: boolean;
}

interface LocationItemProps {
  address: string;
  phone: string;
  isMobile?: boolean;
}

interface ContactData {
  TrainingCenterHour: string;
  DaycareOpenHour: string;
  PreschoolOpenHour: string;
  TrainingCenter: string;
  PreschoolOpen: string;
  DaycareOpen: string;
  whereFind: string;
  Location1: string;
  Location1Phone: string;
  Location2: string;
  Location2Phone: string;
  Location3: string;
  Location3Phone: string;
}

interface ProcessedData {
  trainingHours: string[];
  daycareHours: string[];
  preschoolHours: string;
}

// Memoized Contact Item Component
const ContactItem = memo(function ContactItem({ 
  icon, 
  title, 
  content,
  isMobile = false,
  isTablet = false
}: ContactItemProps) {
  const iconSize = isMobile ? 32 : isTablet ? 40 : 48;
  const imagePath = `${IMAGE_BASE_PATH}${icon}`;

  return (
    <div className={`flex flex-row items-start gap-${isMobile ? 3 : 4}`}>
      <div className="flex-shrink-0">
        <Image 
          src={imagePath}
          alt={`${title} Icon`} 
          width={iconSize}
          height={iconSize}
          className={isMobile ? 'w-8 h-8' : isTablet ? 'w-10 h-10' : 'w-12 h-12'}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex-grow">
        <h3 className={`${isTablet ? 'text-lg' : 'text-xl'} font-semibold`}>{title}</h3>
        <div className={`text-gray-600 ${isTablet ? 'text-sm' : 'text-base'}`}>
          {content.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
    </div>
  );
});

// Memoized Location Item Component
const LocationItem = memo(function LocationItem({ 
  address, 
  phone,
  isMobile = false
}: LocationItemProps) {
  return (
    <div className={`${isMobile ? 'mt-3' : 'mt-4'}`}>
      <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-base'} flex items-start gap-2`}>
        <Image 
          src={`${IMAGE_BASE_PATH}/mappin.svg`} 
          alt="Map Pin Icon" 
          width={16}
          height={16}
          className="w-4 h-4 mt-0.5 flex-shrink-0"
          loading="lazy"
        />
        <span>{address}</span>
      </p>
      <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-base'} flex items-center gap-2 mt-1`}>
        <Image 
          src={`${IMAGE_BASE_PATH}/phone.svg`} 
          alt="Phone Icon" 
          width={16}
          height={16}
          className="w-4 h-4 flex-shrink-0"
          loading="lazy"
        />
        <span>{phone}</span>
      </p>
    </div>
  );
});

// View Components
const MobileView = ({ data, processedData }: { data: ContactData, processedData: ProcessedData }) => (
  <div className="space-y-6">
    <ContactItem
      icon="/openhour.svg"
      title={data.TrainingCenter}
      content={processedData.trainingHours}
      isMobile
    />
    <ContactItem
      icon="/openhour.svg"
      title={data.PreschoolOpen}
      content={[processedData.preschoolHours]}
      isMobile
    />
    <ContactItem
      icon="/openhour.svg"
      title={data.DaycareOpen}
      content={processedData.daycareHours}
      isMobile
    />
    <div className="pt-4 border-t border-gray-200">
      <h3 className="text-lg font-semibold mb-3">{data.whereFind}</h3>
      <LocationItem address={data.Location1} phone={data.Location1Phone} isMobile />
      <LocationItem address={data.Location2} phone={data.Location2Phone} isMobile />
      <LocationItem address={data.Location3} phone={data.Location3Phone} isMobile />
    </div>
  </div>
);

MobileView.displayName = 'MobileView';

const TabletView = ({ data, processedData }: { data: ContactData, processedData: ProcessedData }) => (
  <div className="grid grid-cols-2 gap-6">
    <div className="space-y-6">
      <ContactItem
        icon="/openhour.svg"
        title={data.TrainingCenter}
        content={processedData.trainingHours}
        isTablet
      />
      <ContactItem
        icon="/openhour.svg"
        title={data.PreschoolOpen}
        content={[processedData.preschoolHours]}
        isTablet
      />
      <ContactItem
        icon="/openhour.svg"
        title={data.DaycareOpen}
        content={processedData.daycareHours}
        isTablet
      />
    </div>
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <Image 
          src={`${IMAGE_BASE_PATH}/mappin.svg`} 
          alt="Map Pin Icon" 
          width={40}
          height={40}
          className="w-10 h-10"
          priority
        />
        <div>
          <h3 className="text-lg font-semibold">{data.whereFind}</h3>
          <LocationItem address={data.Location1} phone={data.Location1Phone} />
          <LocationItem address={data.Location2} phone={data.Location2Phone} />
          <LocationItem address={data.Location3} phone={data.Location3Phone} />
        </div>
      </div>
    </div>
  </div>
);

TabletView.displayName = 'TabletView';

const DesktopView = ({ data, processedData }: { data: ContactData, processedData: ProcessedData }) => (
  <div className="flex flex-row items-start justify-between gap-8">
    <div className="w-1/2 space-y-8">
      <ContactItem
        icon="/openhour.svg"
        title={data.TrainingCenter}
        content={processedData.trainingHours}
      />
      <ContactItem
        icon="/openhour.svg"
        title={data.PreschoolOpen}
        content={[processedData.preschoolHours]}
      />
      <ContactItem
        icon="/openhour.svg"
        title={data.DaycareOpen}
        content={processedData.daycareHours}
      />
    </div>
    <div className="w-1/2">
      <div className="flex items-start gap-4">
        <Image 
          src={`${IMAGE_BASE_PATH}/mappin.svg`} 
          alt="Map Pin Icon" 
          width={48}
          height={48}
          className="w-12 h-12"
          priority
        />
        <div>
          <h3 className="text-xl font-semibold">{data.whereFind}</h3>
          <LocationItem address={data.Location1} phone={data.Location1Phone} />
          <LocationItem address={data.Location2} phone={data.Location2Phone} />
          <LocationItem address={data.Location3} phone={data.Location3Phone} />
        </div>
      </div>
    </div>
  </div>
);

DesktopView.displayName = 'DesktopView';

export default function ContactInfo() {
  const { data, loading, error, fetchContactData } = useContactStore();
  const { viewport } = useViewport();

  const processedData = useMemo(() => ({
    trainingHours: data?.TrainingCenterHour.split('---') || [],
    daycareHours: data?.DaycareOpenHour.split('---') || [],
    preschoolHours: data?.PreschoolOpenHour || '',
  }), [data]);

  useEffect(() => {
    if (!data) fetchContactData();
  }, [data, fetchContactData]);

  if (loading) return <div className="text-center p-8">Loading contact information...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-center p-8">No contact data available</div>;

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {viewport === 'mobile' ? (
        <MobileView data={data} processedData={processedData} />
      ) : viewport === 'tablet' ? (
        <TabletView data={data} processedData={processedData} />
      ) : (
        <DesktopView data={data} processedData={processedData} />
      )}
    </div>
  );
}