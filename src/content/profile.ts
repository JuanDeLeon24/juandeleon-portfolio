/**
 * Fuente única de contenido del sitio.
 * Todo lo que aparece en la página sale de aquí: edita este archivo para
 * actualizar textos, cifras, enlaces, fotos, certificados y testimonios.
 *
 * Campos marcados con `// EDITAR` son espacios preparados para información
 * que todavía no está confirmada (fechas exactas, universidad, cursos...).
 */

export const site = {
  url: "https://juandeleon24.github.io/juandeleon-portfolio",
  name: "Juan Sebastián De León Rapalino",
  shortName: "Juan De León",
  role: "Ingeniero Electrónico · Control operativo, automatización e IA aplicada a la obra civil",
  description:
    "Ingeniero Electrónico que creció dentro de la obra: de obrero en Construcciones El Cóndor a construir herramientas de automatización, análisis de datos e inteligencia artificial para túneles y vías 4G en Colombia.",
  locale: "es_CO",
  keywords: [
    "Juan Sebastián De León Rapalino",
    "Ingeniero Electrónico",
    "Construcciones El Cóndor",
    "Túnel del Toyo",
    "Autopista Río Magdalena 2",
    "automatización de procesos",
    "inteligencia artificial",
    "control operativo",
    "obra civil",
    "Power BI",
    "Python",
    "Flutter",
    "VBA",
  ],
};

export const contact = {
  email: "jusedelera2401@gmail.com",
  phoneDisplay: "+57 300 645 2762",
  whatsapp: "573006452762",
  github: "https://github.com/JuanDeLeon24",
  // EDITAR: reemplaza por la URL real de tu perfil de LinkedIn.
  linkedin: "https://www.linkedin.com/search/results/people/?keywords=Juan%20Sebasti%C3%A1n%20De%20Le%C3%B3n%20Rapalino",
  location: "Antioquia, Colombia",
};

export const hero = {
  title: "Transformando procesos, construyendo soluciones y llevando la innovación al siguiente nivel.",
  subtitle:
    "Profesional enfocado en control operativo, tecnología, automatización e inteligencia artificial aplicada.",
  // Coloca un .mp4 en /public/media/hero.mp4 y escribe aquí "/media/hero.mp4"
  // para usar video real de fondo. Mientras esté vacío se usa la escena 3D del túnel.
  video: "",
};

export const about = {
  // Coloca tu foto profesional en /public/media/juan.jpg y escribe "/media/juan.jpg".
  photo: "",
  lead:
    "Empecé en la obra como obrero. Hoy diseño las herramientas que usa la obra para medirse, decidir y avanzar más rápido.",
  chapters: [
    {
      title: "El frente de obra",
      body:
        "Entré a Construcciones El Cóndor con la esperanza de recibir oportunidades y la decisión de aprovecharlas. Aprendí la obra desde adentro: lectura de planos, ejecución de actividades, control de calidad, manejo de personal e incluso manipulación de explosivos para voladuras a cielo abierto.",
    },
    {
      title: "La oficina técnica",
      body:
        "Con la formación de Ingeniero Electrónico pasé al lado administrativo: centros de costos, seguimiento y control de la información, reportes e indicadores. Ahí vi el problema real: procesos manuales, información dispersa y horas perdidas digitando.",
    },
    {
      title: "El código como herramienta de obra",
      body:
        "Empecé a programar para resolver lo que tenía enfrente. Cambié un sistema muy manual de digitación y almacenamiento de la información de obra, y hoy construyo extensiones, macros, apps e integraciones con IA que convierten horas de trabajo repetitivo en minutos de revisión.",
    },
  ],
  difference: [
    "Hablo el idioma del frente de obra y el del software.",
    "Automatizo sin perder el control: la persona revisa, la herramienta ejecuta.",
    "Aprendo rápido y llevo lo que aprendo a producción, no a una presentación.",
  ],
};

export type TimelineItem = {
  period: string;
  org: string;
  role: string;
  place: string;
  summary: string;
  highlights: string[];
};

export const timeline: TimelineItem[] = [
  {
    period: "Formación", // EDITAR: años y universidad
    org: "Ingeniería Electrónica",
    role: "Pregrado",
    place: "Colombia",
    summary: "Base en sistemas, señales, programación y análisis que hoy aplico al control de procesos de obra.",
    highlights: ["Programación y sistemas embebidos", "Análisis de datos y señales", "Pensamiento de ingeniería"],
  },
  {
    period: "Inicio en El Cóndor", // EDITAR: año de ingreso
    org: "Construcciones El Cóndor S.A.",
    role: "Obrero · frente de obra",
    place: "Antioquia",
    summary: "Primer contacto con la obra civil: ejecución de actividades en campo y aprendizaje del proceso constructivo.",
    highlights: ["Ejecución de actividades", "Lectura de planos", "Voladuras a cielo abierto"],
  },
  {
    period: "Río Magdalena II",
    org: "Autopista al Río Magdalena 2 · El Cóndor",
    role: "Supervisión, calidad y oficina técnica",
    place: "Nordeste y Magdalena Medio antioqueño",
    summary: "Trabajo bajo presión en un proyecto vial 4G: supervisión, control de calidad, manejo de personal y gestión de información.",
    highlights: [
      "Supervisión y control de calidad",
      "Manejo de personal",
      "Digitalización de la información de obra",
    ],
  },
  {
    period: "Oficina técnica",
    org: "Construcciones El Cóndor S.A.",
    role: "Control de información y centros de costos",
    place: "Antioquia",
    summary: "Seguimiento y control de centros de costos, reportes, indicadores y análisis de datos con Excel avanzado y Power BI.",
    highlights: ["Centros de costos", "Dashboards en Power BI", "Automatización con Excel y VBA"],
  },
  {
    period: "Túnel del Toyo · hoy",
    org: "Almacén El Toyo · El Cóndor",
    role: "Control operativo, nómina de túneles y automatización",
    place: "Occidente antioqueño",
    summary: "Control del tiempo del personal de túneles, imputación a destinos de obra y desarrollo de herramientas propias que automatizan el proceso de punta a punta.",
    highlights: [
      "Aprobador de jornadas (extensión propia)",
      "Asignación automática de destinos",
      "Reportes de horas extras",
    ],
  },
];

export const condor = {
  intro:
    "Construcciones El Cóndor es una de las constructoras de infraestructura más grandes de Colombia. Dentro de ella hice todo el recorrido: del frente de obra a la oficina técnica, y de la oficina técnica al código.",
  activities: [
    "Control operativo del personal de túneles",
    "Aprobación de jornadas y horas extras",
    "Imputación de horas a destinos y centros de costos",
    "Gestión documental de obra",
    "Seguimiento de actividades y programación",
    "Reportes e indicadores de gestión",
    "Supervisión y control de calidad",
    "Lectura de planos y ejecución de actividades",
    "Manejo de personal",
    "Voladuras a cielo abierto",
  ],
  works: [
    {
      name: "Túnel del Toyo",
      tag: "Túnel · vía al mar",
      place: "Cañasgordas – Giraldo, Antioquia",
      coords: "6.75° N · 76.02° O (aprox.)",
      text:
        "Parte del eje vial que conecta a Medellín con Urabá y el mar Caribe. Desde el Almacén El Toyo controlo el tiempo del personal de túneles por turnos diurnos, nocturnos y de revestimiento.",
      facts: ["Turnos 9,5 h y 10,5 h", "Personal por grupos y frentes", "Destinos por centro de costo"],
    },
    {
      name: "Autopista al Río Magdalena 2",
      tag: "Vía 4G",
      place: "Remedios – Puerto Berrío, Antioquia",
      coords: "6.70° N · 74.55° O (aprox.)",
      text:
        "Proyecto de cuarta generación donde fortalecí la supervisión, el control de calidad, el manejo de personal y transformé la forma de registrar la información de obra.",
      facts: ["Supervisión en campo", "Control de calidad", "Información de obra digitalizada"],
    },
  ],
  contributions: [
    {
      title: "De la digitación manual al dato estructurado",
      text: "Reemplacé un sistema muy manual para digitar y almacenar la información de obra por un flujo estructurado y reutilizable para reportes.",
    },
    {
      title: "Aprobador de jornadas – El Cóndor",
      text: "Extensión de Chrome propia que analiza marcaciones contra la programación, genera el Excel de revisión, aprueba solo lo validado y aprende de cada decisión.",
    },
    {
      title: "Destinos automáticos",
      text: "Reparte las horas de cada grupo entre sus destinos de obra por resto mayor, respetando el destino que traía cada persona.",
    },
    {
      title: "Rendimiento sobre VPN",
      text: "Rediseñé la interacción con la plataforma de nómina filtrando por cédula: el estado de cada consulta pasó de ~1,7 MB a ~35 KB.",
    },
  ],
};

/** Caso de estudio principal: cifras tomadas del funcionamiento real de la herramienta. */
export const jornadasCase = {
  name: "Aprobador de jornadas – El Cóndor",
  pitch:
    "Una persona aprobaba a mano, una por una, las jornadas de más de cien trabajadores de túnel. Construí una herramienta que hace el análisis, propone, y deja a la persona solo la decisión.",
  steps: [
    { title: "Elegir jefe", text: "Filtra el personal del jefe inmediato en la plataforma de nómina." },
    { title: "Cruzar programación", text: "Lee el Excel de programación de túneles: turnos D, N, D8H, N8H y novedades." },
    { title: "Analizar marcaciones", text: "Compara lo marcado con el turno, redondea la salida y calcula horas y extras." },
    { title: "Revisión humana", text: "Genera un Excel protegido: la persona corrige celdas azules y escribe OK." },
    { title: "Aprobar y aprender", text: "Aprueba solo las filas con OK, salta inconsistencias y guarda memoria por persona." },
    { title: "Destinos", text: "Arma el archivo de destinos por centro de costo listo para revisión." },
  ],
  metrics: [
    { value: 98, suffix: "%", label: "menos datos por consulta (1,7 MB → 35 KB)" },
    { value: 160, prefix: "~", label: "personas analizadas por jefe en un lote" },
    { value: 31, label: "días por análisis en una sola corrida" },
    { value: 15, label: "tipos de novedad mapeados a la plataforma" },
  ],
};

export type Project = {
  id: string;
  category: string;
  title: string;
  stack: string[];
  summary: string;
  details: string[];
  image: string; // clave de media.ts
  repo?: string;
};

/** Proyectos de obra: todos existen en GitHub (github.com/JuanDeLeon24). */
export const projects: Project[] = [
  {
    id: "automatizacion",
    category: "Automatización de procesos",
    title: "Aprobador de jornadas",
    stack: ["JavaScript", "Chrome Extensions", "Excel", "VBA"],
    summary: "Extensión de Chrome en producción que analiza, propone y aprueba las jornadas del personal de túneles.",
    details: [
      "Cruza marcaciones con la programación de túneles y festivos.",
      "Excel de revisión protegido: solo se aprueba lo marcado con OK.",
      "Memoria de aprendizaje por persona: notas, horarios y destinos.",
      "Consultas por cédula: de ~1,7 MB a ~35 KB por postback.",
    ],
    image: "excel",
  },
  {
    id: "concreto",
    category: "Desarrollo de software",
    title: "Control Concreto · PS-TÚNEL 011",
    stack: ["Kotlin", "Android", "Capacitor", "iOS", "PDF"],
    summary: "App para el control de llegadas de concreto en los vaciados del revestimiento del túnel. Funciona 100 % sin internet.",
    details: [
      "Jornadas por frente, tramo y abscisa; cada mixer con hora 'Ahora'.",
      "Foto de la remisión con ajuste de esquinas y filtro de escaneo automático.",
      "PDF con firmas y anexos, Excel con historial y resumen.",
      "Versión Android y versión iPhone (Codemagic + TestFlight) compatibles entre sí.",
    ],
    image: "documents",
    repo: "https://github.com/JuanDeLeon24/control_concretos_CEC",
  },
  {
    id: "tunel3d",
    category: "Visualización 3D",
    title: "Visor 3D paramétrico del Túnel 0",
    stack: ["React", "TypeScript", "Three.js", "React Three Fiber"],
    summary: "Gemelo digital del túnel: excavación con deformaciones, revestimiento que corrige la sección, nichos y galería de emergencia.",
    details: [
      "Se construye 100 % desde un JSON: módulos, avances, cajas, nichos y deformaciones.",
      "Recorrido en primera persona y vista exterior.",
      "Etiquetas con sobreexcavación y convergencia por abscisa.",
      "Texturas PBR procedurales y luminarias.",
    ],
    image: "blueprint",
    repo: "https://github.com/JuanDeLeon24/ControlConcreto-Web",
  },
  {
    id: "avance",
    category: "Análisis de datos",
    title: "Control de Avance · Túnel 0",
    stack: ["Flutter", "Dart", "Excel", "3D"],
    summary: "App que lee el reporte diario de obra en Excel y colorea el avance real de cada módulo del túnel.",
    details: [
      "Lector propio de .xlsx/.xlsm que toma el valor calculado de las fórmulas.",
      "Avance por módulo = cobertura por PK de cada actividad, ponderada.",
      "Vista 3D con cámara orbital, seis vistas y filtro por actividad.",
      "Auditoría técnica: corrigió KPIs fijos y una llave de firma expuesta.",
    ],
    image: "dashboard",
    repo: "https://github.com/JuanDeLeon24/ControlActividades_T0",
  },
  {
    id: "ia",
    category: "Inteligencia Artificial",
    title: "Agentes con reglas de obra",
    stack: ["IA generativa", "Agentes", "Skills", "APIs"],
    summary: "Skills y agentes que conocen las reglas reales de El Cóndor: turnos, redondeos, novedades, destinos y seguridad.",
    details: [
      "Operan el navegador y Excel siguiendo un procedimiento documentado.",
      "Confirman con la persona antes de cualquier acción irreversible.",
      "Asistencia para auditar código, redactar y revisar documentación técnica.",
    ],
    image: "ai",
  },
];

export type SideProject = {
  name: string;
  kind: string;
  summary: string;
  bullets: string[];
  stack: string[];
  image?: string; // clave de media.ts
  live?: string;
  repo?: string;
};

/** Proyectos adicionales, fuera de la obra. */
export const sideProjects: SideProject[] = [
  {
    name: "Lovely · LV Accesorios",
    kind: "E-commerce para una marca de accesorios",
    summary:
      "Tienda en línea completa para una marca de relojes, gorras y gafas: catálogo, combos, carrito, checkout por WhatsApp y un panel para que la dueña administre todo sin programar.",
    bullets: [
      "23 productos con variantes de color y filtros por categoría.",
      "Visor 3D de relojes hecho con Three.js, sin CDN.",
      "Panel administrativo que publica cambios en GitHub con un solo commit.",
      "Combos 'Arma tu look', códigos de descuento, modo claro/oscuro y efectos de scroll.",
      "Datos de clientes solo en el navegador de la dueña (Ley 1581).",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Three.js", "GitHub API"],
    image: "lovelyHome",
    live: "https://juandeleon24.github.io/lovely-web/",
    repo: "https://github.com/JuanDeLeon24/lovely-web",
  },
  {
    name: "QuantSignal AI",
    kind: "Análisis cuantitativo con IA",
    summary:
      "Analizador de mercados para cripto, acciones, ETF, forex y materias primas con señales multifactor, backtesting profesional y una bitácora que entrena la IA con decisiones propias.",
    bullets: [
      "Universo de 50 activos y 6 estrategias (≈ 8.000 operaciones simuladas).",
      "Escenarios por análogos históricos contra Monte Carlo.",
      "Métricas: Sharpe, Sortino, Calmar, Deflated Sharpe, riesgo de ruina, walk-forward.",
      "App en Streamlit y reportes HTML que funcionan sin internet.",
    ],
    stack: ["Python", "Machine Learning", "Streamlit", "pytest"],
    image: "dashboard",
    repo: "https://github.com/JuanDeLeon24/QuantSignal-Analyzer",
  },
  {
    name: "Primeros pasos",
    kind: "Formación y apps móviles (2023)",
    summary: "Curso de Python de OpenBootCamp, primeras apps Android y landing pages: la base de todo lo que vino después.",
    bullets: ["Python desde cero hasta proyectos.", "Apps Android y móviles.", "Landing pages y formularios de acceso."],
    stack: ["Python", "Android", "HTML", "CSS"],
    image: "code",
    repo: "https://github.com/JuanDeLeon24/OpenBootCamp-Py",
  },
];

export const skills = [
  { name: "Excel avanzado", level: 95, group: "Datos" },
  { name: "VBA", level: 88, group: "Automatización" },
  { name: "Automatización", level: 92, group: "Automatización" },
  { name: "Python", level: 82, group: "Desarrollo" },
  { name: "Power BI", level: 85, group: "Datos" },
  { name: "IA generativa", level: 88, group: "IA" },
  { name: "APIs", level: 78, group: "Desarrollo" },
  { name: "Flutter", level: 72, group: "Desarrollo" },
  { name: "Firebase", level: 70, group: "Desarrollo" },
  { name: "GitHub", level: 80, group: "Desarrollo" },
  { name: "SQL", level: 74, group: "Datos" },
  { name: "Machine Learning", level: 62, group: "IA" },
];

export const ai = {
  intro:
    "La IA no reemplaza el criterio de obra: lo multiplica. La uso para leer, cruzar y redactar más rápido, y la conecto con las herramientas donde vive el trabajo.",
  uses: [
    { title: "Día a día", text: "Redacción de comunicaciones, resúmenes de información y revisión de documentos técnicos." },
    { title: "Automatización con IA", text: "Agentes que operan el navegador, leen Excel y aplican reglas de negocio paso a paso." },
    { title: "Optimización", text: "Detectar cuellos de botella, como el peso de cada consulta sobre VPN, y proponer la corrección." },
    { title: "Decisiones", text: "La IA propone y explica; la persona valida con OK. Nada irreversible sin revisión." },
    { title: "Agentes", text: "Skills con reglas reales: turnos, redondeos, novedades, destinos y seguridad." },
    { title: "Integración", text: "Navegador, Excel, correo, GitHub y plataformas internas en un mismo flujo." },
  ],
  nodes: [
    { id: "datos", label: "Datos de obra", detail: "Marcaciones, programación, Excel, PDFs y correos." },
    { id: "agente", label: "Agente IA", detail: "Entiende la tarea y aplica las reglas de negocio documentadas." },
    { id: "herramientas", label: "Herramientas", detail: "Navegador, Excel, plataformas internas, APIs y GitHub." },
    { id: "revision", label: "Revisión humana", detail: "La persona valida con OK; las inconsistencias se reportan." },
    { id: "resultado", label: "Resultado", detail: "Jornadas aprobadas, reportes, indicadores y documentos." },
  ],
};

/** Indicadores. Solo cifras verificables; completa las demás cuando las tengas medidas. */
export const impact = [
  { value: 2, suffix: "", label: "megaproyectos de infraestructura" },
  { value: 98, suffix: "%", label: "menos peso por consulta en nómina" },
  { value: 6, suffix: "", label: "etapas del proceso de jornadas automatizadas" },
  { value: 4, suffix: "", label: "tipos de turno de túnel modelados" },
  { value: 5, suffix: "", label: "frentes tecnológicos: automatización, software, IA, datos y documentos" },
];

export type Testimonial = { quote: string; name: string; role: string; relation: string; placeholder?: boolean };

export const testimonials: Testimonial[] = [
  {
    quote: "Espacio reservado para el testimonio de un jefe directo. Pídele dos o tres frases sobre un resultado concreto.",
    name: "Nombre del jefe",
    role: "Cargo · Construcciones El Cóndor",
    relation: "Jefe",
    placeholder: true,
  },
  {
    quote: "Espacio reservado para un supervisor que haya visto en obra el antes y el después de una herramienta.",
    name: "Nombre del supervisor",
    role: "Supervisor de túnel",
    relation: "Supervisor",
    placeholder: true,
  },
  {
    quote: "Espacio reservado para un compañero que use a diario alguna de las herramientas desarrolladas.",
    name: "Nombre del compañero",
    role: "Oficina técnica",
    relation: "Compañero",
    placeholder: true,
  },
  {
    quote: "Espacio reservado para un cliente o interventoría.",
    name: "Nombre del cliente",
    role: "Entidad",
    relation: "Cliente",
    placeholder: true,
  },
];

export type Certification = { title: string; issuer: string; year: string; kind: string; file?: string; placeholder?: boolean };

export const certifications: Certification[] = [
  { title: "Ingeniería Electrónica", issuer: "Universidad · EDITAR", year: "—", kind: "Formación académica" },
  { title: "Manipulación de explosivos para voladuras a cielo abierto", issuer: "EDITAR entidad", year: "—", kind: "Certificación" },
  { title: "Power BI / Análisis de datos", issuer: "EDITAR entidad", year: "—", kind: "Curso", placeholder: true },
  { title: "Python para automatización", issuer: "EDITAR entidad", year: "—", kind: "Curso", placeholder: true },
  { title: "Inteligencia artificial generativa", issuer: "EDITAR entidad", year: "—", kind: "Curso", placeholder: true },
  { title: "Diplomado", issuer: "EDITAR entidad", year: "—", kind: "Diplomado", placeholder: true },
];
