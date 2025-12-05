export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mb-6">
          <div className="h-20 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700"
            />
          ))}
        </div>
      </main>
    </div>
  );
}

