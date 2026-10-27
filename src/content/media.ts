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
    alt: "Obra civil en construcción con estructuras y equipo pesado",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
    caption: "Control integral de obra: recursos humanos, equipos y datos de producción gestionados en un mismo sistema.",
  },
  crew: {
    src: unsplash("1504307651254-35680f356dfd"),
    alt: "Trabajadores de construcción con casco en el frente de obra",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
    caption: "Frente de obra: origen de los registros de avance, rendimientos y consumos.",
  },
  blueprint: {
    src: unsplash("1503387762-592deb58ef4e"),
    alt: "Planos técnicos sobre una mesa de trabajo",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
    caption: "Interpretación de planos y especificaciones técnicas como base del control de cantidades.",
  },
  road: {
    src: unsplash("1469854523086-cc02fe5d8800"),
    alt: "Corredor vial que atraviesa un paisaje montañoso",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
    caption: "Corredores de infraestructura vial: túneles, puentes y pavimentos para la conectividad regional.",
  },
  engineer: {
    src: unsplash("1581092160562-40aa08e78837"),
    alt: "Ingeniero trabajando con equipos tecnológicos",
    credit: "Unsplash",
    license: "Licencia Unsplash",
    sourceUrl: "https://unsplash.com/license",
    caption: "Ingeniería electrónica aplicada a la automatización y al control de procesos constructivos.",
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
const pacifico = { ...condor, obra: "Rehabilitación de pavimentos · Pacífico 2", credit: "Registro de obra · Construcciones El Cóndor" };

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
    caption: "Concesión vial 4G Autopista Río Magdalena 2: control de producción, consumo de insumos, horómetros de equipo pesado y mano de obra.",
  },
  {
    ...m2,
    destacada: true,
    src: "/media/obras/magdalena2-talud.webp",
    alt: "Talud estabilizado con anclajes activos y placas de concreto junto a la Autopista Río Magdalena 2",
    caption: "Estabilización de taludes con anclajes activos y placas de concreto: medición de avance, consumos y horas máquina.",
  },
  {
    ...m2,
    src: "/media/obras/magdalena2-camara.webp",
    alt: "Cámara de monitoreo instalada en la Autopista Río Magdalena 2",
    caption: "Sistemas inteligentes de transporte (ITS): monitoreo de la operación del corredor vial.",
  },
  {
    ...mm2,
    destacada: true,
    src: "/media/obras/marmato2-tanques.webp",
    alt: "Vista aérea de los tanques metálicos y estructuras en construcción del proyecto Lower Mine Marmato 2",
    caption: "Montaje electromecánico de la planta de beneficio: tanques, estructuras y cimentaciones con conciliación diaria de insumos, equipos y mano de obra.",
  },
  {
    ...mm2,
    destacada: true,
    src: "/media/obras/marmato2-portales.webp",
    alt: "Plataforma de la planta de beneficio frente a la ladera estabilizada en Marmato, Caldas",
    caption: "Movimiento masivo de tierras, explanación y muros de contención de la plataforma de la planta de beneficio.",
  },
  {
    ...mm2,
    src: "/media/obras/marmato2-estructuras.webp",
    alt: "Estructuras de concreto con andamios y formaletas en Lower Mine Marmato 2",
    caption: "Estructuras en concreto reforzado: control diario de formaleta, acero de refuerzo y volúmenes vaciados.",
  },
  {
    ...mm2,
    src: "/media/obras/marmato2-muros.webp",
    alt: "Muros de contención y explanación de la plataforma de Marmato 2",
    caption: "Muros de contención en concreto y explanación de la plataforma.",
  },
  {
    ...mm2,
    src: "/media/obras/marmato2-cimentacion.webp",
    alt: "Cimentaciones, volquetas y excavadora en la plataforma de Marmato 2",
    caption: "Cimentaciones y excavación: conciliación diaria de horas máquina, acarreos e insumos.",
  },
  {
    ...toyo,
    destacada: true,
    src: "/media/obras/toyo-equipo.webp",
    alt: "Personal de oficina técnica en el frente del Túnel del Toyo",
    caption: "Oficina técnica en frente de obra: captura de información de campo para el control de producción y la cuantificación de actividades.",
  },
  {
    ...toyo,
    destacada: true,
    src: "/media/obras/toyo-equipo-oficina.webp",
    alt: "Equipo de oficina técnica frente a los taludes estabilizados del Túnel del Toyo",
    caption: "Equipo de oficina técnica del Túnel del Toyo: control operacional, cuantificación de obra y seguimiento contractual.",
  },
  {
    ...toyo,
    destacada: true,
    src: "/media/obras/toyo-portal.webp",
    alt: "Taludes estabilizados con anclajes y portal del Túnel del Toyo en el occidente antioqueño",
    caption: "Portal y taludes estabilizados con anclajes activos del Túnel del Toyo, corredor vial Medellín – Urabá.",
  },
  {
    ...toyo,
    src: "/media/obras/toyo-perforadora.webp",
    alt: "Perforadora de pilotes junto a las canastas de acero frente al portal del Túnel del Toyo",
    caption: "Perforación de pilotes y armado de canastas de acero de refuerzo en la zona de portal.",
  },
  {
    ...toyo,
    src: "/media/obras/toyo-anclajes.webp",
    alt: "Trabajadores instalando anclajes con equipo hidráulico en un talud del Túnel del Toyo",
    caption: "Perforación e instalación de anclajes activos: registro y conciliación de horas equipo.",
  },
  {
    ...toyo,
    src: "/media/obras/toyo-taludes.webp",
    alt: "Vía de acceso entre taludes estabilizados con anclajes hacia el portal del Túnel del Toyo",
    caption: "Vía de acceso al portal entre taludes estabilizados con anclajes activos.",
  },
  {
    ...pacifico,
    destacada: true,
    src: "/media/obras/pacifico2-fresado.webp",
    alt: "Fresadora retirando la carpeta asfáltica deteriorada en el corredor Pacífico 2",
    caption: "Fresado de la carpeta asfáltica deteriorada en la rehabilitación del pavimento flexible.",
  },
  {
    ...pacifico,
    destacada: true,
    src: "/media/obras/pacifico2-extendido.webp",
    alt: "Pavimentadora y volqueta extendiendo mezcla asfáltica en caliente en Pacífico 2",
    caption: "Extendido de mezcla asfáltica en caliente: control de rendimientos, volúmenes y tiempos de ciclo.",
  },
  {
    ...pacifico,
    src: "/media/obras/pacifico2-liga.webp",
    alt: "Carrotanque aplicando riego de liga con emulsión asfáltica sobre la superficie fresada",
    caption: "Riego de liga con emulsión asfáltica previo a la colocación de la carpeta.",
  },
  {
    ...pacifico,
    src: "/media/obras/pacifico2-nocturno.webp",
    alt: "Frente de pavimentación trabajando en horario nocturno en Pacífico 2",
    caption: "Pavimentación en horario nocturno para reducir la afectación al tránsito.",
  },
  {
    ...pacifico,
    src: "/media/obras/pacifico2-compactacion.webp",
    alt: "Cuadrilla nivelando y compactando la mezcla asfáltica detrás de la pavimentadora",
    caption: "Nivelación y compactación de la mezcla asfáltica.",
  },
  {
    ...pacifico,
    src: "/media/obras/pacifico2-carril.webp",
    alt: "Carril fresado listo para recibir la nueva carpeta asfáltica",
    caption: "Carril fresado y señalizado para la colocación de la nueva carpeta.",
  },
  {
    ...pacifico,
    src: "/media/obras/pacifico2-terminado.webp",
    alt: "Tramo del corredor Pacífico 2 con la carpeta asfáltica nueva terminada",
    caption: "Tramo rehabilitado con carpeta asfáltica terminada.",
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
