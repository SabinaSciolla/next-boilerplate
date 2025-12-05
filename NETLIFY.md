# Netlify Deployment Guide

## Miljøvariabler i Netlify

For at applikationen skal virke på Netlify, skal du tilføje følgende miljøvariabler i Netlify dashboard:

1. Gå til dit Netlify projekt
2. Gå til **Site settings** > **Environment variables**
3. Tilføj følgende variabler:

```
NEXT_PUBLIC_SUPABASE_URL=https://rdbaxipbldagfvijuymi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=din-anon-key-her
SUPABASE_SERVICE_ROLE=din-service-role-key-her
```

**Vigtigt:**
- `NEXT_PUBLIC_SUPABASE_URL` og `NEXT_PUBLIC_SUPABASE_ANON_KEY` skal være præcist som vist (med `NEXT_PUBLIC_` prefix)
- `SUPABASE_SERVICE_ROLE` skal være din service_role key fra Supabase
- Efter at have tilføjet variablerne, skal du **redeploy** sitet

## Build Settings

Netlify skulle automatisk detektere Next.js og bruge korrekte build settings. Hvis ikke, kan du manuelt sætte:

- **Build command:** `npm run build`
- **Publish directory:** `.next`

Eller brug `netlify.toml` filen der allerede er oprettet i projektet.

## Troubleshooting

### Build fejler med "Missing Supabase environment variables"
- Tjek at alle tre miljøvariabler er sat i Netlify dashboard
- Tjek at variabelnavnene er præcise (case-sensitive)
- Redeploy efter at have tilføjet/ændret variabler

### Applikationen virker ikke efter deployment
- Tjek browser console for fejl
- Verificer at Supabase tabel `symptom_ratings` eksisterer
- Tjek Netlify function logs for server-side fejl

