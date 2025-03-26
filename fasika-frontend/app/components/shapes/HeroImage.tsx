// components/HeroImage.tsx
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

export const HeroImage: React.FC<HeroImageProps> = ({ src, alt, className }) => {
  // Validate required props
  if (!src || !alt) {
    console.error("HeroImage requires both src and alt properties");
    return null;
  }

  // Get environment variables with fallbacks
  const imageWidth = parseInt(process.env.NEXT_PUBLIC_HERO_IMAGE_WIDTH || "600");
  const imageHeight = parseInt(process.env.NEXT_PUBLIC_HERO_IMAGE_HEIGHT || "400");
  const priorityLoading = process.env.NODE_ENV === "production";

  return (
    <div
      className={`relative w-full lg:w-auto max-w-lg ${className}`}
      style={{ position: "relative", top: "-20px" }}
    >
      {/* Background containers - Added overflow-x-hidden for mobile only */}
      <div
        className="relative w-full bg-[#073F27] overflow-hidden md:overflow-visible md:ml-0 -ml-8"
        style={{
          paddingBottom: "-10px",
          marginTop: "-1px",
          width: "100%",
          left: "-1px",
          right: "-50px",
        }}
      >
        {/* Yellow background shape */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 bg-[#F1F027]"
          style={{
            zIndex: 0,
            width: "80%",
            height: "80%",
            top: "10%",
            left: "45%",
            borderTopLeftRadius: "220px",
            borderTopRightRadius: "40px",
          }}
        />

        {/* Main image */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            top: "5%",
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={imageWidth}
            height={imageHeight}
            className="rounded-lg shadow-lg"
            priority={priorityLoading}
            onError={(e) => {
              console.error("Image load error:", e);
              // Consider adding a fallback image here
            }}
          />
        </div>

        {/* Decorative shapes */}
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "2px",
            width: "70px",
            height: "70px",
          }}
        >
          <Circle size={70} />
        </div>
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

      {/* Chart overlay - hidden on mobile, visible on md and up */}
      <div className="hidden md:block absolute left-[-130px] top-1/2 transform -translate-y-1/2 bg-white shadow-md p-4 rounded-lg w-48 h-32">
        <ChartContainer config={chartConfig}>
          <BarChart width={150} height={100} data={chartData}>
            <Bar dataKey="desktop" fill="#2563eb" radius={4} />
            <Bar dataKey="mobile" fill="#60a5fa" radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};