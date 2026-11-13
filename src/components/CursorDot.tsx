import { useEffect, useRef, useState } from "react";

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0, dx = 0, dy = 0;
    let raf = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      dx += (mx - dx) * 0.09;
      dy += (my - dy) * 0.09;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${dx}px,${dy}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hover = t.closest('a, button, [data-cursor="hover"]');
      if (hover) {
        ringRef.current?.classList.add("cursor-ring--hover");
      } else {
        ringRef.current?.classList.remove("cursor-ring--hover");
      }
    };
    const onLeave = () => setHidden(true);
    const onOver = () => setHidden(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onOver);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className={`hidden lg:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-blue-600 pointer-events-none z-[70] ${hidden ? "opacity-0" : "opacity-100"}`}
      />
      <div
        ref={ringRef}
        aria-hidden
        className={`hidden lg:block fixed top-0 left-0 w-7 h-7 rounded-full border border-black/15 pointer-events-none z-[70] transition-[width,height,opacity,background] duration-200 ${hidden ? "opacity-0" : "opacity-100"}`}
        style={{ background: "rgba(37,99,235,0.04)" }}
      />
      <style>{`.cursor-ring--hover{width:44px!important;height:44px!important;background:rgba(37,99,235,0.08)!important;border-color:rgba(37,99,235,0.25)!important;}`}</style>
    </>
  );
}
