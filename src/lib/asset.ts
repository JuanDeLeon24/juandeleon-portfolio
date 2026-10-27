/** Antepone el basePath de GitHub Pages a rutas locales de /public. */
export const asset = (src: string) =>
  src.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}` : src;
