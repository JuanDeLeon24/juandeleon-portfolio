"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { hero } from "@/content/profile";
import { scrollToId } from "../ui/SmoothScroll";
import { asset } from "@/lib/asset";

const TunnelScene = dynamic(() => import("../three/TunnelScene"), { ssr: false });

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const words = hero.title.split(" ");
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-28 md:pb-20">
      <div className="absolute inset-0">
        {hero.video ? (
          <video className="h-full w-full object-cover opacity-60" src={asset(hero.video)} autoPlay muted loop playsInline preload="metadata" />
        ) : (
          <TunnelScene className="h-full w-full" />
        )}
        {/* viñeta cinematográfica para legibilidad del texto */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#05070a_88%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ground via-ground/70 to-transparent" />
      </div>

      <div className="wrap relative grid gap-10 md:grid-cols-12">
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
          <h1 className="display max-w-[22ch] text-[clamp(2.3rem,4.9vw,5.4rem)] font-extrabold">
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
            className="mt-7 max-w-[52ch] text-lg leading-relaxed text-ink/85 md:text-xl"
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.05 }}
            className="mt-10 flex flex-wrap gap-3"
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
          <span className="mb-4 ml-auto block h-20 w-20 overflow-hidden rounded-full ring-2 ring-hivis ring-offset-4 ring-offset-ground">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/media/juan-avatar.webp")} alt="" className="h-full w-full object-cover" width={80} height={80} />
          </span>
          <p className="text-ink">Juan Sebastián De León Rapalino</p>
          <p>Ingeniero Electrónico</p>
          <p>Construcciones El Cóndor · Antioquia</p>
        </motion.div>
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
          ? "rounded-full bg-hivis px-7 py-3.5 text-base font-semibold text-black"
          : "glass rounded-full px-7 py-3.5 text-base font-medium text-ink transition-colors hover:bg-white/10"
      }
    >
      {children}
    </motion.button>
  );
}
