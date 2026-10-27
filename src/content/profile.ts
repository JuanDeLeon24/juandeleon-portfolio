/**
 * Fuente única de contenido del sitio.
 * Todo lo que aparece en la página sale de aquí: edita este archivo para
 * actualizar textos, cifras, enlaces, fotos, certificados y testimonios.
 *
 * Campos marcados con `// EDITAR` son espacios preparados para información
 * que todavía no está confirmada.
 */

export const site = {
  url: "https://juandeleon24.github.io/juandeleon-portfolio",
  name: "Juan Sebastián De León Rapalino",
  shortName: "Juan De León",
  role: "Ingeniero Electrónico · Control de producción y soluciones digitales para obra civil",
  description:
    "Ingeniero Electrónico con más de dos años y medio en obras de infraestructura con Construcciones El Cóndor: vías, puentes, minería, plantas de asfalto y túneles. Uno la obra con la tecnología mediante apps, automatizaciones, análisis de datos e inteligencia artificial.",
  locale: "es_CO",
  keywords: [
    "Juan Sebastián De León Rapalino",
    "Ingeniero Electrónico",
    "Construcciones El Cóndor",
    "control de producción",
    "oficina técnica",
    "Túnel del Toyo",
    "Autopista Río Magdalena 2",
    "Lower Mine Marmato",
    "automatización de procesos",
    "inteligencia artificial",
    "Power BI",
    "Power Platform",
    "React",
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
  photo: "/media/juan.webp",
  lead:
    "Seis obras en dos años y medio: vías, puentes, minería, asfalto y túneles. En cada una encontré un proceso manual y lo convertí en una herramienta.",
  chapters: [
    {
      title: "La base técnica",
      body:
        "Me formé en el SENA como técnico en sistemas y en seguridad informática, y luego como Ingeniero Electrónico en la Universidad Popular del Cesar. En paralelo estudié desarrollo web, JavaScript y React en Coderhouse, donde quedé en el top 10.",
    },
    {
      title: "Liderar personas en campo",
      body:
        "En el Grupo Santa Clara, en San Juan del Cesar, supervisé personal y procesos productivos diarios y programé labores y recursos según la operación. Ahí aprendí que un buen control empieza por la gente.",
    },
    {
      title: "La obra civil",
      body:
        "En 2024 llegué a Construcciones El Cóndor como Auxiliar de Control en la oficina técnica. Desde entonces recorrí la Autopista Río Magdalena 2, una mina en Marmato, puentes en Risaralda, vías y una planta de asfalto en La Pintada, y hoy el Túnel del Toyo.",
    },
    {
      title: "El código como herramienta de obra",
      body:
        "Identifico los cuellos de botella del control de obra y los resuelvo con herramientas propias: apps, automatizaciones y análisis de datos que eliminan reprocesos, reducen errores de digitación y entregan información confiable y al día.",
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
  title: string;
  org: string;
  role: string;
  place: string;
  summary: string;
  highlights: string[];
};

export const timeline: TimelineItem[] = [
  {
    period: "2016 – 2018",
    title: "SENA",
    org: "Servicio Nacional de Aprendizaje",
    role: "Técnico en Sistemas · Técnico en Seguridad y Sistemas Informáticos",
    place: "Cesar",
    summary: "Ofimática (2016), Técnico en Sistemas (2017) y Técnico en Seguridad y Sistemas Informáticos (2018).",
    highlights: ["Sistemas", "Seguridad informática", "Ofimática"],
  },
  {
    period: "2021 – 2023",
    title: "Grupo Santa Clara",
    org: "Fincas del Grupo Santa Clara",
    role: "Supervisor de operaciones",
    place: "San Juan del Cesar, La Guajira",
    summary: "Supervisión de personal y procesos productivos diarios; programación de labores y administración de recursos operativos.",
    highlights: ["Supervisión de personal", "Programación de labores", "Recursos operativos"],
  },
  {
    period: "2022",
    title: "Coderhouse",
    org: "Carrera de Desarrollo Frontend React",
    role: "Desarrollo web, JavaScript y React",
    place: "En línea",
    summary: "Carrera de 26 semanas: Desarrollo Web, JavaScript y React Js. Top 10 en Desarrollo Web, JavaScript y en la carrera.",
    highlights: ["React", "JavaScript", "Top 10"],
  },
  {
    period: "Dic 2023",
    title: "Ingeniero Electrónico",
    org: "Universidad Popular del Cesar",
    role: "Pregrado",
    place: "Valledupar",
    summary: "Título de Ingeniero Electrónico: sistemas, señales, programación y análisis aplicados al control de procesos.",
    highlights: ["Electrónica", "Programación", "Análisis"],
  },
  {
    period: "Feb 2024 – Jul 2025",
    title: "Autopista Río Magdalena 2",
    org: "Construcciones El Cóndor S.A.",
    role: "Auxiliar de Control · Oficina Técnica",
    place: "Vegachí, Antioquia",
    summary: "Llegada a El Cóndor en un proyecto vial 4G: control de producción, insumos, maquinaria y personal; certificación SENA en manejo de explosivos y voladura.",
    highlights: ["Control de producción", "Explosivos y voladura (SENA)", "Digitalización de formatos"],
  },
  {
    period: "Jul 2025 – Mar 2026",
    title: "Cuatro frentes a la vez",
    org: "Construcciones El Cóndor S.A.",
    role: "Auxiliar de Control · Oficina Técnica",
    place: "Caldas, Risaralda y Antioquia",
    summary: "Coordinación simultánea de minería en Marmato, recalce de dovelas en puentes de Irra, reparcheo de Pacífico 2 y la planta de asfalto Poblanco en La Pintada.",
    highlights: ["Lower Mine Marmato 2", "Puentes · Irra", "Pacífico 2 y planta Poblanco"],
  },
  {
    period: "Mar 2026 – hoy",
    title: "Túnel del Toyo",
    org: "Construcciones El Cóndor S.A.",
    role: "Auxiliar de Control · Oficina Técnica",
    place: "Santa Fe de Antioquia",
    summary: "Control del personal de túneles, aprobación de jornadas, imputación a centros de costo y herramientas propias que automatizan el proceso.",
    highlights: ["Aprobador de jornadas", "Control de concretos", "Auditor de maquinaria"],
  },
];

export type Obra = {
  name: string;
  tag: string;
  place: string;
  period: string;
  /** coordenadas aproximadas para el mapa del recorrido */
  lat: number;
  lon: number;
  text: string;
  facts: string[];
};

/** Obras en orden cronológico, según la hoja de vida. */
export const obras: Obra[] = [
  {
    name: "Autopista Río Magdalena 2",
    tag: "Vía 4G",
    place: "Vegachí, Antioquia",
    period: "Feb 2024 – Jul 2025",
    lat: 6.77,
    lon: -74.8,
    text: "Mi primer proyecto con El Cóndor. Control de producción y avance, insumos, maquinaria y personal en una autopista de cuarta generación.",
    facts: ["Control de producción", "Horómetros de maquinaria", "Explosivos y voladura"],
  },
  {
    name: "Lower Mine Marmato 2",
    tag: "Minería subterránea",
    place: "Marmato, Caldas",
    period: "Jul 2025 – Mar 2026",
    lat: 5.47,
    lon: -75.6,
    text: "Obras para minería en el distrito de Marmato: seguimiento de actividades e insumos y conciliación de equipos en un entorno subterráneo.",
    facts: ["Minería", "Seguimiento diario", "Control de insumos"],
  },
  {
    name: "Dovelas en puentes · Irra",
    tag: "Puentes",
    place: "Irra, Risaralda",
    period: "Jul 2025 – Mar 2026",
    lat: 5.27,
    lon: -75.66,
    text: "Reparación y recalces de dovelas en puentes: control de cantidades, mano de obra y equipos por frente.",
    facts: ["Estructuras", "Cantidades de obra", "Centros de costo"],
  },
  {
    name: "Reparcheo Pacífico 2",
    tag: "Vías",
    place: "La Pintada, Antioquia",
    period: "Jul 2025 – Mar 2026",
    lat: 5.75,
    lon: -75.6,
    text: "Mantenimiento y reparcheo de la vía Pacífico 2: rendimientos, insumos y avance diario consolidados para la dirección.",
    facts: ["Pavimentos", "Rendimientos", "Reportes diarios"],
  },
  {
    name: "Planta de asfalto Poblanco",
    tag: "Planta de producción",
    place: "La Pintada, Antioquia",
    period: "Jul 2025 – Mar 2026",
    lat: 5.72,
    lon: -75.64,
    text: "Control de producción de una planta de asfalto: producción, horas máquina y despachos en tableros de Excel y Power BI.",
    facts: ["Producción", "Horas máquina", "Power BI"],
  },
  {
    name: "Túnel del Toyo",
    tag: "Túnel",
    place: "Santa Fe de Antioquia",
    period: "Mar 2026 – hoy",
    lat: 6.56,
    lon: -75.83,
    text: "Parte del eje vial que conecta Medellín con Urabá y el mar. Control del personal de túneles por turnos, concretos de revestimiento y maquinaria.",
    facts: ["Turnos de 9,5 y 10,5 h", "Control de concretos", "Jornadas automatizadas"],
  },
];

export const condor = {
  intro:
    "Construcciones El Cóndor es una de las constructoras de infraestructura más grandes de Colombia. Desde febrero de 2024 trabajo en su oficina técnica como Auxiliar de Control, coordinando la información entre frentes de trabajo, proveedores y áreas técnicas.",
  activities: [
    "Control de producción y avance de obra",
    "Coordinación de frentes, proveedores y áreas técnicas",
    "Control de costos y centros de costo",
    "Imputación de mano de obra y equipos",
    "Conciliación de horas y horómetros",
    "Aprobación de jornadas frente a la programación",
    "Control de concretos y materiales",
    "Reportes diarios y semanales",
    "Tableros en Excel y Power BI",
    "Manejo de explosivos y voladura",
  ],
  contributions: [
    {
      title: "Formatos de campo digitales",
      text: "Concretos, maquinaria, personal y avance de obra pasaron del papel a apps web y móviles, con la información disponible al instante para la oficina técnica.",
    },
    {
      title: "Aprobación de jornadas automatizada",
      text: "Cruza las marcaciones del personal contra la programación y asigna centros de costo: la revisión manual se reduce a validar con OK.",
    },
    {
      title: "Auditor de maquinaria",
      text: "Extrae las horas por equipo de la plataforma, las audita en Excel y carga las correcciones pendientes.",
    },
    {
      title: "Tableros de control",
      text: "Producción, rendimientos, horas máquina, mano de obra y costos en Excel y Power BI para las decisiones del proyecto.",
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
    id: "maquinaria",
    category: "Automatización de procesos",
    title: "Auditor de maquinaria",
    stack: ["Excel", "VBA", "Automatización"],
    summary: "Extrae las horas por equipo de la plataforma, las audita contra los horómetros en Excel y carga las correcciones pendientes.",
    details: [
      "Conciliación de horas y horómetros por equipo.",
      "Detección de diferencias antes del cierre.",
      "Carga de correcciones pendientes en la plataforma.",
    ],
    image: "site",
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
  { name: "Power BI", level: 88, group: "Datos" },
  { name: "Bases de datos / SQL", level: 75, group: "Datos" },
  { name: "Automatización", level: 92, group: "Automatización" },
  { name: "VBA", level: 85, group: "Automatización" },
  { name: "Power Platform", level: 80, group: "Automatización" },
  { name: "React", level: 82, group: "Desarrollo" },
  { name: "JavaScript", level: 85, group: "Desarrollo" },
  { name: "Python", level: 78, group: "Desarrollo" },
  { name: "Flutter / móvil", level: 70, group: "Desarrollo" },
  { name: "GitHub", level: 80, group: "Desarrollo" },
  { name: "IA generativa", level: 88, group: "IA" },
  { name: "Azure AI", level: 72, group: "IA" },
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
  { value: 6, suffix: "", label: "obras de infraestructura en El Cóndor" },
  { value: 30, suffix: "+", label: "meses en obra civil" },
  { value: 4, suffix: "", label: "frentes coordinados al mismo tiempo" },
  { value: 98, suffix: "%", label: "menos peso por consulta en nómina" },
  { value: 20, suffix: "+", label: "certificaciones y títulos" },
];

/**
 * Comentarios de jefes y compañeros: se guardan en Firebase Firestore
 * (colección "testimonios", espacios 1 a 4). Sigue FIREBASE.md y pega aquí
 * el projectId y la apiKey web de tu proyecto. Mientras estén vacíos, el
 * formulario envía el comentario por WhatsApp.
 */
export const testimoniosDb = {
  projectId: "",
  apiKey: "",
  slots: 4,
};

export type Certification = { title: string; issuer: string; year: string; kind: string; file?: string; badge?: string };

export const education: Certification[] = [
  { title: "Ingeniero Electrónico", issuer: "Universidad Popular del Cesar · Valledupar", year: "2023", kind: "Pregrado" },
  { title: "Técnico en Seguridad y Sistemas Informáticos", issuer: "SENA · Regional Cesar", year: "2018", kind: "Técnico" },
  { title: "Técnico en Sistemas", issuer: "SENA · Regional Cesar", year: "2017", kind: "Técnico" },
];

export const certifications: Certification[] = [
  { title: "Manejo de explosivos y accesorios de voladura", issuer: "SENA · 48 h · Vegachí", year: "2024", kind: "Obra" },
  { title: "Desarrollo Frontend React Career", issuer: "Coderhouse · 26 semanas · Top 10", year: "2022", kind: "Desarrollo" },
  { title: "Desarrollo Web", issuer: "Coderhouse · 38 h · Top 10", year: "2022", kind: "Desarrollo" },
  { title: "JavaScript", issuer: "Coderhouse · 34 h · Top 10", year: "2022", kind: "Desarrollo" },
  { title: "React Js", issuer: "Coderhouse · 28 h", year: "2022", kind: "Desarrollo" },
  { title: "Gestor Tecnológico Certificado", issuer: "Asociación de Tecnología, Gestión e Ingeniería Aplicada", year: "—", kind: "Gestión" },
  { title: "Ofimática", issuer: "SENA · 40 h", year: "2016", kind: "Ofimática" },
];

/** Certificaciones Microsoft (código de examen). */
export const microsoftCerts = [
  { code: "AI-102", title: "Azure AI Engineer Associate", level: "Associate" },
  { code: "AZ-204", title: "Azure Developer Associate", level: "Associate" },
  { code: "AZ-120", title: "Azure for SAP Workloads Specialty", level: "Specialty" },
  { code: "MS-700", title: "Teams Administrator Associate", level: "Associate" },
  { code: "MB-210", title: "Dynamics 365 Sales Functional Consultant", level: "Associate" },
  { code: "PL-900", title: "Power Platform Fundamentals", level: "Fundamentals" },
  { code: "AZ-900", title: "Azure Fundamentals", level: "Fundamentals" },
  { code: "MS-900", title: "Microsoft 365 Fundamentals", level: "Fundamentals" },
  { code: "SC-900", title: "Security, Compliance and Identity Fundamentals", level: "Fundamentals" },
  { code: "MO-111", title: "Office Specialist: Word Expert", level: "Expert" },
  { code: "62-193", title: "Microsoft Certified Educator", level: "Educator" },
];
