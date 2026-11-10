-- Oficios Pergamino · Migración 002
-- Cómo usarla: abrí Supabase → SQL Editor → pegá todo este archivo → Run.
-- Hacelo UNA VEZ y ANTES de publicar el código nuevo en Vercel.
-- Se puede volver a ejecutar sin romper nada ni volver a aprobar perfiles.

-- 1) Datos nuevos en los perfiles --------------------------------------------
alter table public."Profesionales"
  add column if not exists anios_experiencia int
  check (anios_experiencia is null or anios_experiencia between 0 and 70);

alter table public."Profesionales"
  add column if not exists fotos_trabajos text[] not null default '{}';

-- 2) Revisión de perfiles antes de publicar -----------------------------------
-- Los perfiles que ya estaban en el sitio quedan aprobados. Los nuevos arrancan
-- pendientes. Esto solo ocurre la primera vez que se crea la columna.
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'Profesionales' and column_name = 'aprobado'
  ) then
    alter table public."Profesionales" add column aprobado boolean not null default false;
    update public."Profesionales" set aprobado = true;
  end if;
end $$;

-- Aunque alguien mande aprobado = true desde afuera, un perfil nuevo siempre entra pendiente.
create or replace function public.profesionales_forzar_pendiente()
returns trigger language plpgsql as $$
begin
  if current_user in ('anon', 'authenticated') then
    new.aprobado := false;
  end if;
  return new;
end $$;

drop trigger if exists profesionales_forzar_pendiente on public."Profesionales";
create trigger profesionales_forzar_pendiente
  before insert on public."Profesionales"
  for each row execute function public.profesionales_forzar_pendiente();

-- El público solo puede leer perfiles aprobados (los pendientes no se ven ni por la API).
drop policy if exists "solo perfiles aprobados son publicos" on public."Profesionales";
create policy "solo perfiles aprobados son publicos"
  on public."Profesionales" as restrictive for select
  to anon, authenticated
  using (aprobado = true);

-- Permisos sobre las columnas nuevas (la columna email sigue sin ser pública).
grant select (anios_experiencia, fotos_trabajos, aprobado) on public."Profesionales" to anon, authenticated;
grant insert (anios_experiencia, fotos_trabajos) on public."Profesionales" to anon, authenticated;

-- 3) Reportes de perfiles -----------------------------------------------------
create table if not exists public."Reportes" (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  profesional_id bigint not null,
  motivo text not null check (char_length(motivo) between 1 and 80),
  detalle text check (detalle is null or char_length(detalle) <= 500),
  revisado boolean not null default false
);
create index if not exists reportes_profesional_idx on public."Reportes" (profesional_id);
alter table public."Reportes" enable row level security;
drop policy if exists "cualquiera puede reportar" on public."Reportes";
create policy "cualquiera puede reportar"
  on public."Reportes" for insert to anon, authenticated
  with check (revisado = false);
grant insert on public."Reportes" to anon, authenticated;

-- 4) Clics en "Contactar" (medición) --------------------------------------------
-- Guarda solo qué perfil y qué categoría. Nada de quien tocó el botón.
create table if not exists public."Clics" (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  profesional_id bigint not null,
  categoria text check (categoria is null or char_length(categoria) <= 80),
  origen text not null check (origen in ('tarjeta', 'perfil'))
);
create index if not exists clics_profesional_idx on public."Clics" (profesional_id, created_at);
alter table public."Clics" enable row level security;
drop policy if exists "cualquiera puede registrar un clic" on public."Clics";
create policy "cualquiera puede registrar un clic"
  on public."Clics" for insert to anon, authenticated
  with check (true);
grant insert on public."Clics" to anon, authenticated;

-- =============================================================================
-- CONSULTAS ÚTILES (copialas en el SQL Editor cuando las necesites)
-- =============================================================================

-- Perfiles pendientes de aprobar:
--   select id, nombre, oficio, localidad, created_at
--   from public."Profesionales" where aprobado = false order by created_at;

-- Aprobar un perfil (cambiá el 123 por el id):
--   update public."Profesionales" set aprobado = true where id = 123;

-- Reportes sin revisar:
--   select r.created_at, r.profesional_id, p.nombre, r.motivo, r.detalle
--   from public."Reportes" r left join public."Profesionales" p on p.id = r.profesional_id
--   where r.revisado = false order by r.created_at desc;

-- Clics por profesional en los últimos 30 días:
--   select p.id, p.nombre, p.oficio, count(*) as clics
--   from public."Clics" c join public."Profesionales" p on p.id = c.profesional_id
--   where c.created_at > now() - interval '30 days'
--   group by p.id, p.nombre, p.oficio order by clics desc;

-- Clics por categoría:
--   select categoria, count(*) as clics from public."Clics"
--   group by categoria order by clics desc;

-- Para deshacer el filtro de aprobados (no hace falta normalmente):
--   drop policy "solo perfiles aprobados son publicos" on public."Profesionales";
