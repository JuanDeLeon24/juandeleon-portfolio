"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { about } from "@/content/profile";
import { media } from "@/content/media";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";
import { asset } from "@/lib/asset";

export function About() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [4, -4]);

  return (
    <Reveal as="section" id="sobre-mi" aria-labelledby="sobre-mi-t" className="relative py-32 md:py-48">
      <div className="wrap">
        <SectionHeading id="sobre-mi-t" chainage="K0+850 · Sobre mí" title="Del frente de obra al código" lead={about.lead} />

        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div ref={photoRef} className="md:col-span-4 [perspective:1200px]">
            <div className="md:sticky md:top-28">
              <motion.figure style={{ rotateY: rotate }} className="relative mx-auto aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-[28px] neo md:mx-0 md:max-w-[340px]">
                <motion.div style={{ y }} className="absolute inset-[-8%]">
                  {about.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset(about.photo)} alt="Juan Sebastián De León Rapalino" className="h-full w-full object-cover object-[50%_30%]" loading="lazy" />
                  ) : (
                    <SmartImage item={media.crew} />
                  )}
                </motion.div>
                {/* marco técnico: esquinas de plano sobre la foto */}
                <svg className="pointer-events-none absolute inset-3" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
                  {["M0 10V0H10", "M90 0H100V10", "M100 115V125H90", "M10 125H0V115"].map((d) => (
                    <path key={d} d={d} fill="none" stroke="#ff6b1a" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                  ))}
                </svg>
              </motion.figure>
              <div className="mx-auto mt-5 max-w-[340px] md:mx-0">
                <p className="display text-2xl font-bold">Juan Sebastián De León Rapalino</p>
                <p className="mt-1 text-base text-signal">Ingeniero Electrónico</p>
                <p className="text-[15px] text-ink/70">Control y ejecución de obra · Construcciones El Cóndor</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <ol className="space-y-14">
              {about.chapters.map((c, i) => (
                <li key={c.title} data-reveal className="relative pl-10">
                  <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-hivis shadow-[0_0_0_6px_rgba(255,107,26,0.15)]" aria-hidden="true" />
                  {i < about.chapters.length - 1 && <span className="absolute left-[5px] top-7 h-[calc(100%+2.5rem)] w-0.5 bg-surface-3" aria-hidden="true" />}
                  <h3 className="display text-3xl font-bold md:text-4xl">{c.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-ink/85">{c.body}</p>
                </li>
              ))}
            </ol>

            <div data-reveal className="mt-16 rounded-[28px] bg-navy/60 p-8 md:p-10">
              <h3 className="display text-2xl font-bold">Lo que me diferencia</h3>
              <ul className="mt-6 space-y-4">
                {about.difference.map((d) => (
                  <li key={d} className="flex gap-4 text-lg leading-relaxed">
                    <span className="mt-2.5 h-2 w-6 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
