import { impact } from "@/content/profile";
import { Counter } from "../ui/Counter";
import { Reveal } from "../ui/Reveal";

export function Impact() {
  return (
    <Reveal as="section" id="impacto" aria-labelledby="impacto-t" className="bg-hivis py-28 text-black md:py-40">
      <div className="wrap">
        <h2 id="impacto-t" data-reveal className="display max-w-[14ch] text-[clamp(2.5rem,6.4vw,6.5rem)] font-extrabold">
          Impacto medible
        </h2>
        <dl className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {impact.map((m) => (
            <div key={m.label} data-reveal>
              <dd className="display text-[clamp(4rem,6.5vw,6.5rem)] font-extrabold leading-none">
                <Counter value={m.value} suffix={m.suffix} />
              </dd>
              <dt className="mt-4 text-lg font-medium leading-snug">{m.label}</dt>
            </div>
          ))}
        </dl>
        <p data-reveal className="mt-14 max-w-[60ch] text-base">
          Solo cifras verificables. Las horas ahorradas y los procesos optimizados se agregarán cuando estén medidos con datos de obra.
        </p>
      </div>
    </Reveal>
  );
}
