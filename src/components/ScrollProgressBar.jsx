import React, { useState, useEffect, useRef } from "react";

const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDarkBg, setIsDarkBg] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const progressBarRef = useRef(null);
  const radius = 30;
  const mobileRadius = 20;
  const circumference = 2 * Math.PI * radius;
  const mobileCircumference = 2 * Math.PI * mobileRadius;

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
      
      // Determine background based on scroll percentage
      // 0%-1.6%: white bg → black bar
      // 1.6%-7%: black bg → white bar
      // 7%-12.5%: white bg → black bar
      // 12.5%-15.6%: black bg → white bar
      // 15.6%-25.5%: white bg → black bar
      // 25.5%-57.5%: black bg → white bar
      // 57.5%-89.5%: white bg → black bar
      // 89.5%-100%: black bg → white bar
      
      if (scrollPercent <= 0.8) {
        setIsDarkBg(false); // White background
      } else if (scrollPercent > 0.8 && scrollPercent <= 7) {
        setIsDarkBg(true); // Black background
      } else if (scrollPercent > 7 && scrollPercent <= 12.5) {
        setIsDarkBg(false); // White background
      } else if (scrollPercent > 12.5 && scrollPercent <= 18.5) {
        setIsDarkBg(true); // Black background
      } else if (scrollPercent > 18.5 && scrollPercent <= 30) {
        setIsDarkBg(false); // White background
      } else if (scrollPercent > 30 && scrollPercent <= 62.5) {
        setIsDarkBg(true); // Black background
      } else if (scrollPercent > 62.5 && scrollPercent <= 88.8) {
        setIsDarkBg(false); // White background
      } else {
        setIsDarkBg(true); // Black background
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const currentRadius = isMobile ? mobileRadius : radius;
  const currentCircumference = isMobile ? mobileCircumference : circumference;
  const offset = currentCircumference - (scrollProgress / 100) * currentCircumference;
  const size = isMobile ? 50 : 70;
  const centerPos = size / 2;

  // Pure black or white colors
  const strokeColor = isDarkBg ? "#ffffff" : "#000000";
  const textColor = isDarkBg ? "#ffffff" : "#000000";
  const bgStrokeColor = isDarkBg ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)";
  const glassBackground = isDarkBg ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.15)";
  const glassBorder = isDarkBg ? "rgba(255, 255, 255, 0.25)" : "rgba(0, 0, 0, 0.2)";
  const glassShadow = isDarkBg ? "0 8px 32px rgba(255, 255, 255, 0.1)" : "0 8px 32px rgba(0, 0, 0, 0.1)";

  return (
    <div 
      ref={progressBarRef}
      className="scroll-progress-bar"
      style={{ 
        background: glassBackground,
        borderColor: glassBorder,
        boxShadow: glassShadow,
        width: `${size}px`,
        height: `${size}px`,
        bottom: isMobile ? '20px' : '30px',
        left: isMobile ? '20px' : '30px'
      }}
    >
      <div className="scroll-progress-fill">
        <svg
          className="scroll-progress-circle"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            className="scroll-progress-circle-bg"
            cx={centerPos}
            cy={centerPos}
            r={currentRadius}
            style={{ stroke: bgStrokeColor, strokeWidth: isMobile ? 3 : 4 }}
          />
          <circle
            className="scroll-progress-circle-fill"
            cx={centerPos}
            cy={centerPos}
            r={currentRadius}
            strokeDasharray={currentCircumference}
            strokeDashoffset={offset}
            style={{ stroke: strokeColor, strokeWidth: isMobile ? 3 : 4 }}
          />
        </svg>
        <span 
          className="scroll-progress-text" 
          style={{ 
            color: textColor,
            fontSize: isMobile ? '10px' : '14px'
          }}
        >
          {Math.round(scrollProgress)}%
        </span>
      </div>
    </div>
  );
};

export default ScrollProgressBar;
