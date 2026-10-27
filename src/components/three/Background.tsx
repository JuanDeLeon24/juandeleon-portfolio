"use client";
import dynamic from "next/dynamic";

const CircuitBackground = dynamic(() => import("./CircuitBackground"), { ssr: false });

export function Background() {
  return <CircuitBackground />;
}
