"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Pista de circuito que se dibuja con el scroll entre dos secciones y termina
 * en un detalle de plano (sección de túnel con cota). Une visualmente el
 * lenguaje electrónico con el de la obra civil.
 */
export function CircuitConnector({ flip = false, label = "K0+000" }: { flip?: boolean; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 40%"] });
  const draw = useTransform(scrollYProgress, [0, 0.75], [0, 1]);
  const appear = useTransform(scrollYProgress, [0.55, 0.9], [0, 1]);

  return (
    <div ref={ref} className="pointer-events-none relative h-40 md:h-56" aria-hidden="true">
      <svg viewBox="0 0 1200 220" preserveAspectRatio="none" className={`absolute inset-0 h-full w-full ${flip ? "-scale-x-100" : ""}`}>
        {/* pistas paralelas tipo bus de datos */}
        {[0, 14, 28].map((o, i) => (
          <motion.path
            key={o}
            d={`M ${80 + o} 0 V ${70 + o} L ${120 + o} ${110 + o} H ${760 - o} L ${800 - o} ${150 + o} V 220`}
            fill="none"
            stroke={i === 1 ? "#ff6b1a" : "#39d5ff"}
            strokeOpacity={i === 1 ? 0.7 : 0.45}
            strokeWidth={i === 1 ? 2.2 : 1.4}
            style={{ pathLength: draw }}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <motion.g style={{ opacity: appear }}>
          {[80, 94, 108].map((x) => (
            <circle key={x} cx={x} cy={4} r={4} fill="#05070a" stroke="#39d5ff" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          ))}
        </motion.g>
      </svg>
      {/* detalle de plano al final de la pista */}
      <motion.div style={{ opacity: appear, scale: appear }} className={`absolute bottom-2 ${flip ? "left-[28%]" : "right-[28%]"} hidden md:block`}>
        <svg width="150" height="90" viewBox="0 0 150 90">
          <path d="M35 80 V48 a40 40 0 0 1 80 0 V80" fill="none" stroke="#39d5ff" strokeOpacity="0.55" strokeWidth="1.4" />
          <path d="M43 80 V49 a32 32 0 0 1 64 0 V80" fill="none" stroke="#ff6b1a" strokeOpacity="0.55" strokeWidth="1.2" strokeDasharray="4 4" />
          <path d="M35 87 H115 M35 83 V90 M115 83 V90" stroke="#a3b0bd" strokeOpacity="0.5" />
          <text x="120" y="20" fill="#ff6b1a" fillOpacity="0.8" fontSize="11" fontFamily="ui-sans-serif, system-ui">
            {label}
          </text>
        </svg>
      </motion.div>
    </div>
  );
}
