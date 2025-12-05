# Komponent Patterns

## Server vs Client Components
- **Default til Server Components**: Brug Server Components medmindre du har brug for:
  - Event handlers (onClick, onChange, etc.)
  - React hooks (useState, useEffect, etc.)
  - Browser APIs (localStorage, window, etc.)
  - Formularer med client-side validering

## Formularer
- Brug Server Actions til form submission
- Marker formular-komponenter som `'use client'`
- Implementer client-side validering for bedre UX
- Brug TypeScript types for form data

## Eksempel på formular med Server Action
```typescript
// app/actions.ts (Server Actions)
'use server';

import { createClient } from '@/lib/supabase/server';

export async function createRating(formData: FormData) {
  const supabase = createClient();
  // Valider og gem data
}

// components/RatingForm.tsx (Client Component)
'use client';

import { createRating } from '@/app/actions';

export function RatingForm() {
  return (
    <form action={createRating}>
      {/* Form fields */}
    </form>
  );
}
```

## Data Fetching Patterns
- **Server Components**: Brug async/await direkte i komponenten
- **Client Components**: Brug useEffect eller React Query hvis nødvendigt
- **Revalidation**: Brug `revalidatePath` eller `revalidateTag` efter mutations

## Styling
- Brug Tailwind CSS utility classes
- Følg projektets eksisterende styling patterns
- Brug dark mode classes hvis relevant (`dark:` prefix)

