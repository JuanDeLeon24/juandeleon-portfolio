"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { media, obrasGallery, fotosObra } from "@/content/media";
import { obras } from "@/content/profile";
import { SmartImage } from "../ui/SmartImage";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const chapters = [
  { title: "El frente", place: "Frente de excavación", text: "Personas, turnos y maquinaria. Aquí empecé, y aquí se origina cada dato que después se mide." },
  { title: "El plano", place: "Oficina técnica", text: "Secciones, abscisas y cantidades: el idioma que une al campo con la oficina." },
  { title: "La obra", place: "Estructura en ejecución", text: "Concreto, acero y control de calidad. Lo que se registra bien, se puede mejorar." },
  { title: "La vía", place: "Antioquia, Colombia", text: "Túneles y vías 4G que acortan distancias entre regiones y el mar." },
  { title: "La tecnología", place: "Ingeniería electrónica", text: "Código, datos e inteligencia artificial puestos al servicio del frente de obra." },
];

/** Reportaje a pantalla completa: cada imagen se fija y la siguiente la cubre. */
export function Obras() {
  return (
    <section id="obras" aria-labelledby="obras-t" className="relative">
      <Reveal className="wrap pb-16 pt-32 md:pt-48">
        <SectionHeading id="obras-t" chainage="K8+200 · Obras y experiencias" title="Obras y experiencias" lead={fotosObra.length ? "Vías, minería, puentes, asfalto y túneles: fotos reales de las obras donde he trabajado." : "Un recorrido visual por el mundo donde trabajo. Fotos de referencia con licencia libre mientras se cargan las fotos reales de obra."} />
      </Reveal>
      {fotosObra.length > 0
        ? fotosObra.map((f, i) => {
            const o = obras.find((x) => x.name === f.obra);
            return (
              <Chapter
                key={f.src}
                index={i}
                item={f}
                chapter={{ title: f.obra, place: o ? `${o.place} · ${o.period}` : f.obra, text: f.caption ?? o?.text ?? "" }}
              />
            );
          })
        : obrasGallery.map((key, i) => <Chapter key={key} index={i} item={media[key]} chapter={chapters[i]} />)}
    </section>
  );
}

function Chapter({ index, item, chapter }: { index: number; item: (typeof media)[string]; chapter: { title: string; place: string; text: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <div ref={ref} className="relative h-[140svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <ParallaxImage progress={scrollYProgress} item={item} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
        <div className="wrap relative flex h-full flex-col justify-end pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="tnum text-sm text-hivis">
              Capítulo {index + 1} · {chapter.place}
            </p>
            <h3 className="display mt-3 text-[clamp(3rem,9vw,8rem)] font-extrabold">{chapter.title}</h3>
            <p className="mt-4 text-xl leading-relaxed text-ink/90">{chapter.text}</p>
            <p className="mt-6 text-sm text-ink/70">
              Foto: {item.credit} · {item.license}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ParallaxImage({ progress, item }: { progress: MotionValue<number>; item: (typeof media)[string] }) {
  const scale = useTransform(progress, [0, 1], [1.25, 1]);
  const y = useTransform(progress, [0, 1], ["-6%", "6%"]);
  return (
    <motion.div style={{ scale, y }} className="absolute inset-0">
      <SmartImage item={item} sizes="100vw" />
    </motion.div>
  );
}
