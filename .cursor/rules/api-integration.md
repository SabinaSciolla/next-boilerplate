# API Integration Regler

## open.fda Download API
- **Placering**: Opret helper-modul i `src/lib/openfda.ts`
- **Server-side kun**: Hold alle API-kald server-side (Server Components eller Server Actions)
- **Rate limiting**: Respekter open.fda rate limits og implementer caching
- **Caching**: Overvej at cache data i Supabase eller Next.js cache for at reducere API-kald

## Eksempel struktur
```typescript
// src/lib/openfda.ts
export async function getMedicationFields(deviceId: string) {
  // Implementer API-kald med error handling
  // Respekter rate limits
  // Returner typed data
}
```

## Error Handling
- Håndter alle API-fejl gracefully
- Vis brugervenlige fejlmeddelelser
- Log errors til console i development, men ikke i production

## Caching Strategi
- Brug Next.js `revalidate` option for Server Components
- Overvej at gemme reference-data i Supabase hvis det skal være persistent
- Cache open.fda data i mindst 24 timer (data ændrer sig sjældent)

