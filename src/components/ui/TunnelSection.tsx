/** Sección transversal de túnel en herradura, dibujada para el sitio. */
export function TunnelSection({ className = "", label }: { className?: string; label: string }) {
  return (
    <svg viewBox="0 0 320 240" role="img" aria-label={label} className={className}>
      <defs>
        <pattern id="roca" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="10" height="10" fill="#0b1016" />
          <rect width="3" height="10" fill="#121a23" />
        </pattern>
      </defs>
      <rect width="320" height="240" fill="url(#roca)" />
      <path d="M70 220 V120 a90 90 0 0 1 180 0 V220 Z" fill="#05070a" />
      <path d="M70 220 V120 a90 90 0 0 1 180 0 V220" fill="none" stroke="#ff6b1a" strokeWidth="5" />
      <path d="M82 220 V122 a78 78 0 0 1 156 0 V220" fill="none" stroke="#39d5ff" strokeWidth="1.5" strokeDasharray="6 6" />
      <rect x="70" y="212" width="180" height="8" fill="#1a2430" />
      {[...Array(9)].map((_, i) => {
        const a = Math.PI - (i * Math.PI) / 8;
        const x1 = 160 + Math.cos(a) * 90;
        const y1 = 120 - Math.sin(a) * 90;
        const x2 = 160 + Math.cos(a) * 118;
        const y2 = 120 - Math.sin(a) * 118;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#a3b0bd" strokeWidth="2" strokeOpacity="0.5" />;
      })}
      <circle cx="160" cy="36" r="4" fill="#39d5ff" />
    </svg>
  );
}
