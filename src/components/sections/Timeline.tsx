"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { timeline } from "@/content/profile";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * Escritorio: la línea de tiempo se fija y avanza en horizontal con el scroll,
 * como un frente de excavación. Móvil: lista vertical con entrada por tarjeta.
 */
export function Timeline() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        if (prefersReducedMotion()) return;
        const track = trackRef.current!;
        const distance = () => track.scrollWidth - window.innerWidth + 64;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: pinRef.current, start: "top top", end: () => `+=${distance()}`, scrub: true } });
        track.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
          gsap.fromTo(
            card,
            { rotateY: -18, z: -90, opacity: 0.35 },
            {
              rotateY: 0,
              z: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 95%", end: "left 55%", scrub: true },
            },
          );
        });
        return () => ScrollTrigger.refresh();
      });
      mm.add("(max-width: 1023px)", () => {
        trackRef.current?.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
          gsap.fromTo(card, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 85%", once: true } });
        });
      });
      return () => mm.revert();
    },
    { scope: pinRef },
  );

  return (
    <section id="trayectoria" aria-labelledby="trayectoria-t" className="relative bg-surface">
      <Reveal className="wrap pt-32 md:pt-44">
        <SectionHeading
          id="trayectoria-t"
          chainage="K2+100 · Trayectoria"
          title="Una carrera construida por tramos"
          lead="Formación técnica y profesional, supervisión de operaciones y seis proyectos de infraestructura con Construcciones El Cóndor."
        />
      </Reveal>

      <div ref={pinRef} className="relative overflow-hidden pb-28 lg:flex lg:h-screen lg:items-center lg:pb-0">
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-0.5 bg-surface-3 lg:block" aria-hidden="true">
          <div ref={lineRef} className="h-full origin-left bg-hivis" />
        </div>
        <div ref={trackRef} className="wrap flex flex-col gap-6 lg:w-max lg:max-w-none lg:flex-row lg:gap-10 lg:pr-[20vw] [perspective:1400px]">
          {timeline.map((t, i) => (
            <article
              key={t.period + t.title}
              data-card
              className="neo relative flex shrink-0 flex-col rounded-[28px] p-7 [transform-style:preserve-3d] md:p-9 lg:min-h-[58vh] lg:w-[25rem] xl:w-[27rem]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="tnum rounded-full bg-hivis/15 px-3 py-1 text-sm font-semibold text-hivis">{t.period}</span>
                <span className="tnum text-sm text-ink/50">Tramo {String.fromCharCode(65 + i)}</span>
              </div>
              <h3 className="display mt-6 text-[1.9rem] font-extrabold leading-[1.02] md:text-[2.2rem]">{t.title}</h3>
              <p className="mt-3 text-base font-semibold leading-snug text-signal">{t.role}</p>
              <p className="mt-1 text-[15px] text-ink/70">
                {t.org} · {t.place}
              </p>
              <p className="mt-5 text-base leading-relaxed text-ink/90 md:text-[17px]">{t.summary}</p>
              <ul className="mt-auto flex flex-wrap gap-2 pt-7">
                {t.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-surface-3 px-3.5 py-1.5 text-sm text-ink/90">
                    {h}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
