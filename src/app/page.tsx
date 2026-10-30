import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Timeline } from "@/components/sections/Timeline";
import { Condor } from "@/components/sections/Condor";
import { Projects } from "@/components/sections/Projects";
import { SideProjects } from "@/components/sections/SideProjects";
import { Skills } from "@/components/sections/Skills";
import { AI } from "@/components/sections/AI";
import { Obras } from "@/components/sections/Obras";
import { Impact } from "@/components/sections/Impact";
import { Testimonials } from "@/components/sections/Testimonials";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { CircuitConnector } from "@/components/ui/CircuitConnector";
import { Background } from "@/components/three/Background";
import { PhotoBand } from "@/components/ui/PhotoBand";
import { media, videos } from "@/content/media";

export default function Home() {
  return (
    <>
      <Background />
      <Nav />
      <main id="contenido">
        <Hero />
        <About />
        <PhotoBand items={[media.toyoPortalFormaleta]} chainage="K0+000 · Portal de entrada" label="Portal de entrada del Túnel 0" video={videos.portal} />
        <Timeline />
        <CircuitConnector label="K3+400" />
        <Condor />
        <PhotoBand items={[media.toyoRevestimientoMixer, media.toyoCarroEncofrado]} chainage="Módulos de revestimiento" label="Revestimiento del Túnel del Toyo" />
        <CircuitConnector flip label="K5+200" />
        <Projects />
        <SideProjects />
        <PhotoBand items={[media.toyoImpermeabilizacion]} chainage="Impermeabilización" label="Impermeabilización del Túnel del Toyo" align="right" />
        <Skills />
        <AI />
        <Obras />
        <Impact />
        <Testimonials />
        <Certifications />
        <PhotoBand items={[media.toyoPortalEmboquille]} chainage="K9+730 · Emboquille" label="Emboquille del Túnel del Toyo · portal" />
        <CircuitConnector label="K9+730" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
