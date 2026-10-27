"use client";
import { useEffect, useRef } from "react";

/**
 * Fondo vivo de todo el sitio: pistas de circuito impreso que salen de
 * "chips" y terminan conectadas a fragmentos de planos (secciones de túnel,
 * cotas, ejes y abscisas). Por las pistas viajan pulsos de señal y en el aire
 * flotan partículas. El cursor ilumina las pistas cercanas y el scroll mueve
 * las capas a distinta velocidad (parallax).
 *
 * Las pistas y planos se dibujan una vez en un lienzo fuera de pantalla; en
 * cada cuadro solo se pintan pulsos y partículas.
 */

type Pt = { x: number; y: number };
type Trace = { pts: Pt[]; len: number; seg: number[]; color: string };
type Pulse = { t: number; trace: number; speed: number; color: string };
type Particle = { x: number; y: number; z: number; vx: number; vy: number };

const CELL = 28;
const CYAN = "57,213,255";
const ORANGE = "255,107,26";
const BLUE = "120,160,200";

function rand(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export default function CircuitBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    let FIELD_H = 0; // el campo es más alto que la pantalla y se repite al hacer scroll
    let layer: HTMLCanvasElement;
    let traces: Trace[] = [];
    let pulses: Pulse[] = [];
    let particles: Particle[] = [];
    const mouse = { x: -9999, y: -9999 };

    const build = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      FIELD_H = Math.ceil((H * 2) / CELL) * CELL;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;

      layer = document.createElement("canvas");
      layer.width = W * dpr;
      layer.height = FIELD_H * dpr;
      const g = layer.getContext("2d")!;
      g.scale(dpr, dpr);

      const r = rand(1218); // bodega 1218 · Almacén El Toyo
      const cols = Math.ceil(W / CELL);
      const rows = FIELD_H / CELL;
      const small = W < 768;

      // Retícula de plano muy tenue
      g.strokeStyle = `rgba(${BLUE},0.035)`;
      g.lineWidth = 1;
      for (let x = 0; x <= W; x += CELL * 4) {
        g.beginPath();
        g.moveTo(x + 0.5, 0);
        g.lineTo(x + 0.5, FIELD_H);
        g.stroke();
      }
      for (let y = 0; y <= FIELD_H; y += CELL * 4) {
        g.beginPath();
        g.moveTo(0, y + 0.5);
        g.lineTo(W, y + 0.5);
        g.stroke();
      }

      // Fragmentos de plano: secciones de túnel con cotas y ejes
      const drawings: Pt[] = [];
      const nDraw = small ? 3 : 6;
      for (let i = 0; i < nDraw; i++) {
        const cx = (0.12 + r() * 0.76) * W;
        const cy = ((i + 0.5) / nDraw) * FIELD_H + (r() - 0.5) * CELL * 6;
        const R = CELL * (2.2 + r() * 2);
        drawings.push({ x: cx, y: cy });
        drawBlueprint(g, cx, cy, R, r, i);
      }

      // Chips (componentes) de donde salen las pistas
      const chips: Pt[] = [];
      const nChips = small ? 4 : 9;
      for (let i = 0; i < nChips; i++) {
        const x = Math.round(((0.05 + r() * 0.9) * W) / CELL) * CELL;
        const y = Math.round((r() * FIELD_H) / CELL) * CELL;
        chips.push({ x, y });
        drawChip(g, x, y, r);
      }

      // Pistas: caminos ortogonales con quiebres a 45° hacia un plano o un chip
      traces = [];
      const nTraces = small ? 26 : 64;
      for (let i = 0; i < nTraces; i++) {
        const from = chips[i % chips.length];
        const target = r() < 0.65 ? drawings[Math.floor(r() * drawings.length)] : chips[Math.floor(r() * chips.length)];
        const pts = route(from, target, r, cols, rows);
        if (pts.length < 2) continue;
        const seg: number[] = [];
        let len = 0;
        for (let k = 1; k < pts.length; k++) {
          const d = Math.hypot(pts[k].x - pts[k - 1].x, pts[k].y - pts[k - 1].y);
          seg.push(d);
          len += d;
        }
        const color = r() < 0.18 ? ORANGE : CYAN;
        traces.push({ pts, len, seg, color });

        g.strokeStyle = `rgba(${color},${color === ORANGE ? 0.16 : 0.11})`;
        g.lineWidth = r() < 0.25 ? 2 : 1.2;
        g.lineJoin = "round";
        g.beginPath();
        g.moveTo(pts[0].x, pts[0].y);
        pts.slice(1).forEach((p) => g.lineTo(p.x, p.y));
        g.stroke();
        // pads y vías
        const end = pts[pts.length - 1];
        [pts[0], end].forEach((p, k) => {
          g.beginPath();
          g.arc(p.x, p.y, k ? 3.2 : 2.4, 0, Math.PI * 2);
          g.fillStyle = "#05070a";
          g.fill();
          g.strokeStyle = `rgba(${color},0.35)`;
          g.lineWidth = 1.2;
          g.stroke();
        });
      }

      pulses = Array.from({ length: small ? 14 : 34 }, () => newPulse(r));
      particles = Array.from({ length: small ? 40 : 90 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        z: 0.3 + Math.random() * 0.7,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -0.04 - Math.random() * 0.12,
      }));
    };

    const newPulse = (r: () => number = Math.random): Pulse => {
      const trace = Math.floor(r() * traces.length);
      return { trace, t: r(), speed: 0.0012 + r() * 0.0028, color: traces[trace]?.color ?? CYAN };
    };

    const pointAt = (tr: Trace, t: number): Pt => {
      let d = t * tr.len;
      for (let k = 0; k < tr.seg.length; k++) {
        if (d <= tr.seg[k]) {
          const a = tr.pts[k];
          const b = tr.pts[k + 1];
          const f = d / tr.seg[k];
          return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
        }
        d -= tr.seg[k];
      }
      return tr.pts[tr.pts.length - 1];
    };

    let raf = 0;
    let running = true;
    const frame = () => {
      if (running) raf = requestAnimationFrame(frame);
      const scroll = window.scrollY;
      const off = -((scroll * 0.18) % FIELD_H);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      // capa estática repetida verticalmente (parallax lento)
      ctx.drawImage(layer, 0, off, W, FIELD_H);
      if (off + FIELD_H < H) ctx.drawImage(layer, 0, off + FIELD_H, W, FIELD_H);

      // brillo de pistas cerca del cursor
      if (mouse.x > -999) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        grad.addColorStop(0, `rgba(${CYAN},0.10)`);
        grad.addColorStop(1, `rgba(${CYAN},0)`);
        ctx.fillStyle = grad;
        ctx.fillRect(mouse.x - 220, mouse.y - 220, 440, 440);
      }

      // pulsos de señal
      ctx.globalCompositeOperation = "lighter";
      for (const p of pulses) {
        const tr = traces[p.trace];
        if (!tr) continue;
        if (!reduce) p.t += p.speed * (1 + Math.min(Math.abs(velocity), 40) / 10);
        if (p.t > 1) Object.assign(p, newPulse());
        for (const shift of [0, FIELD_H]) {
          const pt = pointAt(tr, Math.min(p.t, 1));
          const y = pt.y + off + shift;
          if (y < -20 || y > H + 20) continue;
          const near = Math.hypot(pt.x - mouse.x, y - mouse.y) < 200 ? 1.8 : 1;
          const tail = pointAt(tr, Math.max(0, p.t - 0.035));
          const lg = ctx.createLinearGradient(tail.x, tail.y + off + shift, pt.x, y);
          lg.addColorStop(0, `rgba(${p.color},0)`);
          lg.addColorStop(1, `rgba(${p.color},${0.75 * near})`);
          ctx.strokeStyle = lg;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(tail.x, tail.y + off + shift);
          ctx.lineTo(pt.x, y);
          ctx.stroke();
          ctx.fillStyle = `rgba(${p.color},${0.9 * Math.min(near, 1.2)})`;
          ctx.beginPath();
          ctx.arc(pt.x, y, 2.2 * near, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // partículas (polvo de obra / datos)
      for (const q of particles) {
        if (!reduce) {
          q.x += q.vx;
          q.y += q.vy - velocity * 0.02 * q.z;
          const dx = q.x - mouse.x;
          const dy = q.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 120 * 120) {
            q.x += (dx / Math.sqrt(d2 + 1)) * 0.8;
            q.y += (dy / Math.sqrt(d2 + 1)) * 0.8;
          }
          if (q.y < -10) q.y = H + 10;
          if (q.y > H + 10) q.y = -10;
          if (q.x < -10) q.x = W + 10;
          if (q.x > W + 10) q.x = -10;
        }
        ctx.fillStyle = `rgba(${q.z > 0.85 ? ORANGE : CYAN},${0.25 + q.z * 0.45})`;
        ctx.beginPath();
        ctx.arc(q.x, q.y, q.z * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      // conexiones entre partículas cercanas
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 90) {
            ctx.strokeStyle = `rgba(${CYAN},${(1 - d / 90) * 0.16})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalCompositeOperation = "source-over";
      velocity *= 0.9;
    };

    let lastScroll = window.scrollY;
    let velocity = 0;
    const onScroll = () => {
      velocity = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      if (reduce) frame();
    };
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    let resizeTimer = 0;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        build();
        if (reduce) frame();
      }, 150);
    };
    const onVisibility = () => {
      if (reduce) return;
      running = !document.hidden;
      cancelAnimationFrame(raf);
      if (running) frame();
    };

    build();
    if (reduce) {
      running = false;
      frame();
    } else frame();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" />;
}

/** Camino tipo PCB: tramos horizontales/verticales unidos por quiebres a 45°. */
function route(a: Pt, b: Pt, r: () => number, cols: number, rows: number): Pt[] {
  const snap = (v: number) => Math.round(v / CELL) * CELL;
  const pts: Pt[] = [{ x: snap(a.x), y: snap(a.y) }];
  let { x, y } = pts[0];
  const tx = snap(b.x + (r() - 0.5) * CELL * 4);
  const ty = snap(b.y + (r() - 0.5) * CELL * 4);
  let guard = 0;
  while ((x !== tx || y !== ty) && guard++ < 12) {
    const dx = tx - x;
    const dy = ty - y;
    if (r() < 0.5 && dx !== 0) {
      x += Math.sign(dx) * Math.min(Math.abs(dx), CELL * (2 + Math.floor(r() * 8)));
    } else if (dy !== 0) {
      y += Math.sign(dy) * Math.min(Math.abs(dy), CELL * (2 + Math.floor(r() * 8)));
    } else {
      x = tx;
    }
    // diagonal corta antes del quiebre
    const last = pts[pts.length - 1];
    if (last.x !== x && last.y !== y) pts.push({ x, y: last.y });
    const d = Math.min(Math.abs(x - last.x), Math.abs(y - last.y), CELL);
    if (d > 0 && r() < 0.6) {
      pts.push({ x: x - Math.sign(x - last.x) * d, y: y - Math.sign(y - last.y) * d });
    }
    pts.push({ x, y });
  }
  return pts.filter((p) => p.x >= -CELL && p.x <= cols * CELL + CELL && p.y >= 0 && p.y <= rows * CELL);
}

function drawChip(g: CanvasRenderingContext2D, x: number, y: number, r: () => number) {
  const w = CELL * (1.5 + Math.floor(r() * 2));
  const h = CELL * 1.5;
  g.fillStyle = "rgba(18,26,35,0.85)";
  g.strokeStyle = `rgba(${CYAN},0.22)`;
  g.lineWidth = 1;
  g.fillRect(x - w / 2, y - h / 2, w, h);
  g.strokeRect(x - w / 2 + 0.5, y - h / 2 + 0.5, w - 1, h - 1);
  g.strokeStyle = `rgba(${BLUE},0.25)`;
  for (let px = x - w / 2 + 6; px < x + w / 2 - 3; px += 7) {
    g.beginPath();
    g.moveTo(px, y - h / 2);
    g.lineTo(px, y - h / 2 - 5);
    g.moveTo(px, y + h / 2);
    g.lineTo(px, y + h / 2 + 5);
    g.stroke();
  }
  g.beginPath();
  g.arc(x - w / 2 + 6, y - h / 2 + 6, 1.6, 0, Math.PI * 2);
  g.fillStyle = `rgba(${ORANGE},0.5)`;
  g.fill();
}

/** Fragmento de plano: sección en herradura, cotas, eje y abscisa. */
function drawBlueprint(g: CanvasRenderingContext2D, cx: number, cy: number, R: number, r: () => number, i: number) {
  const wall = R * 0.45;
  g.save();
  g.lineWidth = 1.2;
  g.strokeStyle = `rgba(${BLUE},0.22)`;
  // excavación
  g.beginPath();
  g.moveTo(cx - R, cy + wall);
  g.lineTo(cx - R, cy);
  g.arc(cx, cy, R, Math.PI, 0);
  g.lineTo(cx + R, cy + wall);
  g.closePath();
  g.stroke();
  // revestimiento
  g.setLineDash([5, 5]);
  g.strokeStyle = `rgba(${CYAN},0.2)`;
  g.beginPath();
  g.moveTo(cx - R * 0.86, cy + wall);
  g.lineTo(cx - R * 0.86, cy);
  g.arc(cx, cy, R * 0.86, Math.PI, 0);
  g.lineTo(cx + R * 0.86, cy + wall);
  g.stroke();
  g.setLineDash([]);
  // pernos radiales
  g.strokeStyle = `rgba(${BLUE},0.16)`;
  for (let k = 0; k <= 8; k++) {
    const a = Math.PI + (k * Math.PI) / 8;
    g.beginPath();
    g.moveTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
    g.lineTo(cx + Math.cos(a) * R * 1.28, cy + Math.sin(a) * R * 1.28);
    g.stroke();
  }
  // eje vertical
  g.setLineDash([12, 4, 2, 4]);
  g.strokeStyle = `rgba(${ORANGE},0.2)`;
  g.beginPath();
  g.moveTo(cx, cy - R * 1.45);
  g.lineTo(cx, cy + wall + R * 0.3);
  g.stroke();
  g.setLineDash([]);
  // cota horizontal
  const yy = cy + wall + R * 0.35;
  g.strokeStyle = `rgba(${BLUE},0.24)`;
  g.beginPath();
  g.moveTo(cx - R, yy);
  g.lineTo(cx + R, yy);
  [cx - R, cx + R].forEach((x) => {
    g.moveTo(x - 4, yy + 4);
    g.lineTo(x + 4, yy - 4);
    g.moveTo(x, yy - 8);
    g.lineTo(x, yy + 4);
  });
  g.stroke();
  g.fillStyle = `rgba(${BLUE},0.4)`;
  g.font = "11px ui-sans-serif, system-ui, sans-serif";
  g.textAlign = "center";
  g.fillText(`${(R / 6).toFixed(2)} m`, cx, yy - 6);
  g.textAlign = "left";
  g.fillStyle = `rgba(${ORANGE},0.42)`;
  const km = Math.floor(r() * 9);
  g.fillText(`K${km}+${String(Math.floor(r() * 1000)).padStart(3, "0")}`, cx + R * 1.1, cy - R * 0.9);
  g.fillStyle = `rgba(${BLUE},0.32)`;
  g.fillText(`SECCIÓN ${String.fromCharCode(65 + i)}-${String.fromCharCode(65 + i)}'`, cx - R, cy - R * 1.25);
  g.restore();
}
