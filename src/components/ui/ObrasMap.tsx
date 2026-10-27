"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { obras } from "@/content/profile";
import { fotosObra } from "@/content/media";
import { SmartImage } from "./SmartImage";
import { TunnelSection } from "./TunnelSection";

/**
 * Mapa esquemático del recorrido por las obras: cada obra es un nodo y la
 * ruta que las une en orden cronológico es una pista de circuito que se
 * dibuja con el scroll. Tocar un nodo (o la lista) muestra el detalle.
 */

const W = 600;
const H = 560;
const B = { latMax: 7.1, latMin: 5.0, lonMin: -76.25, lonMax: -74.35 };
const proj = (lat: number, lon: number) => ({
  x: ((lon - B.lonMin) / (B.lonMax - B.lonMin)) * W,
  y: ((B.latMax - lat) / (B.latMax - B.latMin)) * H,
});
// Pacífico 2 y la planta Poblanco están casi en el mismo punto: separa las etiquetas.
const nudge: Record<number, { dx: number; dy: number }> = { 3: { dx: 30, dy: -6 }, 4: { dx: -30, dy: 8 } };

const pts = obras.map((o, i) => {
  const p = proj(o.lat, o.lon);
  const n = nudge[i] ?? { dx: 0, dy: 0 };
  return { x: p.x + n.dx, y: p.y + n.dy };
});
const medellin = proj(6.24, -75.58);

/** Ruta tipo pista de PCB: un tramo recto y un solo quiebre a 45° por segmento. */
function pcbPath(points: { x: number; y: number }[]) {
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (Math.abs(dy) > Math.abs(dx)) d += ` V${b.y - Math.sign(dy) * Math.abs(dx)} L${b.x} ${b.y}`;
    else d += ` H${b.x - Math.sign(dx) * Math.abs(dy)} L${b.x} ${b.y}`;
  }
  return d;
}
const route = pcbPath(pts);

export function ObrasMap() {
  const [active, setActive] = useState(obras.length - 1);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "center 50%"] });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const o = obras[active];
  const photos = fotosObra.filter((f) => f.obra === o.name);

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-12">
      <div className="glass relative overflow-hidden rounded-[32px] p-4 md:p-6 lg:col-span-7">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="group" aria-label="Mapa del recorrido por las obras">
          {/* retícula de coordenadas */}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`v${i}`} x1={(i * W) / 6} y1={0} x2={(i * W) / 6} y2={H} stroke="#39d5ff" strokeOpacity="0.06" />
          ))}
          {Array.from({ length: 7 }, (_, i) => (
            <line key={`h${i}`} x1={0} y1={(i * H) / 6} x2={W} y2={(i * H) / 6} stroke="#39d5ff" strokeOpacity="0.06" />
          ))}
          <g fill="#a3b0bd" fillOpacity="0.55" fontSize="12">
            <text x={W - 34} y={30}>N</text>
            <path d={`M${W - 30} 40 l6 18 l-6 -5 l-6 5 z`} fill="#ff6b1a" fillOpacity="0.8" />
            <circle cx={medellin.x} cy={medellin.y} r="4" fill="none" stroke="#a3b0bd" strokeOpacity="0.6" />
            <text x={medellin.x + 9} y={medellin.y + 4}>Medellín</text>
            <text x={12} y={H - 14}>Antioquia · Caldas · Risaralda</text>
          </g>

          {/* ruta del recorrido */}
          <path d={route} fill="none" stroke="#1a2430" strokeWidth="6" strokeLinejoin="round" />
          <motion.path d={route} fill="none" stroke="#ff6b1a" strokeWidth="2.5" strokeLinejoin="round" style={{ pathLength: draw }} />
          <motion.circle
            r="5"
            fill="#39d5ff"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            style={{ offsetPath: `path("${route}")` }}
          />

          {obras.map((ob, i) => {
            const { x, y } = pts[i];
            const on = i === active;
            return (
              <g
                key={ob.name}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`${ob.name}, ${ob.place}, ${ob.period}`}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(i)}
                className="cursor-pointer outline-none"
              >
                {on && (
                  <motion.circle cx={x} cy={y} r="14" fill="none" stroke="#ff6b1a" initial={{ r: 12, opacity: 1 }} animate={{ r: 30, opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity }} />
                )}
                <circle cx={x} cy={y} r={on ? 15 : 12} fill={on ? "#ff6b1a" : "#121a23"} stroke={on ? "#ff6b1a" : "#39d5ff"} strokeWidth="2" />
                <text x={x} y={y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill={on ? "#000" : "#eef2f5"}>
                  {i + 1}
                </text>
              </g>
            );
          })}
        </svg>
        <p className="px-2 pb-1 text-sm text-ink/60">Ubicaciones aproximadas · la ruta sigue el orden cronológico</p>
      </div>

      <div className="flex flex-col gap-5 lg:col-span-5">
        <ol className="flex flex-wrap gap-2" aria-label="Obras">
          {obras.map((ob, i) => (
            <li key={ob.name}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${i === active ? "bg-hivis text-black" : "bg-surface-3 text-ink hover:bg-surface-2"}`}
              >
                {i + 1}. {ob.name}
              </button>
            </li>
          ))}
        </ol>
        <AnimatePresence mode="wait">
          <motion.article
            key={o.name}
            initial={{ opacity: 0, y: 20, rotateX: -8 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="neo flex-1 overflow-hidden rounded-[28px]"
            aria-live="polite"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
              {photos[0] ? (
                <SmartImage item={photos[0]} />
              ) : (
                <TunnelSection label={`Sección esquemática · ${o.name}`} className="h-full w-full" />
              )}
              <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-sm backdrop-blur">{o.tag}</span>
            </div>
            <div className="p-7">
              <p className="tnum text-sm text-hivis">{o.period}</p>
              <h4 className="display mt-2 text-3xl font-extrabold md:text-4xl">{o.name}</h4>
              <p className="mt-1 text-[15px] text-ink/70">{o.place}</p>
              <p className="mt-4 text-lg leading-relaxed text-ink/90">{o.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {o.facts.map((f) => (
                  <li key={f} className="rounded-full bg-surface-3 px-3.5 py-1.5 text-sm">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
