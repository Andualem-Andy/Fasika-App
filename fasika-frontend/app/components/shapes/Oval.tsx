"use client";

import React from "react";

interface OvalProps {  // Define an interface for the props
  width?: number;
  height?: number;
  color?: string;
  className?: string; // className is a string
}

const Oval: React.FC<OvalProps> = ({ width = 46, height = 78, color = "#F1F027", className, ...rest }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 46 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        d="M0.288818 23.2818C0.288818 10.9253 10.3057 0.908417 22.6622 0.908417C35.0187 0.908417 45.0356 10.9253 45.0356 23.2818V54.7703C45.0356 67.1268 35.0187 77.1436 22.6622 77.1436C10.3057 77.1436 0.288818 67.1267 0.288818 54.7703V23.2818Z"
        fill={color}
      />
    </svg>
  );
};

export default Oval;