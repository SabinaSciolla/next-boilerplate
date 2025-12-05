# Supabase Regler

## Klientoprettelse
- **Browser-klient**: Brug `NEXT_PUBLIC_SUPABASE_URL` og `NEXT_PUBLIC_SUPABASE_ANON_KEY` i `src/lib/supabase/client.ts`
- **Server-klient**: Brug service role key kun server-side i `src/lib/supabase/server.ts`
- **Aldrig eksponer service role key** i browser-kode eller client components

## Authentication
- **Ingen login-krav nu**: Design API-kald så de kan fungere både med og uden auth
- **Fremtidig auth**: Hvis auth tilføjes senere:
  - Tilføj `user_id` kolonne til `symptom_ratings` tabel
  - Reference til `auth.users(id)`
  - Aktiver Row Level Security (RLS)
  - Opret policies som beskrevet i README

## Row Level Security (RLS)
Når auth aktiveres, brug disse policies:
```sql
-- Aktiver RLS
ALTER TABLE public.symptom_ratings ENABLE ROW LEVEL SECURITY;

-- Users can see own ratings
CREATE POLICY "Users can see own ratings"
  ON public.symptom_ratings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert own ratings
CREATE POLICY "Users can insert own ratings"
  ON public.symptom_ratings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update own ratings
CREATE POLICY "Users can update own ratings"
  ON public.symptom_ratings FOR UPDATE
  USING (auth.uid() = user_id);
```

## Query Patterns
- Brug typed queries når muligt
- Håndter errors gracefully
- Brug optimistic updates i client components hvis relevant

## Eksempel på Supabase query
```typescript
// Server Component eksempel
import { createClient } from '@/lib/supabase/server';

export default async function Page() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('symptom_ratings')
    .select('*')
    .order('rating_date', { ascending: false });
  
  if (error) {
    // Håndter error
  }
  
  return <div>{/* Render data */}</div>;
}
```

