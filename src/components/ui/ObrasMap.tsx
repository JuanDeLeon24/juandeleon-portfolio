"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { obras } from "@/content/profile";
import { fotosObra } from "@/content/media";
import { colombiaPath, proj, vecinosPath } from "@/content/colombia";
import { SmartImage } from "./SmartImage";
import { TunnelSection } from "./TunnelSection";
import { asset } from "@/lib/asset";

/**
 * Mapa de Colombia con el recorrido por las obras: el contorno real del país
 * (Natural Earth), ciudades de referencia y una pista de circuito que une las
 * obras en orden cronológico. Empieza acercado a la zona de las obras y se
 * puede alejar hasta ver el país completo.
 */

type VB = [number, number, number, number];
type TabId = "aportes" | "innovacion" | "valor";
const tabs: { id: TabId; label: string }[] = [
  { id: "aportes", label: "Aportes" },
  { id: "innovacion", label: "Innovación" },
  { id: "valor", label: "Valor" },
];
// Proporción del lienzo 5:6 en las dos vistas para que la transición no deforme.
const ZONA: VB = [530, 585, 320, 384];
const PAIS: VB = [180, 40, 1450, 1740];
const RENDER_W = 700; // ancho aproximado en pantalla, para convertir px a unidades

const ciudades: { name: string; lat: number; lon: number; left?: boolean; capital?: boolean }[] = [
  { name: "Medellín", lat: 6.244, lon: -75.581, capital: true },
  { name: "Manizales", lat: 5.07, lon: -75.514, capital: true },
  { name: "Pereira", lat: 4.814, lon: -75.694, left: true, capital: true },
  { name: "Ibagué", lat: 4.438, lon: -75.232, capital: true },
  { name: "Bogotá", lat: 4.711, lon: -74.072, capital: true },
  { name: "Puerto Berrío", lat: 6.49, lon: -74.403 },
  { name: "Cali", lat: 3.452, lon: -76.532, capital: true },
  { name: "Montería", lat: 8.748, lon: -75.881, capital: true },
  { name: "Cartagena", lat: 10.391, lon: -75.479, left: true, capital: true },
  { name: "Barranquilla", lat: 10.964, lon: -74.796, capital: true },
  { name: "Bucaramanga", lat: 7.119, lon: -73.123, capital: true },
  { name: "Valledupar", lat: 10.463, lon: -73.253, capital: true },
  { name: "Turbo · Urabá", lat: 8.093, lon: -76.728, left: true },
];

/** Trazado aproximado de los ríos por poblaciones ribereñas (sur → norte). */
const rios: { name: string; label: [number, number]; pts: [number, number][] }[] = [
  {
    name: "Río Cauca",
    label: [5.95, -75.98],
    pts: [
      [3.0, -76.6], [3.45, -76.48], [4.1, -76.2], [4.75, -75.93], [4.9, -75.88], [5.12, -75.72], [5.27, -75.66],
      [5.5, -75.62], [5.74, -75.6], [5.98, -75.84], [6.3, -75.86], [6.56, -75.8], [6.9, -75.78], [7.3, -75.6],
      [7.9, -75.2], [8.6, -74.9], [9.2, -74.75],
    ],
  },
  {
    name: "Río Magdalena",
    label: [5.6, -74.5],
    pts: [
      [2.9, -75.3], [3.6, -75.0], [4.3, -74.8], [4.8, -74.75], [5.2, -74.74], [5.97, -74.59], [6.49, -74.4],
      [7.06, -73.85], [7.7, -73.85], [8.4, -74.0], [9.25, -74.4], [10.0, -74.8], [10.96, -74.78],
    ],
  },
];

/** Curva suave (Catmull-Rom a Bézier) por los puntos proyectados. */
function smooth(latlon: [number, number][]) {
  const p = latlon.map(([la, lo]) => proj(la, lo));
  let d = `M${p[0].x.toFixed(1)} ${p[0].y.toFixed(1)}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] ?? p[i];
    const b = p[i];
    const c = p[i + 1];
    const e = p[i + 2] ?? c;
    d += ` C${(b.x + (c.x - a.x) / 6).toFixed(1)} ${(b.y + (c.y - a.y) / 6).toFixed(1)} ${(c.x - (e.x - b.x) / 6).toFixed(1)} ${(c.y - (e.y - b.y) / 6).toFixed(1)} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`;
  }
  return d;
}
const riosPaths = rios.map((r) => ({ ...r, d: smooth(r.pts), at: proj(...r.label) }));

// Pacífico 2 y la planta Poblanco están casi en el mismo punto: separa los marcadores.
const nudge: Record<number, { dx: number; dy: number }> = { 3: { dx: 7, dy: -5 }, 4: { dx: -7, dy: 6 } };
const pts = obras.map((o, i) => {
  const p = proj(o.lat, o.lon);
  const n = nudge[i] ?? { dx: 0, dy: 0 };
  return { x: p.x + n.dx, y: p.y + n.dy };
});

/** Ruta tipo pista de PCB: un tramo recto y un solo quiebre a 45° por segmento. */
function pcbPath(points: { x: number; y: number }[]) {
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (Math.abs(dy) > Math.abs(dx)) d += ` V${(b.y - Math.sign(dy) * Math.abs(dx)).toFixed(1)} L${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
    else d += ` H${(b.x - Math.sign(dx) * Math.abs(dy)).toFixed(1)} L${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
}
const route = pcbPath(pts);

export function ObrasMap() {
  const [active, setActive] = useState(obras.length - 1);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [tab, setTab] = useState<TabId>("aportes");
  const [vb, setVb] = useState<VB>(ZONA);
  const [pais, setPais] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const o = obras[active];
  const photos = fotosObra.filter((f) => f.obra === o.name);
  const photo = photos[Math.min(photoIdx, photos.length - 1)];
  const select = (i: number) => {
    setActive(i);
    setPhotoIdx(0);
  };

  // Transición animada del viewBox entre la zona de obras y el país completo.
  useEffect(() => {
    const from = vb;
    const to = pais ? PAIS : ZONA;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return setVb(to);
    const c = animate(0, 1, {
      duration: 1.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (t) => setVb(from.map((v, i) => v + (to[i] - v) * t) as VB),
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pais]);

  const u = vb[2] / RENDER_W; // unidades del mapa por píxel en pantalla
  const zoomT = (PAIS[2] - vb[2]) / (PAIS[2] - ZONA[2]); // 1 = zona, 0 = país
  const graticule = [];
  for (let lon = -80; lon <= -66; lon++) {
    const a = proj(14, lon);
    const b = proj(-5, lon);
    graticule.push(<line key={`lo${lon}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} vectorEffect="non-scaling-stroke" />);
  }
  for (let lat = -4; lat <= 13; lat++) {
    const a = proj(lat, -83);
    const b = proj(lat, -65);
    graticule.push(<line key={`la${lat}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} vectorEffect="non-scaling-stroke" />);
  }

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-12">
      <div className="glass relative overflow-hidden rounded-[32px] p-3 md:p-5 lg:col-span-7">
        <div className="relative">
          <svg viewBox={vb.join(" ")} className="block aspect-[5/6] h-auto w-full rounded-[22px] bg-[#070b10]" role="group" aria-label="Mapa de Colombia con las obras en orden cronológico">
            <defs>
              <pattern id="puntos" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="0.7" fill="#39d5ff" fillOpacity="0.28" />
              </pattern>
            </defs>

            {/* retícula de coordenadas cada grado */}
            <g stroke="#39d5ff" strokeOpacity="0.07">{graticule}</g>

            <path d={vecinosPath} fill="#0b1016" fillOpacity="0.6" stroke="#a3b0bd" strokeOpacity="0.18" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <path d={colombiaPath} fill="url(#puntos)" stroke="#39d5ff" strokeOpacity="0.75" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />

            {/* ríos */}
            {riosPaths.map((r) => (
              <g key={r.name}>
                <path d={r.d} fill="none" stroke="#39d5ff" strokeOpacity="0.35" strokeWidth={2} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                {zoomT > 0.5 && (
                  <text x={r.at.x} y={r.at.y} fontSize={11 * u} fill="#39d5ff" fillOpacity={0.6 * zoomT} fontStyle="italic" textAnchor="middle" transform={`rotate(-70 ${r.at.x} ${r.at.y})`}>
                    {r.name}
                  </text>
                )}
              </g>
            ))}

            {/* etiquetas de grados en la vista de zona */}
            {zoomT > 0.6 && (
              <g fill="#a3b0bd" fillOpacity={0.5 * zoomT} fontSize={11 * u}>
                {[4, 5, 6, 7].map((lat) => {
                  const p = proj(lat, -76.55);
                  return <text key={lat} x={p.x} y={p.y - 3 * u}>{lat}° N</text>;
                })}
                {[-76, -75, -74].map((lon) => {
                  const p = proj(3.95, lon);
                  return <text key={lon} x={p.x + 3 * u} y={p.y}>{Math.abs(lon)}° O</text>;
                })}
              </g>
            )}

            {/* recuadro de la zona de obras en la vista de país */}
            <rect
              x={ZONA[0]}
              y={ZONA[1]}
              width={ZONA[2]}
              height={ZONA[3]}
              fill="none"
              stroke="#ff6b1a"
              strokeOpacity={1 - zoomT}
              strokeDasharray="6 4"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
            {zoomT < 0.4 && (
              <text x={ZONA[0] + ZONA[2] + 10 * u} y={ZONA[1] + 14 * u} fill="#ff6b1a" fontSize={13 * u} fontWeight="600" opacity={1 - zoomT * 2.5}>
                Zona de obras
              </text>
            )}

            {/* ciudades de referencia */}
            {ciudades.map((c) => {
              const p = proj(c.lat, c.lon);
              const fs = (c.capital ? 13 : 12) * u;
              return (
                <g key={c.name}>
                  <rect x={p.x - 3.5 * u} y={p.y - 3.5 * u} width={7 * u} height={7 * u} fill="#05070a" stroke="#eef2f5" strokeOpacity="0.7" strokeWidth={1.2} vectorEffect="non-scaling-stroke" transform={`rotate(45 ${p.x} ${p.y})`} />
                  <text x={c.left ? p.x - 9 * u : p.x + 9 * u} y={p.y + 4.5 * u} textAnchor={c.left ? "end" : "start"} fontSize={fs} fill="#eef2f5" fillOpacity="0.72">
                    {c.name}
                  </text>
                </g>
              );
            })}

            {/* ruta del recorrido */}
            <path d={route} fill="none" stroke="#1a2430" strokeWidth={6} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <motion.path
              d={route}
              fill="none"
              stroke="#ff6b1a"
              strokeWidth={2.5}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: inView ? 1 : 0 }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />
            <motion.circle
              r={4 * u}
              fill="#39d5ff"
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              style={{ offsetPath: `path("${route}")` }}
            />

            {obras.map((ob, i) => {
              const { x, y } = pts[i];
              const on = i === active;
              const r = (on ? 14 : 11) * u * (0.55 + 0.45 * zoomT);
              return (
                <g
                  key={ob.name}
                  role="button"
                  tabIndex={0}
                  aria-pressed={on}
                  aria-label={`${i + 1}. ${ob.name}, ${ob.place}, ${ob.period}`}
                  onClick={() => select(i)}
                  onMouseEnter={() => active !== i && select(i)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && select(i)}
                  className="cursor-pointer outline-none"
                >
                  {on && (
                    <motion.circle cx={x} cy={y} fill="none" stroke="#ff6b1a" strokeWidth={1.5} vectorEffect="non-scaling-stroke" initial={{ r, opacity: 1 }} animate={{ r: r * 2.4, opacity: 0 }} transition={{ duration: 1.6, repeat: Infinity }} />
                  )}
                  <circle cx={x} cy={y} r={r} fill={on ? "#ff6b1a" : "#121a23"} stroke={on ? "#ff6b1a" : "#39d5ff"} strokeWidth={2} vectorEffect="non-scaling-stroke" />
                  {zoomT > 0.5 && (
                    <text x={x} y={y + r * 0.38} textAnchor="middle" fontSize={r * 1.05} fontWeight="700" fill={on ? "#000" : "#eef2f5"}>
                      {i + 1}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* minimapa de Colombia en la vista de zona */}
          <AnimatePresence>
            {!pais && (
              <motion.svg
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                viewBox={PAIS.join(" ")}
                className="pointer-events-none absolute right-3 top-3 w-[22%] min-w-[78px] rounded-xl bg-black/50 p-1.5 backdrop-blur"
                aria-hidden="true"
              >
                <path d={colombiaPath} fill="#121a23" stroke="#39d5ff" strokeWidth={1} vectorEffect="non-scaling-stroke" />
                <rect x={ZONA[0]} y={ZONA[1]} width={ZONA[2]} height={ZONA[3]} fill="#ff6b1a" fillOpacity="0.25" stroke="#ff6b1a" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
              </motion.svg>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setPais((v) => !v)}
            className="absolute bottom-3 left-3 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-ink backdrop-blur transition hover:bg-hivis hover:text-black"
          >
            {pais ? "Acercar a la zona de obras" : "Ver Colombia completa"}
          </button>
        </div>
        <p className="px-2 pb-1 pt-3 text-sm text-ink/60">Ubicaciones aproximadas · la ruta sigue el orden cronológico · contorno: Natural Earth</p>
      </div>

      <div className="flex flex-col gap-5 lg:col-span-5">
        <ol className="flex flex-wrap gap-2" aria-label="Obras">
          {obras.map((ob, i) => (
            <li key={ob.name}>
              <button
                type="button"
                onClick={() => select(i)}
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
              {photo ? (
                <AnimatePresence mode="wait">
                  <motion.div key={photo.src} className="absolute inset-0" initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                    <SmartImage item={photo} />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <TunnelSection label={`Sección esquemática · ${o.name}`} className="h-full w-full" />
              )}
              <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 text-sm backdrop-blur">{o.tag}</span>
              {photos.length > 1 && (
                <div className="absolute bottom-3 right-3 flex gap-1.5 sm:gap-2">
                  {photos.map((p, k) => (
                    <button
                      key={p.src}
                      type="button"
                      onClick={() => setPhotoIdx(k)}
                      aria-label={`Ver foto ${k + 1}: ${p.alt}`}
                      aria-pressed={photo === p}
                      className={`h-9 w-12 overflow-hidden rounded-lg ring-2 transition sm:h-12 sm:w-16 ${photo === p ? "ring-hivis" : "ring-white/30 opacity-75 hover:opacity-100"}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={asset(p.src.replace(".webp", "-sm.webp"))} alt="" className="h-full w-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="p-7">
              <p className="tnum text-sm text-hivis">{o.period}</p>
              <h4 className="display mt-2 text-3xl font-extrabold md:text-4xl">{o.name.replace(/ (\S{1,3})$/, "\u00a0$1")}</h4>
              <p className="mt-1 text-[15px] text-ink/70">{o.place}</p>
              <p className="mt-4 text-lg leading-relaxed text-ink/90">{o.text}</p>
              {photo && <p className="mt-3 text-sm text-ink/55">Foto: {photo.credit}</p>}

              <div role="tablist" aria-label={`Detalle de ${o.name}`} className="mt-6 flex gap-1 rounded-full bg-surface-3 p-1">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === t.id}
                    onClick={() => setTab(t.id)}
                    className={`relative flex-1 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${tab === t.id ? "text-black" : "text-ink/80 hover:text-ink"}`}
                  >
                    {tab === t.id && <motion.span layoutId="obra-tab" className="absolute inset-0 rounded-full bg-hivis" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                    <span className="relative">{t.label}</span>
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={o.name + tab} role="tabpanel" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="mt-5">
                  {tab === "valor" ? (
                    <p className="text-lg leading-relaxed text-ink/95">{o.valor}</p>
                  ) : (
                    <ul className="space-y-2.5">
                      {(tab === "aportes" ? o.aportes : o.innovacion).map((x) => (
                        <li key={x} className="flex gap-3 text-base leading-relaxed text-ink/90">
                          <span className={`mt-2 h-1.5 w-4 shrink-0 rounded-full ${tab === "aportes" ? "bg-hivis" : "bg-signal"}`} aria-hidden="true" />
                          {x}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}
