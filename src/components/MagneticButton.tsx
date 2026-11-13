import React, { useRef } from "react";

export default function MagneticButton({ children, className = "", strength = 0.35 }: { children: React.ReactNode; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    inner.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };
  const onLeave = () => {
    if (innerRef.current) innerRef.current.style.transform = "translate3d(0,0,0)";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`inline-block ${className}`} style={{ willChange: "transform" }}>
      <div ref={innerRef} className="will-change-transform transition-transform duration-200 ease-out">{children}</div>
    </div>
  );
}
