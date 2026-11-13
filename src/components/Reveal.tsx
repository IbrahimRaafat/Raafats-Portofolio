import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  clip?: boolean;
};

export function MaskReveal({ children, className = "", delay = 0, y = 28 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }
    el.style.opacity = "0";
    el.style.transform = `translateY(${y}px)`;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.transition = `opacity 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay, y]);
  return <div ref={ref} className={className}>{children}</div>;
}

export function ClipReveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.clipPath = "inset(0 0 0 0)";
      return;
    }
    el.style.clipPath = "inset(0 100% 0 0)";
    el.style.transition = `clip-path 900ms cubic-bezier(0.76,0,0.24,1) ${delay}ms`;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          requestAnimationFrame(() => { el.style.clipPath = "inset(0 0 0 0)"; });
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
}
