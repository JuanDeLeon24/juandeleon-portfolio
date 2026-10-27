# Activar los comentarios (Firebase Firestore, gratis)

Los comentarios de jefes y compañeros se guardan en Firestore. Son 4 espacios: cuando se llenan, el formulario se cierra solo.

1. Entra a https://console.firebase.google.com y crea un proyecto (por ejemplo `portafolio-juan`). Google Analytics no es necesario.
2. Menú **Compilación → Firestore Database → Crear base de datos**. Ubicación: `southamerica-east1` (o la más cercana). Modo: **producción**.
3. Pestaña **Reglas**: borra lo que hay, pega el contenido de `firestore.rules` de este repositorio y pulsa **Publicar**.
4. **Configuración del proyecto** (engranaje) → **General** → **Tus apps** → icono web `</>` → registra la app (sin Hosting). Copia `projectId` y `apiKey`.
5. En `src/content/profile.ts`, en `testimoniosDb`, pega esos dos valores y sube el cambio a GitHub. La página se publica sola.

La `apiKey` web de Firebase no es secreta: identifica el proyecto. La seguridad la dan las reglas, que solo permiten **crear** los documentos `1` a `4` con los campos esperados, y prohíben editar o borrar.

**Moderar:** si alguien deja un comentario que no quieres, bórralo en Firestore → colección `testimonios`. El espacio queda libre de nuevo.
