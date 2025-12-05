# Supabase Setup Guide

## 1. Opret Supabase Projekt

1. Gå til [supabase.com](https://supabase.com) og opret et nyt projekt
2. Vent til projektet er klar (dette kan tage et par minutter)

## 2. Opret Tabel

Gå til SQL Editor i Supabase dashboard og kør følgende SQL:

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

## 3. Valgfri: Tilføj Authentication (hvis login ønskes senere)

Hvis du senere vil tilføje brugerlogin, kør disse SQL statements:

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

## 4. Hent Miljøvariabler

1. Gå til Project Settings > API i Supabase dashboard
2. Find følgende værdier:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE` (vigtigt: hold denne hemmelig!)

## 5. Opret .env.local fil

Opret en `.env.local` fil i projektets rod med følgende indhold:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE=your-service-role-key
```

**Vigtigt:** 
- Erstat `your-project-url`, `your-anon-key` og `your-service-role-key` med dine faktiske værdier
- Tilføj `.env.local` til `.gitignore` (skal allerede være der i Next.js projekter)
- Del aldrig service_role key offentligt

## 6. Installer Dependencies

Kør følgende kommando for at installere Supabase pakken:

```bash
npm install
```

## 7. Verificer Setup

Efter at have sat miljøvariablerne op, kan du starte udviklingsserveren:

```bash
npm run dev
```

Applikationen skulle nu kunne forbinde til Supabase.

