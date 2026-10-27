"use client";
import { motion } from "framer-motion";
import { certifications, education, microsoftCerts } from "@/content/profile";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { asset } from "@/lib/asset";

const levelColor: Record<string, string> = {
  Associate: "bg-signal text-black",
  Specialty: "bg-hivis text-black",
  Expert: "bg-ink text-black",
  Fundamentals: "bg-surface-3 text-ink",
  Educator: "bg-navy text-ink",
};

export function Certifications() {
  return (
    <Reveal as="section" id="formacion" aria-labelledby="form-t" className="bg-surface/85 py-32 backdrop-blur-sm md:py-48">
      <div className="wrap">
        <SectionHeading id="form-t" chainage="K9+300 · Formación" title="Formación y certificaciones" lead="Ingeniería, formación técnica del SENA, desarrollo web y once certificaciones de Microsoft." />

        {/* Formación académica */}
        <ul className="grid gap-5 md:grid-cols-3">
          {education.map((e, i) => (
            <li key={e.title} data-reveal className={`relative overflow-hidden rounded-[28px] p-8 md:p-10 ${i === 0 ? "bg-hivis text-black" : "neo"}`}>
              <p className={`text-sm ${i === 0 ? "text-black/70" : "text-signal"}`}>
                {e.kind} · {e.year}
              </p>
              <h3 className={`display mt-4 font-extrabold ${i === 0 ? "text-4xl" : "text-2xl"}`}>{e.title}</h3>
              <p className={`mt-3 text-base ${i === 0 ? "text-black/80" : "text-ink/80"}`}>{e.issuer}</p>
            </li>
          ))}
        </ul>

        {/* Microsoft */}
        <div data-reveal className="mt-16 rounded-[32px] bg-[#0b1220] p-7 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="display text-3xl font-bold md:text-4xl">Certificaciones Microsoft</h3>
            <p className="text-base text-ink/70">Azure · IA · Power Platform · Microsoft 365 · Dynamics</p>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {microsoftCerts.map((c, i) => (
              <motion.li
                key={c.code}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="flex items-center gap-4 rounded-2xl bg-white/[0.04] p-4"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#0078d4] text-[11px] font-bold leading-tight text-white" aria-hidden="true">
                  {c.code}
                </span>
                <span className="min-w-0">
                  <span className="block text-[15px] font-semibold leading-snug">{c.title}</span>
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${levelColor[c.level]}`}>
                    {c.level} · {c.code}
                  </span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Cursos y certificados */}
        <ul className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c) => (
            <li key={c.title} data-reveal className="group relative overflow-hidden rounded-[28px] bg-surface-2 p-7 transition-transform duration-500 hover:-translate-y-1.5">
              <span className="absolute -right-10 -top-10 h-28 w-28 rounded-full border-[10px] border-surface-3 transition-colors duration-500 group-hover:border-hivis/40" aria-hidden="true" />
              <p className="text-sm text-signal">
                {c.kind} · {c.year}
              </p>
              <h3 className="display mt-3 text-xl font-bold leading-snug">{c.title}</h3>
              <p className="mt-3 text-[15px] text-ink/75">{c.issuer}</p>
              {c.file && (
                <a href={asset(c.file)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-semibold text-hivis hover:underline">
                  Ver certificado
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
