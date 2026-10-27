import { testimonials } from "@/content/profile";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Testimonials() {
  const [first, ...rest] = testimonials;
  return (
    <Reveal as="section" id="testimonios" aria-labelledby="test-t" className="py-32 md:py-48">
      <div className="wrap">
        <SectionHeading id="test-t" chainage="K8+900 · Testimonios" title="Lo que dicen quienes trabajan conmigo" />
        <div className="grid gap-6 lg:grid-cols-12">
          <figure data-reveal className="rounded-[32px] bg-navy p-8 md:p-12 lg:col-span-7">
            <blockquote className="text-[clamp(1.4rem,2.4vw,2.1rem)] font-medium leading-snug">“{first.quote}”</blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-hivis text-xl font-bold text-black" aria-hidden="true">
                {first.relation[0]}
              </span>
              <span>
                <span className="block text-lg font-semibold">{first.name}</span>
                <span className="block text-ink/75">{first.role}</span>
              </span>
            </figcaption>
          </figure>
          <div className="grid gap-6 lg:col-span-5">
            {rest.map((t) => (
              <figure key={t.relation} data-reveal className="neo rounded-[28px] p-7">
                <blockquote className="text-lg leading-relaxed text-ink/90">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-[15px]">
                  <span className="font-semibold">{t.name}</span> <span className="text-ink/70">· {t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        {testimonials.some((t) => t.placeholder) && (
          <p className="mt-8 text-base text-ink/70">Estructura lista: reemplaza los textos en src/content/profile.ts con testimonios autorizados.</p>
        )}
      </div>
    </Reveal>
  );
}
