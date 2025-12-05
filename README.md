# ADHD medicin-symptom tracker (Next.js + Supabase)

Let brugere registrere dagens dosis og symptomer/bivirkninger for et specifikt ADHD-medicinapparat. Projektet kører på Next.js, gemmer data i Supabase, og kan udvides med open.fda download API til medicinopslag.

## Funktioner
- Se og registrer dagens rating: medicinapparat-navn/id, dosis, dato/tid samt noter om symptomer/bivirkninger.
- Oversigt over generelle bivirkninger/symptomer (statisk eller hentet fra open.fda).
- Historikvisning af tidligere registreringer.
- Ingen login-krav som udgangspunkt, men Supabase auth kan aktiveres senere.

## Tech stack
- Next.js (App Router), TypeScript.
- Supabase (Postgres + Row Level Security).
- UI efter behov (Tailwind/vanilla CSS) – vælg frit; ingen bundet styling endnu.

## Datamodel (Supabase)
Foreslået tabel `symptom_ratings`:
- `id` (uuid, primary key, default `gen_random_uuid()`)
- `device_id` (text) – medicinapparat-id
- `device_name` (text) – medicinapparat-navn
- `dose` (text) – fri tekst for dosis
- `rating_date` (timestamptz) – dato/tid for registrering
- `symptoms` (text) – noter/observationsfelter
- `side_effects` (text) – noter/observationsfelter
- `created_at` (timestamptz, default `now()`)

Hvis du senere vil koble til brugerlogin, tilføj en `user_id` (uuid) referencer til `auth.users` og slå RLS + policies til (se nedenfor).

### SQL til hurtig opsætning
```sql
create table if not exists public.symptom_ratings (
  id uuid primary key default gen_random_uuid(),
  device_id text not null,
  device_name text not null,
  dose text,
  rating_date timestamptz not null default now(),
  symptoms text,
  side_effects text,
  created_at timestamptz not null default now()
);
```

Valgfri auth-kolonne og simple policies (tilføj hvis login ønskes):
```sql
alter table public.symptom_ratings add column if not exists user_id uuid references auth.users(id);

alter table public.symptom_ratings enable row level security;

create policy "Users can see own ratings"
  on public.symptom_ratings for select
  using (auth.uid() = user_id);

create policy "Users can insert own ratings"
  on public.symptom_ratings for insert
  with check (auth.uid() = user_id);

create policy "Users can update own ratings"
  on public.symptom_ratings for update
  using (auth.uid() = user_id);
```

## open.fda download API
- Bruges til at hente feltdefinitioner/bivirkninger for medicin, hvis du vil supplere UI’et med referenceinfo.
- Startpunkt: https://open.fda.gov/apis/download-api-fields/.
- Typisk flow: hent feltlisten eller relevante felter for medicin, map til opslagsliste, og vis i UI’et som “kendte bivirkninger”.

## Miljøvariabler
Opret `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE=your-service-role-key  # kun hvis server-actions skal skrive uden brugerlogin
```

## Udvikling lokalt
```bash
npm install
npm run dev
# app kører på http://localhost:3000
```

## Anbefalet mappestruktur (App Router)
- `src/app/page.tsx`: vis dagens rating, formular for ny registrering, liste over generelle bivirkninger/symptomer.
- `src/app/history/page.tsx`: historik med filtrering pr. apparat.
- `src/lib/supabase/client.ts`: Supabase browser-klient (anon).
- `src/lib/supabase/server.ts`: server-klient (service role) hvis nødvendigt.
- `src/types/index.ts`: typer for `SymptomRating`.
- `src/components/*`: formular, lister, kort/graf, etc.

## Basis-flow (uden login)
1) Hent generelle bivirkninger (statisk eller via open.fda).  
2) Vis dagens registrering (hent seneste `rating_date` for valgt apparat).  
3) Formular til at gemme ny registrering (`device_id/name`, dosis, dato/tid, symptomer, side_effects).  
4) Historikliste + sortering/filtrering.

## Scripts
- `npm run dev` – lokal udvikling.
- `npm run lint` – kør ESLint.

## Setup

Følg guiden i [SETUP.md](SETUP.md) for at sætte Supabase op og komme i gang med projektet.

Kort version:
1. Opret Supabase projekt på [supabase.com](https://supabase.com)
2. Kør SQL scriptet fra `supabase-setup.sql` i Supabase SQL Editor
3. Opret `.env.local` med Supabase credentials (se `SETUP.md` for detaljer)
4. Kør `npm install` og `npm run dev`

## Næste skridt
- Tilføj UI-komponenter og Supabase-kald (client components eller server actions).
- Beslut om open.fda-data skal caches i Supabase eller hentes on-demand.
- Aktiver login + RLS hvis du får brug for bruger-specifik historik.***
