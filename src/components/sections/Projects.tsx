"use client";
import { useState } from "react";
import { projects, type Project } from "@/content/profile";
import { media } from "@/content/media";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";
import { TiltCard } from "../ui/TiltCard";
import { Lightbox } from "../ui/Lightbox";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  return (
    <Reveal as="section" id="proyectos" aria-labelledby="proyectos-t" className="py-32 md:py-48">
      <div className="wrap">
        <SectionHeading
          id="proyectos-t"
          chainage="K5+200 · Proyectos"
          title="Herramientas hechas para la obra"
          lead="Herramientas desarrolladas a partir de necesidades reales de control en obra. Código disponible en GitHub; seleccione una tarjeta para ver el detalle."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {projects.map((p, i) => (
            <div key={p.id} data-reveal className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <TiltCard onClick={() => setActive(p)} label={`Ver detalle: ${p.title}`} className="h-full overflow-hidden rounded-[28px] bg-surface-2">
                <div className="relative aspect-[16/10] overflow-hidden" style={{ transform: "translateZ(30px)" }}>
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                    <SmartImage item={media[p.image]} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-2 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-black/60 px-3 py-1.5 text-sm text-ink backdrop-blur">{p.category}</span>
                </div>
                <div className="p-7" style={{ transform: "translateZ(50px)" }}>
                  <h3 className="display text-3xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink/85">{p.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <li key={s} className="rounded-full bg-surface-3 px-3 py-1.5 text-sm text-signal">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>

      <Lightbox open={!!active} onClose={() => setActive(null)} title={active?.title ?? ""}>
        {active && (
          <div>
            <div className="relative aspect-[21/9] overflow-hidden rounded-t-[32px]">
              <SmartImage item={media[active.image]} />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
            </div>
            <div className="p-8 md:p-12">
              <p className="text-sm text-hivis">{active.category}</p>
              <h3 className="display mt-2 text-4xl font-extrabold md:text-5xl">{active.title}</h3>
              <p className="mt-5 text-lg leading-relaxed text-ink/90">{active.summary}</p>
              <ul className="mt-8 space-y-3">
                {active.details.map((d) => (
                  <li key={d} className="flex gap-3 text-lg leading-relaxed">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
              {active.repo && (
                <a href={active.repo} target="_blank" rel="noopener noreferrer" className="mt-10 inline-block rounded-full bg-hivis px-6 py-3 font-semibold text-black transition hover:scale-105">
                  Ver código en GitHub
                </a>
              )}
            </div>
          </div>
        )}
      </Lightbox>
    </Reveal>
  );
}
