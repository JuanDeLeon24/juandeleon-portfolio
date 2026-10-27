"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "@/content/profile";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const groups = ["Todas", ...Array.from(new Set(skills.map((s) => s.group)))];

export function Skills() {
  const [group, setGroup] = useState("Todas");
  const list = skills.filter((s) => group === "Todas" || s.group === group);

  // radar por grupo
  const radar = groups.slice(1).map((g) => {
    const items = skills.filter((s) => s.group === g);
    return { g, v: items.reduce((a, s) => a + s.level, 0) / items.length };
  });
  const cx = 160;
  const cy = 160;
  const R = 120;
  const pt = (i: number, v: number) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / radar.length;
    return [cx + Math.cos(a) * R * (v / 100), cy + Math.sin(a) * R * (v / 100)];
  };
  const poly = radar.map((r, i) => pt(i, r.v).join(",")).join(" ");

  return (
    <Reveal as="section" id="capacidades" aria-labelledby="cap-t" className="bg-surface/85 py-32 backdrop-blur-sm md:py-48">
      <div className="wrap">
        <SectionHeading id="cap-t" chainage="K6+500 · Capacidades" title="Capacidades tecnológicas" lead="Herramientas que uso a diario para pasar de un problema de obra a una solución en producción." />

        <div className="grid gap-14 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-5">
            <svg viewBox="-50 -10 420 340" className="mx-auto w-full max-w-md" role="img" aria-label={`Perfil por áreas: ${radar.map((r) => `${r.g} ${Math.round(r.v)}%`).join(", ")}`}>
              {[0.25, 0.5, 0.75, 1].map((k) => (
                <polygon key={k} points={radar.map((_, i) => pt(i, k * 100).join(",")).join(" ")} fill="none" stroke="#1a2430" strokeWidth="1.5" />
              ))}
              {radar.map((_, i) => {
                const [x, y] = pt(i, 100);
                return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#1a2430" strokeWidth="1.5" />;
              })}
              <motion.polygon
                points={poly}
                fill="rgba(255,107,26,0.18)"
                stroke="#ff6b1a"
                strokeWidth="2.5"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "160px 160px" }}
              />
              {radar.map((r, i) => {
                const [x, y] = pt(i, 122);
                const [px, py] = pt(i, r.v);
                return (
                  <g key={r.g}>
                    <circle cx={px} cy={py} r="5" fill="#39d5ff" />
                    <text x={x} y={y} fill="#eef2f5" fontSize="14" textAnchor="middle" dominantBaseline="middle" fontWeight="600">
                      {r.g}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="lg:col-span-7">
            <div data-reveal role="tablist" aria-label="Filtrar por área" className="mb-10 flex flex-wrap gap-2">
              {groups.map((g) => (
                <button
                  key={g}
                  role="tab"
                  aria-selected={group === g}
                  onClick={() => setGroup(g)}
                  className={`rounded-full px-5 py-2.5 text-[15px] font-medium transition ${group === g ? "bg-ink text-black" : "bg-surface-3 text-ink hover:bg-surface-2"}`}
                >
                  {g}
                </button>
              ))}
            </div>
            <ul className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {list.map((s, i) => (
                <motion.li key={s.name} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-semibold">{s.name}</span>
                    <span className="tnum text-sm text-ink/70">{s.level}%</span>
                  </div>
                  <div className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-surface-3" role="meter" aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100} aria-label={s.name}>
                    <motion.div
                      className={`h-full rounded-full ${s.group === "IA" ? "bg-signal" : "bg-hivis"}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.05 }}
                    />
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
