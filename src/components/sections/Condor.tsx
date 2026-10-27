"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { condor, hilo, jornadasCase } from "@/content/profile";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Counter } from "../ui/Counter";
import { JornadaCalculator } from "../ui/JornadaCalculator";
import { ObrasMap } from "../ui/ObrasMap";

export function Condor() {
  return (
    <section id="el-condor" aria-labelledby="condor-t" className="relative overflow-hidden py-32 md:py-48">
      <Reveal className="wrap">
        <SectionHeading id="condor-t" chainage="K3+400 · Construcciones El Cóndor" title="Experiencia en El Cóndor" lead={condor.intro} />
      </Reveal>

      <Marquee items={condor.activities} />

      {/* Recorrido por las obras */}
      <Reveal className="wrap mt-24 md:mt-32">
        <div className="mb-10 grid gap-6 md:grid-cols-12">
          <h3 data-reveal className="display text-[clamp(2rem,4.4vw,4rem)] font-extrabold md:col-span-7">
            Seis obras, un mismo método
          </h3>
          <p data-reveal className="text-lg leading-relaxed text-ink/85 md:col-span-5 md:pt-3">
            Vías, minería, puentes, una planta de asfalto y un túnel. Toca cada punto del mapa para ver qué hice en cada obra.
          </p>
        </div>
        <div data-reveal>
          <ObrasMap />
        </div>
      </Reveal>

      {/* El hilo conductor */}
      <Reveal className="wrap mt-16 md:mt-24">
        <div className="relative overflow-hidden rounded-[36px] bg-navy p-8 md:p-14">
          <svg className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 opacity-30" viewBox="0 0 200 200" aria-hidden="true">
            <path d="M0 40 H80 L110 70 V200 M30 0 V30 L60 60 H200 M140 0 V90 L170 120 H200" fill="none" stroke="#39d5ff" strokeWidth="2" />
            {[[80, 40], [110, 70], [60, 60], [140, 90], [170, 120]].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="#05070a" stroke="#ff6b1a" strokeWidth="2" />
            ))}
          </svg>
          <p data-reveal className="text-sm font-semibold text-hivis">
            El hilo conductor de todas las obras
          </p>
          <blockquote data-reveal className="relative mt-5 max-w-[40ch] text-[clamp(1.4rem,2.4vw,2.1rem)] font-semibold leading-snug">
            {hilo.statement}
          </blockquote>
          <ul className="relative mt-10 flex flex-wrap gap-3">
            {hilo.puntos.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
                className="rounded-full bg-black/30 px-5 py-2.5 text-base"
              >
                {p}
              </motion.li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Aportes */}
      <Reveal className="wrap mt-32 md:mt-44">
        <h3 data-reveal className="display max-w-[18ch] text-[clamp(2rem,4.4vw,4rem)] font-extrabold">
          Aportes que cambiaron la forma de trabajar
        </h3>
        <div className="mt-12 grid gap-5 md:grid-cols-6">
          {condor.contributions.map((c, i) => (
            <motion.article
              key={c.title}
              data-reveal
              whileHover={{ y: -6 }}
              className={`rounded-[28px] p-8 md:p-10 ${i === 1 ? "bg-hivis text-black md:col-span-4 md:row-span-2" : i === 0 ? "bg-navy md:col-span-2" : "neo md:col-span-2"}`}
            >
              <h4 className={`display font-bold ${i === 1 ? "text-4xl md:text-6xl" : "text-2xl"}`}>{c.title}</h4>
              <p className={`mt-4 leading-relaxed ${i === 1 ? "max-w-[44ch] text-xl" : "text-lg text-ink/85"}`}>{c.text}</p>
            </motion.article>
          ))}
        </div>
      </Reveal>

      <CaseStudy />

      {/* Pieza interactiva */}
      <Reveal className="wrap mt-32 md:mt-44" id="calculadora">
        <div className="mb-10 grid gap-6 md:grid-cols-12">
          <h3 data-reveal className="display text-[clamp(2rem,4.4vw,4rem)] font-extrabold md:col-span-7">
            Prueba la lógica de una jornada de túnel
          </h3>
          <p data-reveal className="text-lg leading-relaxed text-ink/85 md:col-span-5 md:pt-3">
            Turnos de 9,5 y 10,5 horas, recesos, tolerancia de llegada, redondeo de la salida y base de extras por día. Así se convierte una regla de nómina en código.
          </p>
        </div>
        <div data-reveal>
          <JornadaCalculator />
        </div>
      </Reveal>
    </section>
  );
}

function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="mt-6 space-y-4 overflow-hidden" aria-label="Actividades realizadas">
      <ul className="sr-only">
        {items.map((a) => (
          <li key={a}>{a}</li>
        ))}
      </ul>
      {[0, 1].map((r) => (
        <div key={r} className="flex w-max gap-4 motion-safe:animate-[marquee_60s_linear_infinite]" style={{ animationDirection: r ? "reverse" : "normal" }} aria-hidden="true">
          {row.map((a, i) => (
            <span key={i} className={`display whitespace-nowrap rounded-full px-7 py-4 text-xl font-semibold md:text-3xl ${(i + r) % 3 === 0 ? "bg-navy" : "bg-surface-2"}`}>
              {a}
            </span>
          ))}
        </div>
      ))}
      <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );
}

function CaseStudy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 70%"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative mt-32 bg-surface py-28 md:mt-44 md:py-40">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p data-reveal className="text-sm text-signal">
              Caso de estudio · sistema desarrollado
            </p>
            <h3 data-reveal className="display mt-4 text-[clamp(2.2rem,4.6vw,4.4rem)] font-extrabold">
              {jornadasCase.name}
            </h3>
            <p data-reveal className="mt-6 text-lg leading-relaxed text-ink/85">
              {jornadasCase.pitch}
            </p>
            <dl data-reveal className="mt-10 grid grid-cols-2 gap-6">
              {jornadasCase.metrics.map((m) => (
                <div key={m.label}>
                  <dd className="display text-5xl font-extrabold text-hivis md:text-6xl">
                    <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </dd>
                  <dt className="mt-2 text-[15px] leading-snug text-ink/80">{m.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
        <div className="relative lg:col-span-6 lg:col-start-7">
          <div className="absolute left-[19px] top-2 h-full w-0.5 bg-surface-3" aria-hidden="true">
            <motion.div style={{ scaleY: fill }} className="h-full w-full origin-top bg-signal" />
          </div>
          <ol className="space-y-10">
            {jornadasCase.steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-16"
              >
                <span className="tnum absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-surface-3 font-semibold text-signal" aria-hidden="true">
                  {i + 1}
                </span>
                <div className="glass rounded-[24px] p-7">
                  <h4 className="display text-2xl font-bold">{s.title}</h4>
                  <p className="mt-2 text-lg leading-relaxed text-ink/85">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
