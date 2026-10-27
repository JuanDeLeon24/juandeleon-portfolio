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
    "Ingeniero Electrónico con más de dos años y medio en proyectos de infraestructura con Construcciones El Cóndor: infraestructura vial, estructuras de puentes, infraestructura minera, producción de mezclas asfálticas y obras subterráneas. Uno la obra con la tecnología mediante aplicaciones, automatizaciones, análisis de datos e inteligencia artificial.",
  locale: "es_CO",
  keywords: [
    "Juan Sebastián De León Rapalino",
    "Ingeniero Electrónico",
    "Construcciones El Cóndor",
    "control de producción",
    "control de obra",
    "ejecución de obra",
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
    "Seis proyectos en dos años y medio: infraestructura vial, puentes, infraestructura minera, pavimentos flexibles y obras subterráneas. En cada una encontré un proceso manual y lo convertí en una herramienta.",
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
        "En 2024 llegué a Construcciones El Cóndor como Auxiliar de Control, a cargo del control y seguimiento de la ejecución de obra. Desde entonces recorrí la Autopista Río Magdalena 2, la planta de beneficio de un proyecto minero en Marmato, la rehabilitación de puentes en Risaralda, la rehabilitación de pavimentos flexibles y una planta de mezclas asfálticas en La Pintada, y hoy el Túnel del Toyo.",
    },
    {
      title: "El código como herramienta de obra",
      body:
        "Identifico los cuellos de botella del control de obra y los resuelvo con herramientas propias: aplicaciones, automatizaciones y análisis de datos que eliminan reprocesos, reducen errores de digitación y entregan información confiable y oportuna.",
    },
  ],
  difference: [
    "Integro el conocimiento técnico de campo con el desarrollo de software.",
    "Automatizo con control: cada proceso incluye validación humana y trazabilidad.",
    "Implemento soluciones que llegan a operación real en los proyectos.",
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
    role: "Auxiliar de Control · Control y ejecución de obra",
    place: "Vegachí, Antioquia",
    summary: "Llegada a El Cóndor en una concesión vial 4G: control de producción, insumos, equipo pesado y personal; certificación SENA en manejo de explosivos y voladura.",
    highlights: ["Control de producción", "Explosivos y voladura (SENA)", "Digitalización de formatos"],
  },
  {
    period: "Jul 2025 – Mar 2026",
    title: "Cuatro frentes a la vez",
    org: "Construcciones El Cóndor S.A.",
    role: "Auxiliar de Control · Control y ejecución de obra",
    place: "Caldas, Risaralda y Antioquia",
    summary: "Coordinación simultánea del movimiento masivo de tierras y montaje de la planta de beneficio en Marmato, el recalce de dovelas en puentes de Irra, la rehabilitación de pavimentos flexibles en Pacífico 2 y la planta de mezclas asfálticas Poblanco.",
    highlights: ["Lower Mine Marmato 2", "Rehabilitación de puentes · Irra", "Pavimentos flexibles · Pacífico 2"],
  },
  {
    period: "Mar 2026 – hoy",
    title: "Túnel del Toyo",
    org: "Construcciones El Cóndor S.A.",
    role: "Auxiliar de Control · Control y ejecución de obra",
    place: "Santa Fe de Antioquia",
    summary: "Control del personal de túneles, aprobación de jornadas, imputación a centros de costo y herramientas propias que automatizan el proceso.",
    highlights: ["Aprobador de jornadas", "Control de concretos", "Auditor de equipos"],
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
  aportes: string[];
  innovacion: string[];
  valor: string;
};

/** Obras en orden cronológico, según la hoja de vida. */
export const obras: Obra[] = [
  {
    name: "Autopista Río Magdalena 2",
    tag: "Concesión vial 4G",
    place: "Vegachí, Antioquia",
    period: "Feb 2024 – Jul 2025",
    lat: 6.77,
    lon: -74.8,
    text: "Concesión vial de cuarta generación donde consolidé el enfoque de digitalización aplicada al control de producción en infraestructura.",
    facts: ["Control de producción", "Horómetros de equipo pesado", "Explosivos y voladura"],
    aportes: ["Organización y estructuración de bases de datos de obra.", "Optimización de formatos operativos.", "Mecanismos de seguimiento de actividades.", "Estandarización de procesos de control."],
    innovacion: ["Excel avanzado.", "Automatizaciones.", "Tableros de control.", "Gestión digital de datos.", "Modelos de seguimiento de rendimiento."],
    valor: "Ayudé a sentar las bases de una gestión más moderna de la información y a demostrar que la tecnología es un aliado para la eficiencia en proyectos de infraestructura.",
  },
  {
    name: "Lower Mine Marmato 2",
    tag: "Movimiento de tierras · planta de beneficio",
    place: "Marmato, Caldas",
    period: "Jul 2025 – Mar 2026",
    lat: 5.47,
    lon: -75.6,
    text: "Movimiento masivo de tierras y montaje de la planta de beneficio (procesamiento de mineral) del proyecto minero, en un entorno de alta complejidad operativa donde impulsé la digitalización de la información productiva.",
    facts: ["Movimiento masivo de tierras", "Montaje de planta de beneficio", "Control de rendimientos"],
    aportes: ["Estandarización de registros de campo.", "Seguimiento detallado de actividades ejecutadas.", "Controles para garantizar la consistencia de los datos.", "Organización de información operacional para análisis.", "Estructuras para el control de rendimientos."],
    innovacion: ["Automatización de cálculos.", "Indicadores operativos.", "Consolidación de información de distintas fuentes.", "Menos tiempo en procesos manuales."],
    valor: "Convertí grandes volúmenes de datos operativos en información clara y procesable, para entender la evolución de los trabajos y elaborar informes técnicos.",
  },
  {
    name: "Rehabilitación de puentes · Irra",
    tag: "Rehabilitación estructural",
    place: "Irra, Risaralda",
    period: "Jul 2025 – Mar 2026",
    lat: 5.27,
    lon: -75.66,
    text: "Reparación y recalce de dovelas en la superestructura de puentes: una intervención estructural que exige control y documentación rigurosa.",
    facts: ["Estructuras", "Cantidades de obra", "Centros de costo"],
    aportes: ["Seguimiento técnico de actividades especializadas.", "Organización documental de procesos constructivos.", "Control de avances ejecutados.", "Gestión estructurada de soportes y evidencias."],
    innovacion: ["Control fotográfico organizado.", "Consolidación automática de reportes.", "Seguimiento de cantidades ejecutadas.", "Trazabilidad de intervenciones."],
    valor: "Mejoré la capacidad de documentar técnicamente cada actividad, con más transparencia e información disponible para supervisión y control.",
  },
  {
    name: "Rehabilitación de pavimentos · Pacífico 2",
    tag: "Pavimentos flexibles",
    place: "La Pintada, Antioquia",
    period: "Jul 2025 – Mar 2026",
    lat: 5.75,
    lon: -75.6,
    text: "Rehabilitación de pavimentos flexibles en un corredor de infraestructura vial: fresado, riego de liga y extendido de mezcla asfáltica en caliente. Optimicé el seguimiento de actividades y el control de producción.",
    facts: ["Pavimentos", "Rendimientos", "Reportes diarios"],
    aportes: ["Sistematización de información de obra.", "Mejor control de rendimientos diarios.", "Consolidación de datos de producción.", "Estandarización de formatos de reporte."],
    innovacion: ["Herramientas automatizadas de consolidación.", "Bases de datos operativas.", "Hojas de cálculo avanzadas para análisis y control."],
    valor: "Menos esfuerzo administrativo y reportes más rápidos, confiables y comparables.",
  },
  {
    name: "Planta de mezclas asfálticas Poblanco",
    tag: "Producción de mezclas asfálticas",
    place: "La Pintada, Antioquia",
    period: "Jul 2025 – Mar 2026",
    lat: 5.72,
    lon: -75.64,
    text: "Planta de producción de mezclas asfálticas en caliente para pavimentos flexibles. Trabajé con una visión de control integral de la producción y de la información.",
    facts: ["Producción de mezcla", "Horas máquina", "Power BI"],
    aportes: ["Organización de registros productivos.", "Seguimiento de indicadores operacionales.", "Consolidación de información de planta.", "Mecanismos de control para la toma de decisiones."],
    innovacion: ["Automatización de reportes.", "Herramientas digitales de análisis.", "Sistemas de consolidación de datos."],
    valor: "La información operativa se analiza con más rapidez y precisión, y el monitoreo de la producción es más sólido.",
  },
  {
    name: "Túnel del Toyo",
    tag: "Túnel",
    place: "Santa Fe de Antioquia",
    period: "Mar 2026 – hoy",
    lat: 6.56,
    lon: -75.83,
    text: "Uno de los proyectos de infraestructura más importantes del país. Fortalecimiento del control operacional con una visión de transformación digital.",
    facts: ["Turnos de 9,5 y 10,5 h", "Control de concretos", "Jornadas automatizadas"],
    aportes: ["Sistemas de control para actividades subterráneas.", "Información técnica de galerías, módulos y frentes organizada.", "Metodologías para registrar avances de forma sistemática y auditable.", "Herramientas para cuantificar actividades ejecutadas con precisión.", "Modelos digitales para el seguimiento de producción.", "Dispositivos móviles como medio de captura en campo."],
    innovacion: ["Aplicaciones móviles para gestión de actividades.", "Generación automática de informes.", "Sistemas de cuantificación de obra.", "Dashboards de avance.", "Integración entre Excel y software a la medida."],
    valor: "La información dejó de estar dispersa en múltiples archivos y formatos: ahora es un sistema estructurado para decidir, reportar, hacer seguimiento contractual, controlar la productividad y consultar el histórico.",
  },
];

/** El hilo conductor de todas las obras. */
export const hilo = {
  statement:
    "He actuado como un puente entre la ingeniería de campo y la transformación digital: llevo herramientas tecnológicas y metodologías basadas en datos a entornos dominados por procesos manuales.",
  puntos: [
    "Convertir datos en información útil.",
    "Automatizar procesos repetitivos.",
    "Mejorar la calidad de los registros.",
    "Reducir tiempos administrativos.",
    "Incrementar la trazabilidad de las actividades.",
    "Facilitar la toma de decisiones.",
    "Impulsar la innovación en infraestructura vial, minera y de transporte.",
  ],
};

export const condor = {
  intro:
    "Construcciones El Cóndor es una de las constructoras de infraestructura más grandes de Colombia. Desde febrero de 2024 trabajo como Auxiliar de Control en el control y la ejecución de obra: seguimiento de frentes de trabajo, producción, recursos y coordinación con proveedores y áreas técnicas.",
  activities: [
    "Control de producción y avance de obra",
    "Coordinación de frentes, proveedores y áreas técnicas",
    "Control de costos y centros de costo",
    "Imputación de mano de obra y equipo pesado",
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
      text: "Concretos, equipo pesado, personal y avance de obra pasaron del papel a aplicaciones web y móviles, con la información disponible al instante para el control de la obra.",
    },
    {
      title: "Aprobación de jornadas automatizada",
      text: "Cruza las marcaciones del personal contra la programación y asigna centros de costo: la revisión manual se reduce a validar con OK.",
    },
    {
      title: "Auditor de equipos",
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
    title: "Auditor de equipo pesado",
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
    summary: "Aplicación móvil para el control de despachos de concreto en los vaciados del revestimiento del túnel. Funciona 100 % sin internet.",
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
    summary: "Aplicación que lee el informe diario de obra en Excel y representa el avance real de cada módulo del túnel.",
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
      "Aplicación en Streamlit y reportes HTML que funcionan sin internet.",
    ],
    stack: ["Python", "Machine Learning", "Streamlit", "pytest"],
    image: "dashboard",
    repo: "https://github.com/JuanDeLeon24/QuantSignal-Analyzer",
  },
  {
    name: "Primeros pasos",
    kind: "Formación y aplicaciones móviles (2023)",
    summary: "Curso de Python de OpenBootCamp, primeras aplicaciones Android y páginas de aterrizaje: la base de todo lo que vino después.",
    bullets: ["Python desde cero hasta proyectos.", "Aplicaciones Android y móviles.", "Landing pages y formularios de acceso."],
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
    "La inteligencia artificial complementa el criterio técnico: acelera el análisis, el cruce de información y la elaboración de documentos, integrada con las herramientas de gestión del proyecto.",
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
  { value: 6, suffix: "", label: "proyectos de infraestructura en El Cóndor" },
  { value: 30, suffix: "+", label: "meses en proyectos de infraestructura" },
  { value: 4, suffix: "", label: "frentes coordinados al mismo tiempo" },
  { value: 98, suffix: "%", label: "menos peso por consulta en nómina" },
  { value: 20, suffix: "+", label: "certificaciones y títulos" },
];

/** Contactos de referencia: jefes y compañeros que pueden dar fe del trabajo. */
export type Referencia = { name: string; role: string; phone: string };

export const referencias: Referencia[] = [
  { name: "Andrés Córdoba Hincapié", role: "Director de Agregados San Javier", phone: "+57 313 691 3185" },
  { name: "Juan Sebastián Gómez López", role: "Ingeniero Residente Civil de Puentes", phone: "+57 314 681 7271" },
  { name: "Angie Julieth Losada Cañaveral", role: "Ingeniera Civil · Especialista en Gerencia de Proyectos", phone: "+57 318 066 7534" },
  { name: "Verónica Mesa Correa", role: "Coordinadora de Operaciones", phone: "+57 310 283 4594" },
];

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
