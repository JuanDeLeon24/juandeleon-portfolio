"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, testimoniosDb } from "@/content/profile";
import { dbEnabled, guardarComentario, listarComentarios, type Comentario } from "@/lib/testimonios";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const empty = { nombre: "", profesion: "", contacto: "", mostrarContacto: true, comentario: "" };

/**
 * Comentarios de jefes y compañeros: cuatro espacios. Los ocupados muestran
 * el comentario; los libres invitan a escribir. Se guardan en Firestore
 * (ver FIREBASE.md); sin base de datos configurada, el formulario envía
 * el comentario por WhatsApp.
 */
export function Testimonials() {
  const [items, setItems] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(dbEnabled);
  const [loadError, setLoadError] = useState("");
  const [open, setOpen] = useState(false);

  const load = useCallback(async () => {
    if (!dbEnabled) return;
    try {
      setItems(await listarComentarios());
      setLoadError("");
    } catch (e) {
      setLoadError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const slots = Array.from({ length: testimoniosDb.slots }, (_, i) => items.find((c) => c.slot === String(i + 1)) ?? null);
  const full = items.length >= testimoniosDb.slots;

  return (
    <Reveal as="section" id="testimonios" aria-labelledby="test-t" className="py-32 md:py-48">
      <div className="wrap">
        <SectionHeading
          id="test-t"
          chainage="K8+900 · Comentarios"
          title="Lo que dicen quienes trabajan conmigo"
          lead="Cuatro espacios reservados para jefes y compañeros. Si trabajaste conmigo, deja aquí tu comentario."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {slots.map((c, i) => (
            <div key={i} data-reveal>
              {c ? <Filled c={c} featured={i === 0} /> : <EmptySlot loading={loading} onWrite={() => setOpen(true)} disabled={full} />}
            </div>
          ))}
        </div>
        {loadError && <p className="mt-6 text-base text-hivis">{loadError}</p>}

        <AnimatePresence>
          {open && !full && (
            <CommentForm
              ocupados={items.map((c) => c.slot)}
              onClose={() => setOpen(false)}
              onSaved={(c) => {
                setItems((prev) => [...prev, c]);
                setOpen(false);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}

function Filled({ c, featured }: { c: Comentario; featured: boolean }) {
  return (
    <figure className={`flex h-full flex-col rounded-[32px] p-8 md:p-10 ${featured ? "bg-navy" : "neo"}`}>
      <blockquote className="text-lg leading-relaxed text-ink/95 md:text-xl">“{c.comentario}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-4 pt-8">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-hivis text-xl font-bold text-black" aria-hidden="true">
          {c.nombre.trim()[0]?.toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block text-lg font-semibold">{c.nombre}</span>
          <span className="block text-ink/75">{c.profesion}</span>
          {c.mostrarContacto && c.contacto && <span className="block truncate text-sm text-signal">{c.contacto}</span>}
        </span>
      </figcaption>
    </figure>
  );
}

function EmptySlot({ loading, onWrite, disabled }: { loading: boolean; onWrite: () => void; disabled: boolean }) {
  return (
    <div className="flex h-full min-h-[240px] flex-col items-start justify-between rounded-[32px] bg-surface/60 p-8 outline-2 -outline-offset-2 outline-dashed outline-surface-3 md:p-10">
      <p className="text-lg leading-relaxed text-ink/70">{loading ? "Cargando comentarios…" : "Espacio disponible para un comentario de un jefe o compañero."}</p>
      {!loading && (
        <motion.button
          type="button"
          onClick={onWrite}
          disabled={disabled}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 rounded-full bg-hivis px-6 py-3 font-semibold text-black disabled:opacity-50"
        >
          Escribir un comentario
        </motion.button>
      )}
    </div>
  );
}

function CommentForm({ ocupados, onClose, onSaved }: { ocupados: string[]; onClose: () => void; onSaved: (c: Comentario) => void }) {
  const [f, setF] = useState(empty);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!dbEnabled) {
      const text = `Comentario para el portafolio de Juan:\n\n"${f.comentario}"\n\n${f.nombre}\n${f.profesion}\n${f.contacto}`;
      window.open(`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      onClose();
      return;
    }
    setSending(true);
    try {
      onSaved(await guardarComentario({ ...f, nombre: f.nombre.trim(), profesion: f.profesion.trim(), contacto: f.contacto.trim(), comentario: f.comentario.trim() }, ocupados));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  const field = "w-full rounded-2xl bg-surface-3 px-5 py-4 text-lg text-ink placeholder:text-ink/45 outline-none transition focus:ring-2 focus:ring-signal";

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 30, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      exit={{ opacity: 0, y: 20, height: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="glass mt-8 overflow-hidden rounded-[32px]"
      aria-label="Escribir un comentario"
    >
      <div className="grid gap-5 p-7 md:grid-cols-2 md:p-10">
        <h3 className="display text-3xl font-bold md:col-span-2">Tu comentario sobre Juan</h3>
        <label className="block">
          <span className="mb-2 block text-sm text-ink/80">Nombre completo</span>
          <input className={field} required minLength={2} maxLength={80} value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-ink/80">Profesión y cargo</span>
          <input className={field} required minLength={2} maxLength={100} placeholder="Ej.: Ingeniero Residente · El Cóndor" value={f.profesion} onChange={(e) => setF({ ...f, profesion: e.target.value })} autoComplete="organization-title" />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm text-ink/80">Contacto (correo o teléfono)</span>
          <input className={field} maxLength={120} value={f.contacto} onChange={(e) => setF({ ...f, contacto: e.target.value })} autoComplete="email" />
        </label>
        <label className="flex items-center gap-3 text-base md:col-span-2">
          <input type="checkbox" className="h-5 w-5 accent-[#ff6b1a]" checked={f.mostrarContacto} onChange={(e) => setF({ ...f, mostrarContacto: e.target.checked })} />
          Mostrar mi contacto públicamente en la página
        </label>
        <label className="block md:col-span-2">
          <span className="mb-2 block text-sm text-ink/80">Comentario</span>
          <textarea
            className={`${field} min-h-40 resize-y`}
            required
            minLength={10}
            maxLength={700}
            value={f.comentario}
            onChange={(e) => setF({ ...f, comentario: e.target.value })}
            placeholder="¿Cómo fue trabajar con Juan? Un resultado concreto vale más que un adjetivo."
          />
          <span className="mt-1 block text-right text-sm text-ink/60">{f.comentario.length}/700</span>
        </label>
        {error && <p className="text-base text-hivis md:col-span-2">{error}</p>}
        <div className="flex flex-wrap items-center gap-3 md:col-span-2">
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" disabled={sending} className="rounded-full bg-hivis px-7 py-3.5 text-lg font-semibold text-black disabled:opacity-60">
            {sending ? "Guardando…" : dbEnabled ? "Publicar comentario" : "Enviar por WhatsApp"}
          </motion.button>
          <button type="button" onClick={onClose} className="rounded-full px-6 py-3.5 text-lg text-ink/80 hover:text-ink">
            Cancelar
          </button>
          <p className="text-sm text-ink/60">{dbEnabled ? "El comentario se publica en la página y no se puede editar después." : "Se abrirá WhatsApp con tu comentario listo para enviar."}</p>
        </div>
      </div>
    </motion.form>
  );
}
