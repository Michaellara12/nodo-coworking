-- ============================================================
-- INNFILTRADOS — Plataforma interna
-- Ejecuta este archivo completo en: Supabase Dashboard → SQL Editor → Run
-- Crea tablas, seguridad (RLS) y datos iniciales de las misiones 2026.
-- ============================================================

-- ——— Tablas ———————————————————————————————————————————————

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nombre text not null default '',
  apellido text not null default '',
  empresa text not null default '',
  cargo text not null default '',
  email text not null default '',
  role text not null default 'innfiltrado' check (role in ('innfiltrado', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.misiones (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  destino text not null,
  tipo text not null default 'internacional' check (tipo in ('internacional', 'colombia')),
  anio int not null default 2026,
  mes int not null check (mes between 1 and 12),
  descripcion text not null default '',
  incluye text[] not null default '{}',
  tags text[] not null default '{}',
  cupos int not null default 20,
  precio numeric not null default 0,
  moneda text not null default 'USD' check (moneda in ('USD', 'COP')),
  color text not null default 'yellow'
    check (color in ('yellow', 'red', 'blue', 'green', 'orange', 'lilac', 'purple')),
  imagen text not null default '/images/innfiltrados/mision-1.jpg',
  estado text not null default 'abierta' check (estado in ('abierta', 'agotada', 'finalizada')),
  created_at timestamptz not null default now()
);

create table if not exists public.inscripciones (
  id uuid primary key default gen_random_uuid(),
  mision_id uuid not null references public.misiones (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'pagada', 'cancelada')),
  metodo_pago text not null default 'tarjeta' check (metodo_pago in ('tarjeta', 'pse', 'transferencia')),
  monto numeric not null default 0,
  moneda text not null default 'USD',
  created_at timestamptz not null default now(),
  unique (mision_id, user_id)
);

-- ——— Auto-confirmar email al registrarse (demo, sin envío de correos) ———
-- Evita el paso de "confirma tu correo": deja la cuenta lista para iniciar
-- sesión apenas se registra, sin tocar la configuración del dashboard.

create or replace function public.auto_confirm_email()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  new.email_confirmed_at := coalesce(new.email_confirmed_at, now());
  return new;
end;
$$;

drop trigger if exists on_auth_user_auto_confirm on auth.users;
create trigger on_auth_user_auto_confirm
  before insert on auth.users
  for each row execute function public.auto_confirm_email();

-- Confirma también cualquier cuenta que ya se haya registrado sin confirmar.
update auth.users set email_confirmed_at = now() where email_confirmed_at is null;

-- ——— Perfil automático al registrarse ———————————————————————
-- El código de equipo ESPIA2026 crea cuentas de administrador (solo demo).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, nombre, apellido, empresa, cargo, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nombre', ''),
    coalesce(new.raw_user_meta_data ->> 'apellido', ''),
    coalesce(new.raw_user_meta_data ->> 'empresa', ''),
    coalesce(new.raw_user_meta_data ->> 'cargo', ''),
    coalesce(new.email, ''),
    case
      when new.raw_user_meta_data ->> 'codigo_equipo' = 'ESPIA2026' then 'admin'
      else 'innfiltrado'
    end
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ——— Helper para políticas (evita recursión de RLS) —————————

create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ——— RLS ————————————————————————————————————————————————————

alter table public.profiles enable row level security;
alter table public.misiones enable row level security;
alter table public.inscripciones enable row level security;

drop policy if exists "perfil propio o admin" on public.profiles;
create policy "perfil propio o admin" on public.profiles
  for select using (auth.uid() = id or public.is_admin());

drop policy if exists "actualizar perfil propio" on public.profiles;
create policy "actualizar perfil propio" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "misiones visibles autenticados" on public.misiones;
create policy "misiones visibles autenticados" on public.misiones
  for select using (auth.role() = 'authenticated');

drop policy if exists "misiones crear admin" on public.misiones;
create policy "misiones crear admin" on public.misiones
  for insert with check (public.is_admin());

drop policy if exists "misiones editar admin" on public.misiones;
create policy "misiones editar admin" on public.misiones
  for update using (public.is_admin());

drop policy if exists "misiones borrar admin" on public.misiones;
create policy "misiones borrar admin" on public.misiones
  for delete using (public.is_admin());

drop policy if exists "inscripciones propias o admin" on public.inscripciones;
create policy "inscripciones propias o admin" on public.inscripciones
  for select using (auth.uid() = user_id or public.is_admin());

drop policy if exists "inscribirse uno mismo" on public.inscripciones;
create policy "inscribirse uno mismo" on public.inscripciones
  for insert with check (auth.uid() = user_id);

drop policy if exists "actualizar inscripcion propia o admin" on public.inscripciones;
create policy "actualizar inscripcion propia o admin" on public.inscripciones
  for update using (auth.uid() = user_id or public.is_admin());

-- ——— Seed: misiones 2026 ————————————————————————————————————

insert into public.misiones
  (titulo, destino, tipo, anio, mes, descripcion, incluye, tags, cupos, precio, moneda, color, imagen, estado)
values
  (
    '¡China, descréstame!',
    'Shenzhen · Shanghái',
    'internacional', 2026, 5,
    'Ocho días dentro del ecosistema que fabrica el futuro: plantas 4.0 que operan a oscuras, gigantes del e-commerce y hardware que pasa de idea a producto en semanas.',
    array['8 días · 7 noches', 'Vuelos internos y hoteles', '6 empresas anfitrionas', 'Traducción simultánea', 'Playbook de hallazgos', 'Seguro de viaje'],
    array['Innovación', 'Manufactura 4.0', 'IA aplicada'],
    24, 8900, 'USD', 'red', '/images/innfiltrados/mision-1.jpg', 'abierta'
  ),
  (
    'Sector Finanzas',
    'Nueva York, EE. UU.',
    'internacional', 2026, 6,
    'El backstage de Wall Street y de las fintech que están reinventando el dinero: banca centenaria, neobancos y venture capital, cara a cara y sin libreto.',
    array['6 días · 5 noches', 'Hotel en Manhattan', '5 empresas anfitrionas', 'Sesiones con C-levels', 'Playbook de hallazgos', 'Seguro de viaje'],
    array['Fintech', 'Banca digital', 'Venture capital'],
    20, 6900, 'USD', 'blue', '/images/innfiltrados/mision-2.jpg', 'abierta'
  ),
  (
    'Siendo sostenibles',
    'Ámsterdam · Copenhague',
    'internacional', 2026, 8,
    'Economía circular en serio: ciudades rumbo a carbono neutral, industrias regenerativas y marcas que convirtieron la sostenibilidad en su mejor negocio.',
    array['7 días · 6 noches', 'Vuelos internos y hoteles', '6 empresas anfitrionas', 'Workshops de síntesis', 'Playbook de hallazgos', 'Seguro de viaje'],
    array['ESG', 'Economía circular', 'Energía'],
    22, 7400, 'USD', 'green', '/images/meeting.jpg', 'abierta'
  ),
  (
    'Ciudades inteligentes',
    'Singapur · Seúl',
    'internacional', 2026, 11,
    'Gobierno digital, movilidad autónoma y urbanismo guiado por datos: así se opera una ciudad que piensa, decide y aprende en tiempo real.',
    array['8 días · 7 noches', 'Vuelos internos y hoteles', '7 empresas anfitrionas', 'Traducción simultánea', 'Playbook de hallazgos', 'Seguro de viaje'],
    array['Smart cities', 'Movilidad', 'GovTech'],
    20, 7900, 'USD', 'lilac', '/images/insta-4.jpg', 'abierta'
  ),
  (
    'Ruta de la innovación paisa',
    'Medellín',
    'colombia', 2026, 3,
    'Dos días dentro del ecosistema que convirtió a Medellín en referente: centros de innovación, plantas de manufactura y las startups que están escalando región.',
    array['2 días · 1 noche', 'Hotel y alimentación', '4 empresas anfitrionas', 'Sesiones con líderes', 'Playbook de hallazgos'],
    array['Innovación', 'Startups', 'Manufactura'],
    24, 3900000, 'COP', 'orange', '/images/insta-1.jpg', 'abierta'
  ),
  (
    'Bogotá corporativa por dentro',
    'Bogotá',
    'colombia', 2026, 9,
    'Un recorrido por el backstage de la banca, el retail y los medios: cómo operan, deciden y se transforman las compañías más grandes del país.',
    array['1 día completo', 'Alimentación curada', '3 empresas anfitrionas', 'Q&A con directivos', 'Síntesis de hallazgos'],
    array['Banca', 'Retail', 'Medios'],
    30, 1900000, 'COP', 'yellow', '/images/insta-3.jpg', 'abierta'
  )
on conflict do nothing;
