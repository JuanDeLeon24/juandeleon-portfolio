"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export function Counter({ value, prefix = "", suffix = "", className = "" }: { value: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return setDisplay(value);
    const controls = animate(0, value, { duration: 1.8, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setDisplay(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref} className={`tnum ${className}`} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {display.toLocaleString("es-CO")}
      {suffix}
    </span>
  );
}
