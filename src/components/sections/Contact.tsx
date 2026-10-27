"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { contact } from "@/content/profile";
import { Reveal } from "../ui/Reveal";

const channels = [
  { label: "WhatsApp", value: contact.phoneDisplay, href: `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent("Hola Juan, vi tu portafolio y me gustaría hablar contigo.")}` },
  { label: "Correo", value: contact.email, href: `mailto:${contact.email}` },
  { label: "LinkedIn", value: "Juan Sebastián De León", href: contact.linkedin },
  { label: "GitHub", value: "JuanDeLeon24", href: contact.github },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Contacto desde el portafolio · ${form.name}`;
    const body = `${form.message}\n\n${form.name}\n${form.email}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const field = "w-full rounded-2xl bg-surface-3 px-5 py-4 text-lg text-ink placeholder:text-ink/50 outline-none transition focus:ring-2 focus:ring-signal";

  return (
    <Reveal as="section" id="contacto" aria-labelledby="contacto-t" className="py-32 md:py-48">
      <div className="wrap grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="contacto-t" data-reveal className="display text-[clamp(3rem,8vw,8rem)] font-extrabold">
            Hablemos
          </h2>
          <p data-reveal className="mt-6 max-w-[44ch] text-xl leading-relaxed text-ink/90">
            ¿Un proceso que se puede automatizar, una obra que necesita mejores datos o un equipo que quiere usar IA en serio? Escríbeme.
          </p>
          <ul className="mt-12 space-y-3">
            {channels.map((c) => (
              <li key={c.label} data-reveal>
                <motion.a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ x: 8 }}
                  className="glass flex items-center justify-between gap-4 rounded-2xl px-6 py-5 transition-colors hover:bg-white/10"
                >
                  <span className="text-lg font-semibold">{c.label}</span>
                  <span className="truncate text-base text-ink/80">{c.value}</span>
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
        <form data-reveal onSubmit={send} className="neo space-y-5 self-start rounded-[32px] p-7 md:p-10 lg:col-span-5 lg:col-start-8">
          <h3 className="display text-3xl font-bold">Envíame un mensaje</h3>
          <label className="block">
            <span className="mb-2 block text-sm text-ink/80">Nombre</span>
            <input className={field} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-ink/80">Correo</span>
            <input className={field} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-ink/80">Mensaje</span>
            <textarea className={`${field} min-h-36 resize-y`} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </label>
          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} type="submit" className="w-full rounded-full bg-hivis py-4 text-lg font-semibold text-black">
            Enviar por correo
          </motion.button>
          <p className="text-sm text-ink/70">Abre tu aplicación de correo con el mensaje listo. No se guardan datos en este sitio.</p>
        </form>
      </div>
    </Reveal>
  );
}
