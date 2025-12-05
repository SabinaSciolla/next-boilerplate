# Kodningsstandarder

## Next.js App Router Patterns
- **Foretræk server components** til datahentning medmindre client-side interaktivitet er påkrævet
- Brug Server Actions til mutations (create/update/delete)
- Brug Server Components til read operations
- Marker kun komponenter som `'use client'` når det er nødvendigt (formularer, interaktive elementer)

## TypeScript
- **Strict mode**: Projektet bruger TypeScript strict mode
- **Delte typer**: Definer alle delte typer i `src/types/index.ts`
- **Undgå `any`**: Brug specifikke typer eller `unknown` hvis nødvendigt
- **Supabase typer**: Brug genererede Supabase typer eller typed klient (server/client) fra `src/lib/supabase/`

## Eksempel på type definition
```typescript
// src/types/index.ts
export interface SymptomRating {
  id: string;
  device_id: string;
  device_name: string;
  dose: string | null;
  rating_date: string; // ISO timestamp
  symptoms: string | null;
  side_effects: string | null;
  created_at: string;
  user_id?: string; // Optional, hvis auth aktiveres
}
```

## Path Aliases
Projektet bruger `@/*` alias til `./src/*`:
```typescript
import { SymptomRating } from '@/types';
import { createClient } from '@/lib/supabase/client';
```

## Code Quality
- Hold koden lint-clean: kør `npm run lint` før commit
- Undgå at introducere non-ASCII karakterer uden grund
- Følg Next.js best practices for App Router

## Komponentstruktur
- Brug funktionelle komponenter med TypeScript
- Eksporter komponenter som named exports når muligt
- Placer komponenter i `src/components/` med beskrivende navne

