# Projektoversigt

## Projektbeskrivelse
Next.js (App Router, TypeScript) projekt til tracking af ADHD medicin-symptomer og bivirkninger. Data gemmes i Supabase, og projektet kan udvides med open.fda download API til referenceinformation om medicin.

## Kernefunktioner
- **Dagens registrering**: Formular til at registrere dagens medicinindtag med:
  - `device_id` + `device_name` (medicinapparat-id og navn)
  - `dose` (dosis som fri tekst)
  - `rating_date` (dato/tid, default nu)
  - `symptoms` (noter om symptomer)
  - `side_effects` (noter om bivirkninger)
- **Oversigtsvisning**: Vis dagens registrering og generelle bivirkninger/symptomer
- **Historikvisning**: Liste over tidligere registreringer med filtrering pr. apparat
- **Ingen login-krav**: Designet til at fungere uden authentication, men kan udvides med Supabase auth senere

## Tech Stack
- **Framework**: Next.js 16+ med App Router
- **Sprog**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL med Row Level Security)
- **API**: open.fda download API (valgfri, til referencefelter)

## Mappestruktur (App Router)
```
src/
├── app/
│   ├── page.tsx              # Dagens rating + formular + oversigt
│   ├── history/
│   │   └── page.tsx          # Historik med filtrering
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styling
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Browser-klient (anon key)
│   │   └── server.ts         # Server-klient (service role)
│   └── openfda.ts            # Helper til open.fda API
├── types/
│   └── index.ts              # Delte TypeScript typer
└── components/               # React komponenter
```

## Datamodel
Tabel `symptom_ratings` i Supabase:
- `id` (uuid, primary key)
- `device_id` (text, not null)
- `device_name` (text, not null)
- `dose` (text)
- `rating_date` (timestamptz, not null, default now())
- `symptoms` (text)
- `side_effects` (text)
- `created_at` (timestamptz, not null, default now())
- `user_id` (uuid, references auth.users, optional - tilføjes hvis auth aktiveres)

## Miljøvariabler
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase projekt URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anonym nøgle til browser
- `SUPABASE_SERVICE_ROLE` - Service role nøgle (kun server-side, hvis nødvendigt)

## UX/Copy
- UI kan være på dansk
- Fokus på tydelig visning af dagens registrering og historik
- Ingen login flows i UI medmindre eksplicit anmodet

