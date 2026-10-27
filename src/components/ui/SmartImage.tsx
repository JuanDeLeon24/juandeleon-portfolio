"use client";
import { useState } from "react";
import type { MediaItem } from "@/content/media";
import { asset } from "@/lib/asset";

/**
 * Imagen con carga diferida y respaldo: si la fuente remota no responde,
 * muestra una sección técnica dibujada en lugar de un hueco roto.
 */
export function SmartImage({
  item,
  className = "",
  priority = false,
  sizes,
}: {
  item: MediaItem;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Fallback label={item.alt} className={className} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(item.src)}
      alt={item.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}

function Fallback({ label, className }: { label: string; className: string }) {
  return (
    <svg role="img" aria-label={label} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={`h-full w-full bg-surface-2 ${className}`}>
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={`M${60 + i * 14} 300 V${170 - i * 6} a${140 - i * 14} ${140 - i * 14} 0 0 1 ${280 - i * 28} 0 V300`}
          fill="none"
          stroke={i % 3 === 0 ? "#ff6b1a" : "#39d5ff"}
          strokeOpacity={0.15 + (i % 3) * 0.1}
          strokeWidth={i % 3 === 0 ? 2 : 1}
        />
      ))}
    </svg>
  );
}
