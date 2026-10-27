"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { computeJornada, dayTypes, fmt, fmtHours, shifts, type DayType, type ShiftId } from "@/lib/jornada";

const defaults: Record<ShiftId, [string, string]> = {
  dia: ["07:20", "18:40"],
  diaRev: ["06:05", "18:10"],
  noche: ["18:25", "05:20"],
  nocheRev: ["17:55", "06:40"],
  domAm: ["06:10", "14:20"],
  domPm: ["16:00", "00:10"],
};

const actionColor: Record<string, string> = {
  Aprobar: "bg-emerald-400 text-black",
  "Aprobar (verificar)": "bg-signal text-black",
  Revisar: "bg-hivis text-black",
};

/**
 * La pieza interactiva del sitio: aplica las reglas reales de turnos de túnel
 * (tolerancia de llegada, redondeo de salida, recesos, extras) a una jornada.
 */
export function JornadaCalculator() {
  const [shift, setShift] = useState<ShiftId>("dia");
  const [day, setDay] = useState<DayType>("lv");
  const [entry, setEntry] = useState(defaults.dia[0]);
  const [exit, setExit] = useState(defaults.dia[1]);

  const r = useMemo(() => computeJornada(shift, day, entry, exit), [shift, day, entry, exit]);

  const pickShift = (id: ShiftId) => {
    setShift(id);
    setEntry(defaults[id][0]);
    setExit(defaults[id][1]);
    if (id.startsWith("dom")) setDay("dom");
    else if (day === "dom") setDay("lv");
  };

  const field = "w-full rounded-2xl bg-surface-3 px-4 py-3.5 text-lg text-ink tnum outline-none transition focus:ring-2 focus:ring-signal";

  return (
    <div className="glass grid overflow-hidden rounded-[32px] lg:grid-cols-2">
      <form className="space-y-6 p-7 md:p-10" onSubmit={(e) => e.preventDefault()} aria-describedby="calc-ayuda">
        <p id="calc-ayuda" className="text-base leading-relaxed text-ink/80">
          Escribe una marcación y mira cómo la herramienta decide. Son las mismas reglas que usa el Aprobador de jornadas en producción.
        </p>
        <label className="block">
          <span className="mb-2 block text-sm text-ink/80">Turno programado</span>
          <select className={field} value={shift} onChange={(e) => pickShift(e.target.value as ShiftId)}>
            {Object.entries(shifts).map(([id, s]) => (
              <option key={id} value={id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-ink/80">Día</span>
          <select className={field} value={day} onChange={(e) => setDay(e.target.value as DayType)}>
            {Object.entries(dayTypes).map(([id, d]) => (
              <option key={id} value={id}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm text-ink/80">Entrada marcada</span>
            <input type="time" className={field} value={entry} onChange={(e) => setEntry(e.target.value)} required />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-ink/80">Salida marcada</span>
            <input type="time" className={field} value={exit} onChange={(e) => setExit(e.target.value)} required />
          </label>
        </div>
      </form>

      <div className="bg-surface/80 p-7 md:p-10" aria-live="polite">
        <div className="flex items-center justify-between gap-4">
          <h4 className="display text-2xl font-bold">Resultado</h4>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={r.action}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${actionColor[r.action]}`}
            >
              {r.action}
            </motion.span>
          </AnimatePresence>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-7">
          <Stat label="Se aprueba desde" value={fmt(r.approvedStart)} />
          <Stat label="Salida redondeada" value={fmt(r.roundedExit)} />
          <Stat label="Horas a aprobar" value={`${fmtHours(r.hours)} h`} big />
          <Stat label="Horas extras" value={`${fmtHours(r.extras)} h`} big accent />
          <Stat label="Nocturno" value={r.nocturno ? "Sí" : "No"} />
          <Stat label="Base ordinaria" value={`${fmtHours(dayTypes[day].base)} h`} />
        </dl>
        <ul className="mt-8 space-y-2.5 text-[15px] leading-relaxed text-ink/85">
          {r.notes.map((n) => (
            <li key={n} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Stat({ label, value, big, accent }: { label: string; value: string; big?: boolean; accent?: boolean }) {
  return (
    <div>
      <dt className="text-sm text-ink/70">{label}</dt>
      <motion.dd
        key={value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className={`tnum mt-1 font-display font-bold ${big ? "text-4xl md:text-5xl" : "text-2xl"} ${accent ? "text-hivis" : "text-ink"}`}
      >
        {value}
      </motion.dd>
    </div>
  );
}
