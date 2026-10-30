"use client";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { hero } from "@/content/profile";
import { media, videos } from "@/content/media";
import { scrollToId } from "../ui/SmoothScroll";
import { asset } from "@/lib/asset";

const TunnelScene = dynamic(() => import("../three/TunnelScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

// Bóveda de túnel en el punto de fuga de la escena 3D → pantalla completa.
const CLIP_START = "inset(44% 45% 36% 45% round 50% 50% 8% 8%)";
const CLIP_END = "inset(0% 0% 0% 0% round 0% 0% 0% 0%)";

/**
 * Hero en secuencia fijada: el túnel 3D (digital) acelera con el scroll y el
 * video real del túnel se abre desde su punto de fuga con forma de bóveda.
 * Una retícula de escaneo se disuelve sobre el video: de lo digital a lo físico.
 */
export function Hero() {
  const words = hero.title.split(" ");
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const rec = videos.recorrido;
  const posterSrc = rec.posterSrc ?? media[rec.poster].src;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      let playing = false;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=190%",
          pin: q("[data-stage]")[0],
          scrub: 0.6,
          onUpdate: (st) => {
            const v = video.current;
            if (!v) return;
            if (st.progress > 0.08 && !playing) {
              playing = true;
              v.play().catch(() => {});
            } else if (st.progress < 0.04 && playing) {
              playing = false;
              v.pause();
            }
          },
        },
      });
      gsap.set(q("[data-reveal-video]"), { clipPath: CLIP_START, autoAlpha: 0 });
      tl.to(q("[data-hero-content]"), { autoAlpha: 0, y: -80, duration: 0.25 }, 0)
        .to(q("[data-reveal-video]"), { autoAlpha: 1, duration: 0.06 }, 0.12)
        .to(q("[data-reveal-video]"), { clipPath: CLIP_END, duration: 0.5, ease: "power2.in" }, 0.15)
        .fromTo(q("[data-video-inner]"), { scale: 1.5 }, { scale: 1, duration: 0.6, ease: "power1.out" }, 0.15)
        .to(q("[data-scene]"), { scale: 1.9, autoAlpha: 0, duration: 0.4, ease: "power2.in" }, 0.35)
        .fromTo(q("[data-grid]"), { autoAlpha: 0.85 }, { autoAlpha: 0, duration: 0.3 }, 0.55)
        .fromTo(q("[data-scan]"), { yPercent: -10, autoAlpha: 0 }, { yPercent: 1000, autoAlpha: 1, duration: 0.3 }, 0.5)
        .to(q("[data-scan]"), { autoAlpha: 0, duration: 0.05 }, 0.8)
        .fromTo(q("[data-video-caption]"), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.8)
        .to({}, { duration: 0.1 });
    },
    { scope: root },
  );

  return (
    <section id="inicio" ref={root} className="relative">
      <div data-stage className="relative flex h-[100svh] items-end overflow-hidden pb-[min(5rem,6vh)] pt-24">
      <div data-scene className="absolute inset-0 will-change-transform">
        <TunnelScene className="h-full w-full" />
        {/* viñeta cinematográfica para legibilidad del texto */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#05070a_88%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ground via-ground/70 to-transparent" />
      </div>

      {/* Túnel real: aparece por la bóveda en el punto de fuga */}
      <div data-reveal-video className="invisible absolute inset-0 overflow-hidden" aria-hidden="true">
        <div data-video-inner className="absolute inset-0 will-change-transform">
          <video
            ref={video}
            className="h-full w-full object-cover"
            poster={asset(posterSrc)}
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={asset(rec.webm)} type="video/webm" />
            <source src={asset(rec.src)} type="video/mp4" />
          </video>
        </div>
        {/* retícula digital que se disuelve sobre el video */}
        <div
          data-grid
          className="pointer-events-none absolute inset-0 mix-blend-screen"
          style={{
            backgroundImage:
              "linear-gradient(rgba(57,213,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(57,213,255,0.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div data-scan className="pointer-events-none absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-transparent via-hivis/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        <div data-video-caption className="invisible absolute inset-x-0 bottom-0">
          <div className="wrap pb-14 md:pb-20">
            <span className="tnum inline-block rounded-full bg-hivis px-3 py-1 text-sm font-semibold text-black">De lo digital a lo físico</span>
            <p className="display mt-4 text-[clamp(2rem,4.5vw,4.2rem)] font-extrabold">{rec.title}</p>
            <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-ink/90 md:text-lg">{rec.caption}</p>
          </div>
        </div>
      </div>

      <div data-hero-content className="wrap relative grid gap-10 md:grid-cols-12">
        <div className="md:col-span-11 lg:col-span-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }} className="mb-6 flex items-center gap-3 md:hidden">
            <span className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-hivis">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset("/media/juan-avatar.webp")} alt="" className="h-full w-full object-cover" width={48} height={48} />
            </span>
            <span className="text-[15px] leading-tight text-ink/85">
              Juan Sebastián De León
              <br />
              <span className="text-ink/60">Ingeniero Electrónico</span>
            </span>
          </motion.div>
          <h1 className="display max-w-[22ch] text-[clamp(1.5rem,min(4.9vw,6.3vh),5.4rem)] font-extrabold">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", rotateX: -60 }}
                  animate={{ y: 0, rotateX: 0 }}
                  transition={{ duration: 1.1, ease, delay: 0.25 + i * 0.045 }}
                >
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.9 }}
            className="mt-[min(1.75rem,3vh)] max-w-[52ch] text-base leading-relaxed text-ink/85 md:text-[clamp(1rem,2.4vh,1.25rem)]"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.05 }}
            className="mt-[min(2.5rem,4.5vh)] flex flex-wrap gap-3"
          >
            <HeroButton primary onClick={() => scrollToId("trayectoria")}>Ver experiencia</HeroButton>
            <HeroButton onClick={() => scrollToId("proyectos")}>Explorar proyectos</HeroButton>
            <HeroButton onClick={() => scrollToId("contacto")}>Contactarme</HeroButton>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="hidden self-end text-right text-sm text-ink/70 md:col-span-2 md:col-start-11 md:block lg:col-span-3 lg:col-start-10"
        >
          <span className="mb-4 ml-auto block h-[min(5rem,10vh)] w-[min(5rem,10vh)] overflow-hidden rounded-full ring-2 ring-hivis ring-offset-4 ring-offset-ground">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/media/juan-avatar.webp")} alt="" className="h-full w-full object-cover" width={80} height={80} />
          </span>
          <p className="text-ink">Juan Sebastián De León Rapalino</p>
          <p>Ingeniero Electrónico</p>
          <p>Construcciones El Cóndor · Antioquia</p>
        </motion.div>
      </div>
      </div>
    </section>
  );
}

function HeroButton({ children, onClick, primary }: { children: React.ReactNode; onClick: () => void; primary?: boolean }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={
        primary
          ? "rounded-full bg-hivis px-7 py-[min(0.875rem,1.7vh)] text-base font-semibold text-black"
          : "glass rounded-full px-7 py-[min(0.875rem,1.7vh)] text-base font-medium text-ink transition-colors hover:bg-white/10"
      }
    >
      {children}
    </motion.button>
  );
}
