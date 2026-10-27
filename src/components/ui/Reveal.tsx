"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Anima en cascada los hijos marcados con [data-reveal] cuando la sección
 * entra en pantalla: título, texto y luego imagen, 70 ms entre cada uno.
 */
export function Reveal({
  as: Tag = "div",
  className,
  children,
  id,
  ...rest
}: { as?: React.ElementType; className?: string; children: React.ReactNode; id?: string } & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      });
    },
    { scope: ref },
  );
  return (
    <Tag ref={ref} id={id} className={className} {...rest}>
      {children}
    </Tag>
  );
}
