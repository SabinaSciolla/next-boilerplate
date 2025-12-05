export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-10 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-96 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="h-96 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </main>
    </div>
  );
}

