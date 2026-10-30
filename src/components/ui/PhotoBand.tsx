"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { MediaItem } from "@/content/media";
import { SmartImage } from "./SmartImage";
import { asset } from "@/lib/asset";

type Props = {
  items: MediaItem[];
  chainage: string;
  label: string;
  align?: "left" | "right";
  /** Video opcional; la foto principal sirve de póster mientras carga o si no existe. */
  video?: { src: string; caption: string };
};

/**
 * Franja fotográfica a todo el ancho entre secciones. Al entrar en pantalla
 * se abre como el arco de un portal (clip-path) y la foto se desplaza en
 * parallax; lleva esquinas de plano y una ficha técnica con la abscisa.
 * Con dos fotos se compone en dos planos desplazados.
 */
export function PhotoBand({ items, chainage, label, align = "left", video }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const vref = useRef<HTMLVideoElement>(null);

  // El video solo se reproduce mientras la franja está en pantalla.
  useEffect(() => {
    const v = vref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.05, 1.12]);
  const open = useTransform(scrollYProgress, [0.05, 0.4], [18, 0]);
  const clip = useTransform(open, (v) => `inset(${v}% ${v * 1.4}% ${v}% ${v * 1.4}% round ${24 + v * 6}px)`);
  const y2 = useTransform(scrollYProgress, [0, 1], ["14%", "-14%"]);
  const [main, second] = items;

  return (
    <figure ref={ref} className="relative my-6 md:my-10" aria-label={label}>
      <div className="wrap">
        <div className={`relative ${second ? "md:pr-[22%]" : ""} ${second && align === "right" ? "md:pl-[22%] md:pr-0" : ""}`}>
          <motion.div style={{ clipPath: clip }} className="relative aspect-[4/5] overflow-hidden rounded-[28px] sm:aspect-[16/10] md:aspect-[21/9]">
            <motion.div style={{ y, scale }} className="absolute inset-[-12%]">
              {video ? (
                <video ref={vref} className="h-full w-full object-cover" poster={asset(main.src)} muted loop playsInline preload="none" aria-label={main.alt}>
                  <source src={asset(video.src)} type="video/mp4" />
                </video>
              ) : (
                <SmartImage item={main} sizes="100vw" />
              )}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
            {/* esquinas de plano */}
            <svg className="pointer-events-none absolute inset-4 md:inset-6" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {["M0 6V0H6", "M94 0H100V6", "M100 94V100H94", "M6 100H0V94"].map((d) => (
                <path key={d} d={d} fill="none" stroke="#ff6b1a" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              ))}
            </svg>
            <figcaption className={`absolute bottom-5 max-w-[34rem] px-6 md:bottom-8 md:px-10 ${align === "right" ? "right-0 text-right" : "left-0"}`}>
              <span className="tnum inline-block rounded-full bg-hivis px-3 py-1 text-xs font-semibold text-black md:text-sm">{chainage}</span>
              <span className="mt-3 block text-[15px] leading-snug text-ink md:text-lg">{video?.caption ?? main.caption}</span>
              <span className="mt-1 block text-xs text-ink/60">Foto: {main.credit}</span>
            </figcaption>
          </motion.div>

          {second && (
            <motion.div
              style={{ y: y2 }}
              className={`absolute top-[18%] hidden w-[34%] overflow-hidden rounded-[22px] shadow-[0_30px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10 md:block ${align === "right" ? "left-0" : "right-0"}`}
            >
              <div className="aspect-[4/3]">
                <SmartImage item={second} />
              </div>
              <p className="bg-surface/90 px-4 py-3 text-sm leading-snug text-ink/85 backdrop-blur">{second.caption}</p>
            </motion.div>
          )}
        </div>
      </div>
    </figure>
  );
}
