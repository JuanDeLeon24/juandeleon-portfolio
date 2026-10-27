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

export default function Home() {
  return (
    <>
      <Background />
      <Nav />
      <main id="contenido">
        <Hero />
        <About />
        <Timeline />
        <CircuitConnector label="K3+400" />
        <Condor />
        <CircuitConnector flip label="K5+200" />
        <Projects />
        <SideProjects />
        <Skills />
        <AI />
        <Obras />
        <Impact />
        <Testimonials />
        <Certifications />
        <CircuitConnector label="K9+730" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
