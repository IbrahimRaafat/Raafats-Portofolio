import React, { useEffect, useRef, useState } from 'react';

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
  const targetSpeedRef = useRef(1);
  const speedRef = useRef(1);
  const lastScrollYRef = useRef(0);
  const rafRef = useRef(0);

  const chars = text.split('');
  const angleStep = 360 / chars.length;

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;
      const delta = Math.abs(current - lastScrollYRef.current);
      // Gentle multiplier and cap to avoid buzzing
      const target = 1 + Math.min(delta * 0.004, 1.5);
      targetSpeedRef.current = target;
      lastScrollYRef.current = current;
    };

    const tick = () => {
      // Ease towards target speed for smoothness
      const next = speedRef.current + (targetSpeedRef.current - speedRef.current) * 0.08;
      speedRef.current = next;
      // Only update state when change is meaningful to avoid re-render spam
      if (Math.abs(next - scrollSpeed) > 0.01) {
        setScrollSpeed(next);
      }
      // Gradually relax target back to base
      targetSpeedRef.current = 1 + (targetSpeedRef.current - 1) * 0.92;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [scrollSpeed]);

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
