# Setup de Supabase — Plataforma Innfiltrados

## 1. Ejecutar el schema

1. Abre tu proyecto en [supabase.com/dashboard](https://supabase.com/dashboard).
2. Ve a **SQL Editor** → **New query**.
3. Pega el contenido completo de [`schema.sql`](./schema.sql) y presiona **Run**.

Esto crea las tablas (`profiles`, `misiones`, `inscripciones`), las políticas de
seguridad (RLS) y deja sembradas las 6 misiones 2026.

## 2. Desactivar confirmación de email (obligatorio para que nadie verifique nada)

`schema.sql` ya incluye un trigger que auto-confirma cada cuenta en la base de
datos, pero **eso no evita que Supabase intente enviar el correo** — y con el
límite de envíos del plan gratuito, el registro puede fallar con
`over_email_send_rate_limit`. El único apagador real está en el dashboard:

1. Ve a **Authentication → Sign In / Providers → Email**.
2. Desactiva **Confirm email**.
3. Guarda.

Es un toggle de la interfaz de Supabase — no se puede activar por API con la
`anon key`, así que este paso sí lo tienes que hacer tú (toma 10 segundos).
Con esto apagado, el registro entra directo a la plataforma, sin correos ni
esperas, para todas las cuentas nuevas.

## 3. Crear una cuenta de administrador

En el formulario de registro de `/plataforma/login`, escribe el código de equipo:

```
ESPIA2026
```

Cualquier registro con ese código queda con rol `admin` (ve el panel en
`/plataforma/admin`). Los registros sin código quedan como `innfiltrado`.
Para producción, elimina esa regla del trigger `handle_new_user` en `schema.sql`
y asigna roles directamente en la tabla `profiles`.

## Variables de entorno

Ya configuradas en `.env`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```
