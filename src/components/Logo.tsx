
import React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`${className} relative`}>
      <img 
        src="/lovable-uploads/ea3d16ea-6637-443e-8fc3-01595780ef10.png" 
        alt="Solivrah" 
        className="w-auto h-12 object-contain"
      />
    </div>
  );
};
