import { testimoniosDb } from "@/content/profile";

export type Comentario = {
  slot: string;
  nombre: string;
  profesion: string;
  contacto: string;
  mostrarContacto: boolean;
  comentario: string;
  fecha: string;
};

export type NuevoComentario = Omit<Comentario, "slot" | "fecha">;

export const dbEnabled = Boolean(testimoniosDb.projectId && testimoniosDb.apiKey);

const base = () =>
  `https://firestore.googleapis.com/v1/projects/${testimoniosDb.projectId}/databases/(default)/documents/testimonios`;

type FsValue = { stringValue?: string; booleanValue?: boolean; timestampValue?: string };
type FsDoc = { name: string; fields: Record<string, FsValue> };

const fromDoc = (d: FsDoc): Comentario => ({
  slot: d.name.split("/").pop() ?? "",
  nombre: d.fields.nombre?.stringValue ?? "",
  profesion: d.fields.profesion?.stringValue ?? "",
  contacto: d.fields.contacto?.stringValue ?? "",
  mostrarContacto: d.fields.mostrarContacto?.booleanValue ?? false,
  comentario: d.fields.comentario?.stringValue ?? "",
  fecha: d.fields.fecha?.timestampValue ?? "",
});

export async function listarComentarios(): Promise<Comentario[]> {
  const res = await fetch(`${base()}?key=${testimoniosDb.apiKey}&pageSize=${testimoniosDb.slots}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`No se pudieron leer los comentarios (${res.status})`);
  const data = (await res.json()) as { documents?: FsDoc[] };
  return (data.documents ?? []).map(fromDoc).sort((a, b) => a.slot.localeCompare(b.slot));
}

/**
 * Guarda el comentario en el primer espacio libre. Las reglas de Firestore
 * solo aceptan los documentos 1–4 y rechazan sobrescribir uno existente,
 * así que si dos personas envían a la vez se prueba el siguiente espacio.
 */
export async function guardarComentario(c: NuevoComentario, ocupados: string[]): Promise<Comentario> {
  const libres = Array.from({ length: testimoniosDb.slots }, (_, i) => String(i + 1)).filter((s) => !ocupados.includes(s));
  const fecha = new Date().toISOString();
  for (const slot of libres) {
    const res = await fetch(`${base()}?documentId=${slot}&key=${testimoniosDb.apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          nombre: { stringValue: c.nombre },
          profesion: { stringValue: c.profesion },
          contacto: { stringValue: c.contacto },
          mostrarContacto: { booleanValue: c.mostrarContacto },
          comentario: { stringValue: c.comentario },
          fecha: { timestampValue: fecha },
        },
      }),
    });
    if (res.ok) return fromDoc((await res.json()) as FsDoc);
    if (res.status !== 409 && res.status !== 403) throw new Error(`No se pudo guardar el comentario (${res.status})`);
  }
  throw new Error("Los 4 espacios de comentarios ya están ocupados.");
}
