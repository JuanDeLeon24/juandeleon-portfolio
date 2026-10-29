"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DevDetail } from "@/content/profile";

type Mod = { id: string; text: string };

/**
 * Detalle técnico de Herramientas El Cóndor: método de trabajo, diagrama de
 * arquitectura interactivo (pistas de circuito entre módulos), entorno,
 * lenguajes, componentes y principios de diseño.
 */
export function HerramientasDev({ dev }: { dev: DevDetail }) {
  const arq = dev.arquitectura;
  const all = arq.grupos.flatMap((g) => g.modulos);
  const [sel, setSel] = useState<Mod>(all.find((m) => m.id === arq.inicial) ?? all[0]);
  const n = arq.grupos.length;
  const xs = arq.grupos.map((_, i) => ((i + 0.5) / n) * 600);
  const herramientasDev = dev;

  return (
    <div className="wrap mt-24 md:mt-32">
      <div className="grid gap-6 md:grid-cols-12">
        <h3 className="display text-[clamp(2rem,4.4vw,4rem)] font-extrabold md:col-span-7">
          Cómo se construyó
        </h3>
        <p className="text-lg leading-relaxed text-ink/85 md:col-span-5 md:pt-3">
          {herramientasDev.metodo}
        </p>
      </div>

      {/* Arquitectura */}
      <div className="glass mt-12 rounded-[32px] p-5 md:p-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h4 className="display text-2xl font-bold md:text-3xl">Arquitectura</h4>
          <p className="text-sm text-ink/60">Seleccione un módulo para ver su función</p>
        </div>

        <div className="relative mt-8">
          <Node className="mx-auto max-w-md bg-hivis text-center font-semibold text-black">{arq.lanzador}</Node>

          {/* bus: lanzador → dos módulos */}
          <svg className="mx-auto block h-14 w-full max-w-3xl" viewBox="0 0 600 56" preserveAspectRatio="none" aria-hidden="true">
            {xs.map((x) => (
              <Trace key={x} d={x === 300 ? "M300 0 V56" : `M300 0 V18 L${x < 300 ? 282 : 318} 28 H${x} V56`} />
            ))}
            <text x="300" y="46" textAnchor="middle" fontSize="11" fill="#a3b0bd" fillOpacity="0.7">
              {arq.enlace}
            </text>
          </svg>

          <div className={`grid gap-5 ${n === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
            {arq.grupos.map((g) => (
              <Group key={g.title} title={g.title} sub={g.sub} modulos={g.modulos} sel={sel} onSel={setSel} />
            ))}
          </div>

          <svg className="mx-auto block h-12 w-full max-w-3xl" viewBox="0 0 600 48" preserveAspectRatio="none" aria-hidden="true">
            {xs.map((x) => (
              <Trace key={x} d={x === 300 ? "M300 0 V48" : `M${x} 0 V20 L${x < 300 ? x + 18 : x - 18} 30 H${x < 300 ? 282 : 318} L300 40 V48`} />
            ))}
          </svg>
          <Node className="mx-auto max-w-xl bg-navy text-center text-ink">{arq.base}</Node>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={sel.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mt-8 rounded-2xl bg-surface-2 p-6"
            aria-live="polite"
          >
            <p className="tnum text-base font-semibold text-signal">{sel.id}</p>
            <p className="mt-2 text-lg text-ink/90">{sel.text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Componentes */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {herramientasDev.componentes.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: (i % 4) * 0.06, duration: 0.6 }}
            whileHover={{ y: -4 }}
            className="neo rounded-[24px] p-6"
          >
            <h5 className="display text-xl font-bold">{c.title}</h5>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/85">{c.text}</p>
          </motion.article>
        ))}
      </div>

      {/* Entorno y lenguajes */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="neo rounded-[32px] p-7 md:p-10 lg:col-span-7">
          <h4 className="display text-2xl font-bold md:text-3xl">Entorno de desarrollo</h4>
          <dl className="mt-6 space-y-5">
            {herramientasDev.entorno.map((e) => (
              <div key={e.title} className="grid gap-1 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="font-semibold text-hivis">{e.title}</dt>
                <dd className="text-base leading-relaxed text-ink/90">{e.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-5">
          <div className="rounded-[32px] bg-surface-2 p-7 md:p-10">
            <h4 className="display text-2xl font-bold md:text-3xl">Lenguajes</h4>
            <ul className="mt-6 space-y-4">
              {herramientasDev.lenguajes.map((l) => (
                <li key={l.name}>
                  <p className="font-semibold text-signal">{l.name}</p>
                  <p className="text-base leading-relaxed text-ink/90">{l.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[32px] bg-navy p-7 md:p-10">
            <h4 className="display text-2xl font-bold md:text-3xl">Principios de diseño</h4>
            <ul className="mt-6 space-y-3">
              {herramientasDev.principios.map((p) => (
                <li key={p} className="flex gap-3 text-base leading-relaxed">
                  <span className="mt-2 h-1.5 w-4 shrink-0 rounded-full bg-hivis" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Node({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl px-5 py-4 text-[15px] md:text-base ${className}`}>{children}</div>;
}

function Trace({ d }: { d: string }) {
  return (
    <>
      <path d={d} fill="none" stroke="#1a2430" strokeWidth="5" vectorEffect="non-scaling-stroke" />
      <motion.path
        d={d}
        fill="none"
        stroke="#39d5ff"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </>
  );
}

function Group({ title, sub, modulos, sel, onSel }: { title: string; sub: string; modulos: Mod[]; sel: Mod; onSel: (m: Mod) => void }) {
  return (
    <div className="rounded-[24px] bg-surface-2/80 p-5">
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-ink/60">{sub}</p>
      <ul className="mt-4 grid gap-2">
        {modulos.map((m) => {
          const on = m.id === sel.id;
          return (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => onSel(m)}
                onMouseEnter={() => onSel(m)}
                aria-pressed={on}
                className={`flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-xl px-4 py-3 text-left transition ${on ? "bg-hivis text-black" : "bg-surface-3 text-ink hover:bg-surface"}`}
              >
                <span className={`h-2.5 w-2.5 shrink-0 rounded-sm ${on ? "bg-black" : "bg-signal"}`} aria-hidden="true" />
                <span className="tnum shrink-0 font-semibold">{m.id}</span>
                <span className={`hidden min-w-0 truncate text-sm sm:inline ${on ? "text-black/70" : "text-ink/60"}`}>{m.text.split(":")[0]}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
