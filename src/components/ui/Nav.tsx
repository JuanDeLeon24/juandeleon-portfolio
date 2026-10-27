"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { scrollToId } from "./SmoothScroll";

const links = [
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "trayectoria", label: "Trayectoria" },
  { id: "el-condor", label: "El Cóndor" },
  { id: "proyectos", label: "Proyectos" },
  { id: "ia", label: "IA" },
  { id: "obras", label: "Obras" },
];

/** Longitud simbólica del recorrido, expresada como abscisa de túnel. */
const TOTAL_M = 9730;

export const chainage = (m: number) => {
  const km = Math.floor(m / 1000);
  const rest = Math.round(m % 1000).toString().padStart(3, "0");
  return `K${km}+${rest}`;
};

export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [k, setK] = useState("K0+000");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setK(chainage(v * TOTAL_M));
    setScrolled(v > 0.01);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className={`transition-colors duration-500 ${scrolled ? "glass" : ""}`}>
        <nav aria-label="Principal" className="wrap flex h-16 items-center justify-between gap-6">
          <a href="#inicio" onClick={(e) => { e.preventDefault(); go("inicio"); }} className="display text-lg font-extrabold tracking-tight">
            Juan De León
          </a>
          <ul className="hidden items-center gap-7 text-[15px] text-ink/80 lg:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id); }} className="transition-colors hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            <span className="tnum hidden text-sm text-signal sm:inline" title="Abscisa del recorrido por la página" aria-hidden="true">
              {k}
            </span>
            <a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); go("contacto"); }}
              className="hidden rounded-full bg-hivis px-5 py-2 text-[15px] font-semibold text-black transition-transform hover:scale-[1.04] active:scale-95 sm:inline-block"
            >
              Contactarme
            </a>
            <button
              type="button"
              className="relative h-10 w-10 lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`absolute left-2 right-2 top-[15px] h-0.5 bg-ink transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute left-2 right-2 top-[25px] h-0.5 bg-ink transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </nav>
        <motion.div style={{ scaleX: progress }} className="h-[3px] origin-left bg-hivis" />
      </div>

      {open && (
        <motion.div
          id="menu-movil"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 top-[67px] z-40 bg-ground/95 backdrop-blur-xl lg:hidden"
        >
          <ul className="wrap flex flex-col gap-2 pt-10">
            {[...links, { id: "contacto", label: "Contacto" }].map((l, i) => (
              <motion.li key={l.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
                <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); go(l.id); }} className="display block py-2 text-4xl font-extrabold">
                  {l.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}
