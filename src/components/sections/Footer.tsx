import { media, generatedMedia } from "@/content/media";
import { site } from "@/content/profile";

/** Cierre del sitio con créditos generados automáticamente desde media.ts. */
export function Footer() {
  const credits = Object.values(media);
  return (
    <footer className="bg-black pt-24">
      <div className="wrap">
        <p className="display text-[clamp(3rem,11vw,11rem)] font-extrabold leading-[0.9]">Juan De León</p>
        <p className="mt-6 max-w-[60ch] text-lg text-ink/80">{site.role}</p>

        <details className="mt-16 rounded-2xl bg-surface p-6">
          <summary className="cursor-pointer text-lg font-semibold">Créditos de imágenes y recursos ({credits.length + generatedMedia.length})</summary>
          <ul className="mt-6 grid gap-3 text-[15px] text-ink/80 md:grid-cols-2">
            {credits.map((m) => (
              <li key={m.src}>
                {m.alt} — {m.credit} ·{" "}
                <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">
                  {m.license}
                </a>
              </li>
            ))}
            {generatedMedia.map((g) => (
              <li key={g.title}>
                {g.title} — {g.note}
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-12 flex flex-wrap justify-between gap-4 pb-10 text-sm text-ink/60">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>Hecho con Next.js, Three.js, GSAP y Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
