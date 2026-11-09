import React, { useEffect, useRef } from 'react';

interface CircularTextProps {
  text: string;
  radius?: number;
  fontSize?: number;
}

export default function CircularText({
  text = ' Scroll Down • Scroll Down •Scroll Down • --------- ',
  radius = 80,
  fontSize = 12,
}: CircularTextProps) {
  const ringRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef(0);
  const velRef = useRef(0);
  const lastYRef = useRef(0);
  const rafRef = useRef(0);

  const chars = text.split('');
  const angleStep = 360 / chars.length;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    lastYRef.current = window.scrollY;

    const BASE = 0.30; // deg per frame at 60fps — slow idle spin
    const MAX_EXTRA = 0.6; // cap scroll boost
    const SMOOTH = 0.07; // velocity easing — lower = smoother

    const tick = () => {
      const cur = window.scrollY;
      const rawDelta = cur - lastYRef.current;
      lastYRef.current = cur;

      // Exponential smoothing of scroll velocity
      const target = Math.max(-60, Math.min(60, rawDelta)) / 60; // -1..1
      velRef.current += (target - velRef.current) * SMOOTH;

      const boost = Math.abs(velRef.current) * MAX_EXTRA;
      const dir = velRef.current >= 0 ? 1 : -1;
      // Always spin forward, just faster when scrolling
      rotRef.current = (rotRef.current + BASE + boost) % 360;

      // Slight squash in scroll direction for feel, without jank
      // Only apply when velocity is meaningful
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${rotRef.current}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative inline-flex items-center justify-center w-40 h-40">
      <div ref={ringRef} className="absolute inset-0 will-change-transform" style={{ transform: 'rotate(0deg)' }}>
        {chars.map((char, index) => {
          const angle = index * angleStep - 90;
          const rad = (angle * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);
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

      <div className="relative z-10 flex items-center justify-center">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
