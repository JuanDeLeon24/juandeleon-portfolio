import { certifications } from "@/content/profile";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { asset } from "@/lib/asset";

export function Certifications() {
  return (
    <Reveal as="section" id="formacion" aria-labelledby="form-t" className="bg-surface/85 py-32 backdrop-blur-sm md:py-48">
      <div className="wrap">
        <SectionHeading id="form-t" chainage="K9+300 · Formación" title="Formación y certificaciones" />
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <li key={c.title} data-reveal className="group relative overflow-hidden rounded-[28px] bg-surface-2 p-8 transition-transform duration-500 hover:-translate-y-1.5">
              <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full border-[10px] border-surface-3 transition-colors duration-500 group-hover:border-hivis/40" aria-hidden="true" />
              <p className="text-sm text-signal">{c.kind}</p>
              <h3 className="display mt-4 text-2xl font-bold">{c.title}</h3>
              <p className="mt-3 text-base text-ink/80">
                {c.issuer} · {c.year}
              </p>
              {c.file && (
                <a href={asset(c.file)} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block font-semibold text-hivis hover:underline">
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
