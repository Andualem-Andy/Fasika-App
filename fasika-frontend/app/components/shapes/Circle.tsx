"use client";

interface CircleProps {
  size?: number;
  color?: string;
  className?: string;  
}

const Circle: React.FC<CircleProps> = ({ size = 100, color = "yellow", className }) => {
  return (
    <div
      className={className}  
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: "50%",
      }}
    />
  );
};

export default Circle;
