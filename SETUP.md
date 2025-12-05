# Supabase Setup Guide - Step by Step

Følg disse trin for at sætte Supabase op til projektet.

## Trin 1: Opret Supabase Projekt

1. Gå til [supabase.com](https://supabase.com)
2. Klik på "Start your project" eller "New Project"
3. Log ind med GitHub, Google eller email
4. Klik på "New Project"
5. Udfyld:
   - **Project Name**: f.eks. "adhd-medicin-tracker"
   - **Database Password**: Vælg et sikkert password (gem det!)
   - **Region**: Vælg den nærmeste region
6. Klik "Create new project"
7. Vent 2-3 minutter mens projektet oprettes

## Trin 2: Opret Database Tabel

1. I Supabase dashboard, gå til **SQL Editor** (i venstre menu)
2. Klik på **New Query**
3. Åbn filen `supabase-setup.sql` i dette projekt
4. Kopier hele indholdet og indsæt i SQL Editor
5. Klik **Run** (eller tryk Ctrl+Enter / Cmd+Enter)
6. Du skulle se "Success. No rows returned"

## Trin 3: Hent API Nøgler

1. I Supabase dashboard, gå til **Settings** (tandhjul ikon) > **API**
2. Find følgende værdier:
   - **Project URL** (fx: `https://xxxxx.supabase.co`)
   - **anon public** key (lang streng der starter med `eyJ...`)
   - **service_role** key (lang streng - **VIGTIGT: Hold hemmelig!**)

## Trin 4: Opret .env.local fil

1. I projektets rod, opret en fil kaldet `.env.local`
2. Tilføj følgende indhold (erstat med dine faktiske værdier):

```env
NEXT_PUBLIC_SUPABASE_URL=https://din-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=din-anon-key-her
SUPABASE_SERVICE_ROLE=din-service-role-key-her
```

**Eksempel:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2NzI5MCwiZXhwIjoxOTU0NTQzMjkwfQ.abc123def456...
SUPABASE_SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjM4OTY3MjkwLCJleHAiOjE5NTQ1NDMyOTB9.xyz789...
```

## Trin 5: Installer Dependencies

Kør i terminalen:

```bash
npm install
```

Dette installerer `@supabase/supabase-js` pakken.

## Trin 6: Test Applikationen

1. Start udviklingsserveren:
```bash
npm run dev
```

2. Åbn browseren og gå til `http://localhost:3000`

3. Prøv at oprette en test registrering:
   - Device ID: `test-device-1`
   - Device Navn: `Test Device`
   - Dosis: `10mg`
   - Klik "Gem Registrering"

4. Hvis alt virker, skulle du se en succesbesked og registreringen skulle vises i "Dagens Registrering"

5. Gå til "Se Historik" for at se alle registreringer

## Fejlfinding

### Fejl: "Missing Supabase environment variables"
- Tjek at `.env.local` filen eksisterer i projektets rod
- Tjek at alle tre miljøvariabler er sat korrekt
- Genstart udviklingsserveren efter at have oprettet/ændret `.env.local`

### Fejl: "relation 'symptom_ratings' does not exist"
- Tjek at SQL scriptet er kørt korrekt i Supabase SQL Editor
- Gå til **Table Editor** i Supabase dashboard og verificer at tabellen eksisterer

### Fejl: "permission denied for table symptom_ratings"
- Dette betyder at RLS (Row Level Security) er aktiveret, men vi bruger ikke auth
- Gå til **Authentication** > **Policies** i Supabase dashboard
- Slet eller deaktiver RLS policies for `symptom_ratings` tabellen
- Eller kør SQL: `ALTER TABLE public.symptom_ratings DISABLE ROW LEVEL SECURITY;`

## Næste Skridt

Når alt virker, kan du:
- Tilføje flere registreringer
- Teste filtrering i historik siden
- Tilføje authentication senere hvis nødvendigt (se `docs/supabase-setup.md`)

