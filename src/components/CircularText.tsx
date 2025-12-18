import React, { useState, useEffect } from 'react';

interface CircularTextProps {
  text: string;
  radius?: number;
  fontSize?: number;
}

export default function CircularText({ 
  text = " Scroll Down • Scroll Down •Scroll Down • --------- ", 
  radius = 80,
  fontSize = 12 
}: CircularTextProps) {
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const chars = text.split('');
  const angleStep = 360 / chars.length;

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      
      // Increase speed based on scroll velocity (reduced multiplier)
      scrollVelocity = delta * 0.02; // Reduced from 0.1 to 0.02
      const newSpeed = 1 + Math.min(scrollVelocity, 3); // Cap maximum speed at 4x
      setScrollSpeed(newSpeed);
      
      lastScrollY = currentScrollY;
    };

    // Gradually return to normal speed when not scrolling
    const resetSpeed = setInterval(() => {
      setScrollSpeed(prev => Math.max(1, prev * 0.95));
    }, 50);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(resetSpeed);
    };
  }, []);

  return (
    <div className="relative inline-flex items-center justify-center w-40 h-40">
      <div 
        className="absolute inset-0"
        style={{
          animation: `spin ${10 / scrollSpeed}s linear infinite`,
        }}
      >
        {chars.map((char, index) => {
          const angle = (index * angleStep) - 90; // Start from top
          const radian = (angle * Math.PI) / 180;
          const x = radius * Math.cos(radian);
          const y = radius * Math.sin(radian);
          
          return (
            <span
              key={index}
              className="absolute font-medium"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle + 90}deg)`,
                fontSize: `${fontSize}px`,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
      
      {/* Center arrow icon */}
      <div className="relative z-10 flex items-center justify-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
      
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
