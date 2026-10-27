/**
 * Reglas de jornada del personal de túneles (las mismas que aplica el
 * Aprobador de jornadas). Todo se maneja en minutos desde la medianoche.
 */

export type ShiftId = "dia" | "diaRev" | "noche" | "nocheRev" | "domAm" | "domPm";
export type DayType = "lv" | "sab" | "dom";

export const shifts: Record<ShiftId, { label: string; start: number; end: number; breakStart: number; breakEnd: number }> = {
  dia: { label: "Día túnel · 07:00–18:00", start: 7 * 60, end: 18 * 60, breakStart: 12 * 60, breakEnd: 13 * 60 + 30 },
  diaRev: { label: "Día revestimiento · 06:00–18:00", start: 6 * 60, end: 18 * 60, breakStart: 12 * 60, breakEnd: 13 * 60 + 30 },
  noche: { label: "Noche túnel · 18:00–05:00", start: 18 * 60, end: 29 * 60, breakStart: 24 * 60, breakEnd: 25 * 60 + 30 },
  nocheRev: { label: "Noche revestimiento · 18:00–06:00", start: 18 * 60, end: 30 * 60, breakStart: 24 * 60, breakEnd: 25 * 60 + 30 },
  domAm: { label: "Domingo/festivo · 06:00–14:00", start: 6 * 60, end: 14 * 60, breakStart: 12 * 60, breakEnd: 13 * 60 },
  domPm: { label: "Domingo/festivo · 16:00–00:00", start: 16 * 60, end: 24 * 60, breakStart: 20 * 60, breakEnd: 21 * 60 },
};

export const dayTypes: Record<DayType, { label: string; base: number }> = {
  lv: { label: "Lunes a viernes", base: 7.5 },
  sab: { label: "Sábado", base: 4.5 },
  dom: { label: "Domingo o festivo", base: 7 },
};

export const LATE_TOLERANCE = 35;

export const parseHHMM = (v: string) => {
  const [h, m] = v.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
};

export const fmt = (mins: number) => {
  const m = ((mins % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

export const fmtHours = (h: number) => h.toLocaleString("es-CO", { maximumFractionDigits: 2 });

/** 0–15 min → en punto · 16–35 → y media · 36–59 → hora siguiente. */
export function roundExit(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (m <= 15) return h * 60;
  if (m <= 35) return h * 60 + 30;
  return (h + 1) * 60;
}

export type JornadaResult = {
  approvedStart: number;
  roundedExit: number;
  hours: number;
  extras: number;
  nocturno: boolean;
  action: "Aprobar" | "Aprobar (verificar)" | "Revisar";
  notes: string[];
};

export function computeJornada(shiftId: ShiftId, day: DayType, entry: string, exit: string): JornadaResult {
  const s = shifts[shiftId];
  const notes: string[] = [];
  let inM = parseHHMM(entry);
  let outM = parseHHMM(exit);

  // Turnos nocturnos: la entrada es de la tarde y la salida de la madrugada siguiente.
  if (s.end > 1440 && inM < 12 * 60) inM += 1440;
  if (outM <= inM) outM += 1440;
  const nocturno = outM >= 1440;

  let action: JornadaResult["action"] = "Aprobar";
  const late = inM - s.start;
  let approvedStart = s.start;
  if (late > LATE_TOLERANCE) {
    approvedStart = Math.ceil(inM / 30) * 30;
    action = "Revisar";
    notes.push(`Entró ${late} min tarde: supera la tolerancia de ${LATE_TOLERANCE} min, se aprueba desde ${fmt(approvedStart)}.`);
  } else if (late > 0) {
    notes.push(`Entró ${late} min tarde: dentro de la tolerancia, se compensa con el receso y se aprueba completo.`);
  } else {
    notes.push("Entrada a tiempo.");
  }

  const roundedExit = roundExit(outM);
  notes.push(`Salida marcada ${fmt(outM)} → redondeada a ${fmt(roundedExit)}.`);
  if (roundedExit > s.end) {
    notes.push(`Se quedó después del fin del turno (${fmt(s.end)}): el tiempo adicional cuenta como extra.`);
    if (action === "Aprobar") action = "Aprobar (verificar)";
  }
  if (roundedExit < s.end - 30) {
    notes.push(`Salió antes del fin del turno (${fmt(s.end)}).`);
    action = "Revisar";
  }

  const overlap = Math.max(0, Math.min(roundedExit, s.breakEnd) - Math.max(approvedStart, s.breakStart));
  const worked = Math.max(0, roundedExit - approvedStart - overlap) / 60;
  const base = dayTypes[day].base;
  const extras = Math.max(0, worked - base);
  if (day === "dom") notes.push("Domingo o festivo: las 7 h se liquidan aparte; lo que exceda es extra.");
  if (worked > 12) {
    notes.push("Más de 12 horas: la plataforma exige confirmar las horas finales antes de aprobar.");
    action = "Revisar";
  }

  return { approvedStart, roundedExit, hours: worked, extras, nocturno, action, notes };
}
