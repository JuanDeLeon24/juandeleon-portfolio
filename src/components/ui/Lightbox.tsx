"use client";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Diálogo modal accesible: cierra con Escape, clic fuera o el botón. */
export function Lightbox({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.__lenis?.start();
      prev?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] grid place-items-center bg-black/75 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 40, rotateX: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90svh] w-full max-w-4xl overflow-y-auto rounded-[32px] bg-surface shadow-2xl"
            data-lenis-prevent
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-black/60 text-2xl text-ink transition hover:bg-hivis hover:text-black"
              aria-label="Cerrar"
            >
              ×
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
