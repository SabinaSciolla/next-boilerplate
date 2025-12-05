-- Supabase Setup SQL Script
-- Kør dette script i Supabase SQL Editor efter at have oprettet projektet

-- Opret symptom_ratings tabel
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

-- Tilføj kommentarer til kolonnerne for bedre dokumentation
comment on table public.symptom_ratings is 'Tabel til at gemme ADHD medicin-symptom registreringer';
comment on column public.symptom_ratings.device_id is 'Unik ID for medicinapparatet';
comment on column public.symptom_ratings.device_name is 'Navn på medicinapparatet';
comment on column public.symptom_ratings.dose is 'Dosis som fri tekst';
comment on column public.symptom_ratings.rating_date is 'Dato og tid for registreringen';
comment on column public.symptom_ratings.symptoms is 'Noter om symptomer';
comment on column public.symptom_ratings.side_effects is 'Noter om bivirkninger';

-- Opret indeks for bedre performance ved queries
create index if not exists idx_symptom_ratings_rating_date on public.symptom_ratings(rating_date desc);
create index if not exists idx_symptom_ratings_device_id on public.symptom_ratings(device_id);

-- Valgfri: Tilføj Authentication support (kun hvis login ønskes senere)
-- Fjern kommentarerne nedenfor hvis du vil aktivere RLS og user_id:

-- alter table public.symptom_ratings add column if not exists user_id uuid references auth.users(id);
-- 
-- alter table public.symptom_ratings enable row level security;
-- 
-- create policy "Users can see own ratings"
--   on public.symptom_ratings for select
--   using (auth.uid() = user_id);
-- 
-- create policy "Users can insert own ratings"
--   on public.symptom_ratings for insert
--   with check (auth.uid() = user_id);
-- 
-- create policy "Users can update own ratings"
--   on public.symptom_ratings for update
--   using (auth.uid() = user_id);

