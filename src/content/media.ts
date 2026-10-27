/**
 * Registro de recursos multimedia. Cada imagen o video del sitio se declara
 * aquí con su fuente y licencia; el pie de página genera los créditos
 * automáticamente a partir de esta lista.
 *
 * Para usar fotos propias: copia el archivo a /public/media y cambia `src`
 * por "/media/archivo.jpg", con `credit: "Archivo personal"` y
 * `license: "Todos los derechos reservados"`.
 *
 * Las imágenes de El Cóndor y de terceros con derechos reservados NO se
 * copian: solo se usan fotos propias o con licencia libre.
 */

export type MediaItem = {
  src: string;
  alt: string;
  credit: string;
  license: string;
  sourceUrl: string;
  /** usado en la galería de obras */
  caption?: string;
};

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const media: Record<string, MediaItem> = {
  site: {
    src: unsplash("1541888946425-d81bb19240f5"),
    alt: "Obra civil en construcción con estructura y maquinaria",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
    caption: "La obra como sistema: personas, máquinas y datos moviéndose al mismo ritmo.",
  },
  crew: {
    src: unsplash("1504307651254-35680f356dfd"),
    alt: "Trabajadores de construcción con casco en el frente de obra",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
    caption: "El frente de obra, donde empezó todo.",
  },
  blueprint: {
    src: unsplash("1503387762-592deb58ef4e"),
    alt: "Planos técnicos sobre una mesa de trabajo",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
    caption: "Lectura de planos: el idioma común entre campo y oficina.",
  },
  road: {
    src: unsplash("1469854523086-cc02fe5d8800"),
    alt: "Carretera que atraviesa un paisaje montañoso",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
    caption: "Vías que conectan regiones: la razón de cada túnel y cada puente.",
  },
  engineer: {
    src: unsplash("1581092160562-40aa08e78837"),
    alt: "Ingeniero trabajando con equipos tecnológicos",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
    caption: "Ingeniería electrónica aplicada a problemas de obra.",
  },
  circuit: {
    src: unsplash("1518770660439-4636190af475"),
    alt: "Primer plano de una placa de circuito electrónico",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
  },
  excel: {
    src: unsplash("1460925895917-afdab827c52f", 1200),
    alt: "Portátil con hojas de cálculo y gráficos",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
  },
  code: {
    src: unsplash("1555949963-aa79dcee981c", 1200),
    alt: "Código fuente en la pantalla de un editor",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
  },
  ai: {
    src: unsplash("1677442136019-21780ecad995", 1200),
    alt: "Representación visual abstracta de inteligencia artificial",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
  },
  dashboard: {
    src: unsplash("1551288049-bebda4e38f71", 1200),
    alt: "Tablero de análisis de datos con gráficos",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
  },
  documents: {
    src: unsplash("1586281380349-632531db7ed4", 1200),
    alt: "Documentos y reportes sobre un escritorio",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
  },
  lovelyHome: {
    src: "/media/lovely-home.webp",
    alt: "Página de inicio de la tienda Lovely · LV Accesorios",
    credit: "Captura del proyecto Lovely (Juan De León)",
    license: "Proyecto propio",
    sourceUrl: "https://juandeleon24.github.io/lovely-web/",
  },
  lovelyTienda: {
    src: "/media/lovely-tienda.webp",
    alt: "Catálogo de la tienda Lovely con filtros",
    credit: "Captura del proyecto Lovely (Juan De León)",
    license: "Proyecto propio",
    sourceUrl: "https://juandeleon24.github.io/lovely-web/",
  },
  lovelyMobile: {
    src: "/media/lovely-mobile.webp",
    alt: "Tienda Lovely vista en un celular",
    credit: "Captura del proyecto Lovely (Juan De León)",
    license: "Proyecto propio",
    sourceUrl: "https://juandeleon24.github.io/lovely-web/",
  },
};

/**
 * Fotos reales de obra. Copia cada foto a /public/media/obras/ y agrégala aquí
 * con el nombre exacto de la obra (igual que en `obras` de profile.ts):
 * aparecerán en el mapa del recorrido y en la galería de obras.
 */
export type ObraPhoto = MediaItem & { obra: string };

export const fotosObra: ObraPhoto[] = [];

/** Secuencia de la galería de obras (estilo reportaje). */
export const obrasGallery = ["crew", "blueprint", "site", "road", "engineer"] as const;

/** Recursos generados en código para este sitio (sin licencia de terceros). */
export const generatedMedia = [
  { title: "Escena 3D del túnel (hero)", note: "Generada en tiempo real con Three.js" },
  { title: "Secciones de túnel y diagramas", note: "SVG dibujados para este sitio" },
  { title: "Fondo de circuitos y planos", note: "Canvas generado en tiempo real" },
];
