"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { sideProjects } from "@/content/profile";
import { media } from "@/content/media";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";

export function SideProjects() {
  const [lovely, ...rest] = sideProjects;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yDesk = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yPhone = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const rot = useTransform(scrollYProgress, [0, 1], [-14, 6]);

  return (
    <Reveal as="section" id="mas-proyectos" aria-labelledby="mas-t" className="py-32 md:py-44">
      <div className="wrap">
        <SectionHeading
          id="mas-t"
          chainage="K5+900 · Más allá de la obra"
          title="Proyectos adicionales"
          lead="Lo que construyo fuera del túnel: comercio electrónico, análisis cuantitativo y los primeros pasos que me trajeron hasta aquí."
        />

        {/* Lovely: proyecto destacado */}
        <article ref={ref} data-reveal className="relative grid items-center gap-12 overflow-hidden rounded-[36px] bg-[#111111] p-7 md:p-12 lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-5">
            <p className="text-sm text-[#D4AF37]">{lovely.kind}</p>
            <h3 className="display mt-3 text-5xl font-extrabold md:text-6xl">{lovely.name}</h3>
            <p className="mt-6 text-lg leading-relaxed text-ink/90">{lovely.summary}</p>
            <ul className="mt-6 space-y-2.5">
              {lovely.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-base leading-relaxed text-ink/90">
                  <span className="mt-2 h-1.5 w-4 shrink-0 rounded-full bg-[#D4AF37]" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              {lovely.live && (
                <a href={lovely.live} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#D4AF37] px-6 py-3 font-semibold text-black transition hover:scale-105">
                  Visitar la tienda
                </a>
              )}
              {lovely.repo && (
                <a href={lovely.repo} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-6 py-3 font-medium transition hover:bg-white/20">
                  Código
                </a>
              )}
            </div>
          </div>
          <div className="relative h-[420px] md:h-[560px] lg:col-span-7 [perspective:1600px]">
            <motion.div style={{ y: yDesk, rotateY: rot }} className="absolute right-0 top-6 w-[92%] overflow-hidden rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
              <div className="flex gap-1.5 bg-[#222] px-4 py-3" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="aspect-[16/10]">
                <SmartImage item={media.lovelyHome} />
              </div>
            </motion.div>
            <motion.div style={{ y: yPhone }} className="absolute bottom-0 left-2 w-[34%] max-w-[220px] overflow-hidden rounded-[28px] border-[6px] border-[#222] shadow-[0_30px_60px_rgba(0,0,0,0.7)]">
              <div className="aspect-[390/844]">
                <SmartImage item={media.lovelyMobile} className="object-top" />
              </div>
            </motion.div>
          </div>
        </article>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <article key={p.name} data-reveal className="neo flex flex-col rounded-[32px] p-8 md:p-10">
              <p className="text-sm text-signal">{p.kind}</p>
              <h3 className="display mt-3 text-4xl font-extrabold">{p.name}</h3>
              <p className="mt-5 text-lg leading-relaxed text-ink/90">{p.summary}</p>
              <ul className="mt-5 space-y-2">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-base leading-relaxed text-ink/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-hivis" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                <ul className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li key={s} className="rounded-full bg-surface-3 px-3 py-1.5 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-hivis underline-offset-4 hover:underline">
                    Ver en GitHub
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
