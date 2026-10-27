"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ai } from "@/content/profile";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

/** Posiciones de los nodos del diagrama (viewBox 1000×420). */
const layout = [
  { x: 110, y: 210 },
  { x: 380, y: 110 },
  { x: 620, y: 110 },
  { x: 620, y: 320 },
  { x: 890, y: 210 },
];
const links: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 3],
];

const trace = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  const dy = b.y - a.y;
  const d = Math.min(Math.abs(dy), 40) * Math.sign(dy);
  return `M${a.x} ${a.y} H${mx - Math.abs(d)} L${mx} ${a.y + d} V${b.y - d} L${mx + Math.abs(d)} ${b.y} H${b.x}`;
};

export function AI() {
  const [active, setActive] = useState(1);
  const node = ai.nodes[active];
  return (
    <Reveal as="section" id="ia" aria-labelledby="ia-t" className="relative py-32 md:py-48">
      <div className="wrap">
        <SectionHeading id="ia-t" chainage="K7+300 · Inteligencia artificial" title="IA aplicada, con criterio de obra" lead={ai.intro} />

        <div data-reveal className="glass overflow-hidden rounded-[36px] p-5 md:p-10">
          <p className="mb-4 text-base text-ink/80">Toca un nodo para ver qué pasa en cada etapa del flujo.</p>
          <div className="overflow-x-auto" data-lenis-prevent-touch>
            <svg viewBox="0 0 1000 420" className="min-w-[640px]" role="group" aria-label="Diagrama de flujo de un agente de IA">
              {links.map(([a, b], i) => {
                const d = trace(layout[a], layout[b]);
                const on = a === active || b === active;
                return (
                  <g key={i}>
                    <path d={d} fill="none" stroke={on ? "#39d5ff" : "#1a2430"} strokeWidth={on ? 3 : 2} />
                    <motion.circle
                      r="5"
                      fill={on ? "#ff6b1a" : "#39d5ff"}
                      initial={{ offsetDistance: "0%" }}
                      animate={{ offsetDistance: "100%" }}
                      transition={{ duration: 2.4 + i * 0.3, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                      style={{ offsetPath: `path("${d}")` }}
                    />
                  </g>
                );
              })}
              {ai.nodes.map((n, i) => {
                const { x, y } = layout[i];
                const on = i === active;
                return (
                  <g
                    key={n.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={on}
                    aria-label={`${n.label}: ${n.detail}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(i)}
                    className="cursor-pointer outline-none"
                  >
                    <motion.rect
                      x={x - 92}
                      y={y - 36}
                      width="184"
                      height="72"
                      rx="18"
                      animate={{ fill: on ? "#ff6b1a" : "#121a23", scale: on ? 1.06 : 1 }}
                      style={{ transformOrigin: `${x}px ${y}px` }}
                      stroke={on ? "#ff6b1a" : "#39d5ff"}
                      strokeOpacity={on ? 1 : 0.35}
                      strokeWidth="2"
                    />
                    <text x={x} y={y + 6} textAnchor="middle" fontSize="19" fontWeight="700" fill={on ? "#000" : "#eef2f5"}>
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <motion.div key={node.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-2xl bg-surface-2 p-6" aria-live="polite">
            <p className="display text-2xl font-bold text-hivis">{node.label}</p>
            <p className="mt-2 text-lg text-ink/90">{node.detail}</p>
          </motion.div>
        </div>

        <ul className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {ai.uses.map((u) => (
            <li key={u.title} data-reveal className="border-l-2 border-signal/60 pl-6">
              <h3 className="display text-2xl font-bold">{u.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-ink/85">{u.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
