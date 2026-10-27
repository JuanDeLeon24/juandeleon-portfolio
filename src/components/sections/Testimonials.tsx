"use client";
import { motion } from "framer-motion";
import { referencias } from "@/content/profile";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const digits = (phone: string) => phone.replace(/\D/g, "");
const initials = (name: string) =>
  name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** Contactos de referencia: jefes y compañeros con su cargo y teléfono. */
export function Testimonials() {
  return (
    <Reveal as="section" id="testimonios" aria-labelledby="test-t" className="py-32 md:py-48">
      <div className="wrap">
        <SectionHeading id="test-t" chainage="K8+900 · Referencias" title="Lo que dicen quienes trabajan conmigo" lead="Cuatro espacios reservados para jefes y compañeros." />

        <ul className="grid gap-5 md:grid-cols-2">
          {referencias.map((r, i) => (
            <motion.li key={r.name} data-reveal whileHover={{ y: -5 }} className={`flex flex-col gap-6 rounded-[32px] p-8 md:p-10 ${i === 0 ? "bg-navy" : "neo"}`}>
              <div className="flex items-center gap-5">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-hivis text-xl font-bold text-black" aria-hidden="true">
                  {initials(r.name)}
                </span>
                <div className="min-w-0">
                  <h3 className="display text-2xl font-bold leading-tight">{r.name}</h3>
                  <p className="mt-1 text-base text-signal">{r.role}</p>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-3">
                <a href={`tel:+${digits(r.phone)}`} className="tnum rounded-full bg-black/30 px-5 py-2.5 text-base font-medium transition hover:bg-white/10" aria-label={`Llamar a ${r.name}: ${r.phone}`}>
                  {r.phone}
                </a>
                <a
                  href={`https://wa.me/${digits(r.phone)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-hivis px-5 py-2.5 text-base font-semibold text-black transition hover:scale-105"
                  aria-label={`Escribir por WhatsApp a ${r.name}`}
                >
                  WhatsApp
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
