import React from "react";
import Image from "next/image";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar } from "recharts";
import { chartConfig, chartData } from "@/app/components/ui/chart";
import Circle from "@/app/components/shapes/Circle";
import Oval from "@/app/components/shapes/Oval";

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({ src, alt, className }) => (
  <div
    className={`relative w-full lg:w-auto max-w-lg ${className}`}
    style={{ position: 'relative', top: '-20px' }} // Adjust the value to overlap with the navbar height
  >
    {/* Outer container with dark green background */}
    <div
      className="relative w-full bg-[#073F27]"
      style={{
        position: 'relative',
        paddingBottom: '-10px',
        marginTop: '-1px',
        width: '100%',
        left: '-1px',
        right: '-50px',
      }}
    >
      {/* Inner container with yellow background and custom height */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bg-[#F1F027]"
        style={{
          zIndex: 0,
          width: '80%',
          height: '80%',
          top: '10%',
          left: '45%',
          borderTopLeftRadius: '220px',
          borderTopRightRadius: '40px',
        }}
      />
      
      {/* Image above the yellow section */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '100%',
          height: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          top: '5%',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={600}
          height={400}
          className="rounded-lg shadow-lg"
          priority
        />
      </div>
      
      {/* Circle positioned at the upper-right side of the image */}
      <div
        style={{
          position: 'absolute',
          top: '60px', // Adjusted to move it slightly down
          right: '2px',
          width: '70px', // Adjusted size
          height: '70px',
        }}
      >
        <Circle size={70} />
      </div>
      {/* Oval positioned at the bottom-right of the image */}
      <div
        style={{
          position: "absolute",
          bottom: "-5px",
          right: "10px",
          width: "50px",
          height: "100px",
        }}
      >
        <Oval width={50} height={100} color="#F1F027" />
      </div>
    </div>

    {/* Positioning the chart slightly out from the left */}
    <div className="absolute left-[-130px] top-1/2 transform -translate-y-1/2 bg-white shadow-md p-4 rounded-lg w-48 h-32">
      <ChartContainer config={chartConfig}>
        <BarChart width={150} height={100} data={chartData}>
          <Bar dataKey="desktop" fill="#2563eb" radius={4} />
          <Bar dataKey="mobile" fill="#60a5fa" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  </div>
);
