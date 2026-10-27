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
/** `destacada`: también aparece a pantalla completa en la galería de obras. */
export type ObraPhoto = MediaItem & { obra: string; destacada?: boolean };

const m2 = {
  obra: "Autopista Río Magdalena 2",
  credit: "Archivo fotográfico de Construcciones El Cóndor",
  license: "Derechos reservados de sus autores",
  sourceUrl: "https://elcondor.com",
};

const condor = {
  credit: "Archivo fotográfico de Construcciones El Cóndor",
  license: "Derechos reservados de sus autores",
  sourceUrl: "https://elcondor.com",
};

const toyo = { ...condor, obra: "Túnel del Toyo" };

const mm2 = {
  obra: "Lower Mine Marmato 2",
  credit: "Archivo fotográfico de Construcciones El Cóndor",
  license: "Derechos reservados de sus autores",
  sourceUrl: "https://elcondor.com",
};

export const fotosObra: ObraPhoto[] = [
  {
    ...m2,
    destacada: true,
    src: "/media/obras/magdalena2-glorieta.webp",
    alt: "Vista aérea de una glorieta de la Autopista Río Magdalena 2 entre montañas de Antioquia",
    caption: "La vía 4G que conecta el Magdalena Medio con el norte del país. Aquí empezó mi camino en El Cóndor: control de producción, insumos, maquinaria y personal.",
  },
  {
    ...m2,
    destacada: true,
    src: "/media/obras/magdalena2-talud.webp",
    alt: "Talud estabilizado con anclajes y placas de concreto junto a la Autopista Río Magdalena 2",
    caption: "Taludes estabilizados con anclajes: cada placa es un dato de avance, insumo y horas máquina que hay que medir y reportar.",
  },
  {
    ...m2,
    src: "/media/obras/magdalena2-camara.webp",
    alt: "Cámara de monitoreo instalada en la Autopista Río Magdalena 2",
    caption: "La tecnología también es parte de la vía: sistemas de monitoreo que convierten la operación en información.",
  },
  {
    ...mm2,
    destacada: true,
    src: "/media/obras/marmato2-tanques.webp",
    alt: "Vista aérea de los tanques metálicos y estructuras en construcción del proyecto Lower Mine Marmato 2",
    caption: "Montaje de la planta de procesamiento: tanques, estructuras y cimentaciones avanzando al mismo tiempo, con insumos, equipos y mano de obra conciliados a diario.",
  },
  {
    ...mm2,
    destacada: true,
    src: "/media/obras/marmato2-portales.webp",
    alt: "Plataforma de la planta de procesamiento frente a la ladera estabilizada en Marmato, Caldas",
    caption: "Explanación y muros de la plataforma donde se monta la planta de procesamiento: movimiento masivo de tierra al pie de la ladera estabilizada.",
  },
  {
    ...mm2,
    src: "/media/obras/marmato2-estructuras.webp",
    alt: "Estructuras de concreto con andamios y formaletas en Lower Mine Marmato 2",
    caption: "Formaletas, acero y concreto: avance de estructuras medido y reportado a diario.",
  },
  {
    ...mm2,
    src: "/media/obras/marmato2-muros.webp",
    alt: "Muros de contención y explanación de la plataforma de Marmato 2",
    caption: "Muros de contención y explanación para la plataforma de la planta.",
  },
  {
    ...mm2,
    src: "/media/obras/marmato2-cimentacion.webp",
    alt: "Cimentaciones, volquetas y excavadora en la plataforma de Marmato 2",
    caption: "Cimentaciones, volquetas y excavación: horas máquina e insumos que se concilian cada día.",
  },
  {
    ...toyo,
    destacada: true,
    src: "/media/obras/toyo-equipo.webp",
    alt: "Juan Sebastián De León (derecha) con un compañero revisando una libreta en el frente del Túnel del Toyo",
    caption: "En el frente del Túnel del Toyo, a la derecha con la libreta. La información que se toma en campo es la que alimenta cada herramienta que construyo.",
  },
  {
    ...toyo,
    destacada: true,
    src: "/media/obras/toyo-portal.webp",
    alt: "Taludes anclados y portal del Túnel del Toyo entre montañas del occidente antioqueño",
    caption: "Taludes anclados y el portal del túnel: la puerta del eje vial que conecta Medellín con Urabá y el mar.",
  },
  {
    ...toyo,
    src: "/media/obras/toyo-perforadora.webp",
    alt: "Perforadora de pilotes junto a las canastas de acero frente al portal del Túnel del Toyo",
    caption: "Perforadora de pilotes y canastas de acero frente al portal.",
  },
  {
    ...toyo,
    src: "/media/obras/toyo-anclajes.webp",
    alt: "Trabajadores instalando anclajes con equipo hidráulico en un talud del Túnel del Toyo",
    caption: "Instalación de anclajes: equipos y horas que se registran y concilian.",
  },
  {
    ...toyo,
    src: "/media/obras/toyo-taludes.webp",
    alt: "Vía de acceso entre taludes anclados hacia el portal del Túnel del Toyo",
    caption: "La vía de acceso entre taludes anclados hacia el portal.",
  },
];

/** Secuencia de la galería de obras (estilo reportaje). */
export const obrasGallery = ["crew", "blueprint", "site", "road", "engineer"] as const;

/** Recursos generados en código para este sitio (sin licencia de terceros). */
export const generatedMedia = [
  { title: "Escena 3D del túnel (hero)", note: "Generada en tiempo real con Three.js" },
  { title: "Secciones de túnel y diagramas", note: "SVG dibujados para este sitio" },
  { title: "Fondo de circuitos y planos", note: "Canvas generado en tiempo real" },
];
