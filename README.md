# Juan Sebastián De León Rapalino · Portafolio

Portafolio interactivo de un Ingeniero Electrónico que creció dentro de la obra: tecnología, automatización e inteligencia artificial aplicadas a la obra civil, con la experiencia en Construcciones El Cóndor como eje.

**En línea:** https://juandeleon24.github.io/juandeleon-portfolio/

## Concepto

La página se recorre como un túnel. La barra superior marca la **abscisa** (K0+000 → K9+730) a medida que se baja, el hero es un **escaneo LiDAR** de un túnel en herradura generado con Three.js, y el fondo de todo el sitio son **pistas de circuito impreso que desembocan en planos** (secciones de túnel, cotas, ejes y abscisas) por donde viajan pulsos de señal: la unión entre la electrónica y la obra civil.

La pieza interactiva es una **calculadora de jornada de túnel** que aplica las reglas reales del Aprobador de jornadas (tolerancia de llegada, redondeo de la salida, recesos y base de extras).

## Tecnología

Next.js 15 (exportación estática) · TypeScript · Tailwind CSS 4 · Three.js · GSAP + ScrollTrigger · Framer Motion · Lenis.
AOS no se incluyó: GSAP ScrollTrigger y Framer Motion cubren las animaciones de scroll sin duplicar librerías.

## Estructura

```
src/
  app/                 layout (SEO, Schema.org, Open Graph), página, robots, sitemap, manifest, imagen OG
  content/
    profile.ts         TODO el contenido: textos, experiencia, proyectos, cifras, testimonios, certificados
    media.ts           registro de imágenes con fuente y licencia (los créditos del pie salen de aquí)
  components/
    sections/          Hero, About, Timeline, Condor, Projects, SideProjects, Skills, AI, Obras, Impact,
                       Testimonials, Certifications, Contact, Footer
    three/             TunnelScene (hero 3D) y CircuitBackground (fondo de circuitos y planos)
    ui/                Nav, Reveal, TiltCard, Lightbox, Counter, JornadaCalculator, CircuitConnector…
  lib/                 gsap, reglas de jornada, rutas de assets
public/media/          fotos, videos y certificados propios
.claude/skills/        skills de diseño instaladas desde ComposioHQ/awesome-claude-skills
```

## Cómo actualizar el contenido

Todo se edita en `src/content/profile.ts`. Los campos marcados con `EDITAR` esperan datos que aún no están confirmados.

| Quieres agregar | Haz esto |
| --- | --- |
| Cambiar tu foto | Reemplaza `public/media/juan.webp` y `public/media/juan-avatar.webp` |
| Video de fondo del hero | `public/media/hero.mp4` y en `hero.video` escribe `"/media/hero.mp4"` |
| Fotos reales de obra | Cópialas a `public/media/` y cambia el `src` en `media.ts` (crédito: "Archivo personal") |
| Certificados | PDF en `public/media/certificados/` y el campo `file` en `certifications` |
| Fotos de obra | Cópialas a `public/media/obras/` y regístralas en `fotosObra` (`media.ts`) con el nombre de la obra: salen en el mapa y en la galería |
| LinkedIn | Cambia `contact.linkedin` por la URL de tu perfil |

## Videos de obra

El sitio ya está preparado para dos videos. Solo hay que subirlos con estos nombres exactos a la carpeta `public/media/video/`:

| Archivo | Dónde aparece |
| --- | --- |
| `tunel0-revestimiento.mp4` | Transición del inicio: el túnel 3D se convierte en el túnel real |
| `tunel0-portal-entrada.mp4` | Franja del portal de entrada, después de "Sobre mí" |

Mientras no existan, se muestran las fotos de esas mismas escenas.

**Preparar cada video** (recomendado: H.264, 1280 o 1920 px de ancho, sin audio, menos de 25 MB):

```bash
ffmpeg -i original.mp4 -an -vf "scale=1920:-2" -c:v libx264 -preset slow -crf 26 -movflags +faststart tunel0-revestimiento.mp4
```

Sin ffmpeg: HandBrake → preset "Fast 1080p30", pestaña Audio sin pistas, casilla "Web Optimized".

**Subirlos desde GitHub:** abre `public/media/video/` en el repositorio → Add file → Upload files → arrastra los dos `.mp4` → Commit changes. La página se publica sola en unos minutos. GitHub no acepta archivos de más de 100 MB.

## Imágenes y derechos

Solo se usan imágenes propias (capturas de Lovely) o con licencia libre (Unsplash, enlazadas desde su CDN). No se copian fotos de El Cóndor ni de terceros con derechos reservados. Si una imagen remota no carga, el sitio muestra en su lugar una sección de túnel dibujada.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # genera /out (sitio estático)
```

Cada push a `main` publica el sitio en GitHub Pages (`.github/workflows/deploy.yml`). En el repositorio: Settings → Pages → Source: **GitHub Actions**.
