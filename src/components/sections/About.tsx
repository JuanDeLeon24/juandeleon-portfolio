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
        <SectionHeading id="sobre-mi-t" chainage="K0+850 · Sobre mí" title="De obrero a ingeniero que automatiza la obra" lead={about.lead} />

        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div ref={photoRef} className="md:col-span-5 [perspective:1200px]">
            <motion.figure style={{ rotateY: rotate }} className="relative aspect-[4/5] overflow-hidden rounded-[28px] neo">
              <motion.div style={{ y }} className="absolute inset-[-8%]">
                {about.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={asset(about.photo)} alt="Juan Sebastián De León Rapalino" className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <SmartImage item={media.crew} />
                )}
              </motion.div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-6 pt-20 text-sm text-ink/85">
                {about.photo ? "Juan Sebastián De León Rapalino" : "Espacio para tu fotografía profesional · imagen de referencia: Unsplash"}
              </figcaption>
            </motion.figure>
          </div>

          <div className="md:col-span-6 md:col-start-7">
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
