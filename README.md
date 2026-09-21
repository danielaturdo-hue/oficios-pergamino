# Oficios Pergamino — MVP

Marketplace local mobile-first para conectar personas de Pergamino con profesionales de oficios.

## Stack
- Next.js + React + TypeScript
- Tailwind CSS
- Supabase: Auth, Postgres, Storage (schema preparado)
- WhatsApp deep links para contacto

## Ejecutar
1. Instalar Node.js 20+.
2. `npm install`
3. Copiar `.env.example` a `.env.local`.
4. Crear un proyecto en Supabase y ejecutar `supabase/migrations/001_initial.sql` en SQL Editor.
5. Completar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
6. `npm run dev`

El MVP incluye datos ficticios locales para poder navegar sin Supabase configurado. Para producción, conectar los formularios y páginas a Supabase Auth/DB/Storage y reemplazar los datos de `lib/data.ts`.

## Rutas
- `/` home
- `/buscar?q=costurera` búsqueda
- `/categorias/[slug]` SEO de categoría
- `/profesional/[slug]` perfil
- `/ofrecer` alta profesional
- `/solicitar` solicitud de servicio
- `/login` acceso
- `/admin` dashboard MVP
- `/terminos`, `/privacidad`

## SEO
La estructura de categorías permite URLs indexables. Para producción agregar `generateMetadata`, sitemap, robots y páginas SEO dedicadas por oficio/ciudad.

## WhatsApp
Los perfiles de demo usan números ficticios `549000000000X`. Reemplazar únicamente por números reales proporcionados por cada profesional al publicar su perfil. Nunca generar/inventar teléfonos.

## Próximo paso técnico
1. Conectar Auth real.
2. CRUD de profesionales/solicitudes.
3. Storage con límites de tamaño/tipo y moderación.
4. Registrar `contact_events` al hacer click de WhatsApp.
5. Matching por categoría + servicio + zona + disponibilidad.
6. Admin protegido por rol y políticas RLS completas.
7. Reviews verificadas mediante request/contact event.
8. Sitemap/JSON-LD/local SEO.
9. Rate limiting, captcha/anti-spam y observabilidad.
