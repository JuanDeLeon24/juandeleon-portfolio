import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import { site, contact } from "@/content/profile";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", axes: ["wdth"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · Tecnología aplicada a la obra civil`, template: `%s · ${site.shortName}` },
  description: site.description,
  keywords: site.keywords,
  authors: [{ name: site.name, url: contact.github }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} · Tecnología aplicada a la obra civil`,
    description: site.description,
    firstName: "Juan Sebastián",
    lastName: "De León Rapalino",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Tecnología aplicada a la obra civil`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      alternateName: site.shortName,
      jobTitle: "Ingeniero Electrónico",
      description: site.description,
      url: site.url,
      email: `mailto:${contact.email}`,
      telephone: contact.phoneDisplay,
      sameAs: [contact.github, contact.linkedin],
      address: { "@type": "PostalAddress", addressRegion: "Antioquia", addressCountry: "CO" },
      worksFor: { "@type": "Organization", name: "Construcciones El Cóndor S.A.", url: "https://elcondor.com" },
      knowsAbout: [
        "Automatización de procesos",
        "Inteligencia artificial",
        "Control operativo",
        "Obra civil",
        "Infraestructura vial",
        "Pavimentos flexibles",
        "Construcción subterránea",
        "Power BI",
        "Python",
        "Flutter",
        "VBA",
      ],
      hasOccupation: { "@type": "Occupation", name: "Ingeniero Electrónico", occupationLocation: { "@type": "Country", name: "Colombia" } },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      inLanguage: "es-CO",
      publisher: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" className={`${archivo.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-hivis focus:px-4 focus:py-2 focus:text-black">
          Saltar al contenido
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
