/** Encabezado de sección: abscisa del túnel + título + entrada opcional. */
export function SectionHeading({ chainage, title, lead, id }: { chainage: string; title: string; lead?: string; id?: string }) {
  return (
    <header className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12">
      <p data-reveal className="tnum text-sm text-hivis md:col-span-2 md:pt-4">
        {chainage}
      </p>
      <div className="md:col-span-10">
        <h2 id={id} data-reveal className="display max-w-[16ch] text-[clamp(2.5rem,6.4vw,6.5rem)] font-extrabold">
          {title}
        </h2>
        {lead && (
          <p data-reveal className="mt-6 max-w-[60ch] text-lg leading-relaxed text-ink/85 md:text-xl">
            {lead}
          </p>
        )}
      </div>
    </header>
  );
}
