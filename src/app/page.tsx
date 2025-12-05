import Link from 'next/link';
import { Suspense } from 'react';
import { RatingForm } from '@/components/RatingForm';
import { TodayRating } from '@/components/TodayRating';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ADHD Medicin-Symptom Tracker
          </h1>
          <Link
            href="/history"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Se Historik
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Ny Registrering
              </h2>
              <RatingForm />
            </div>
          </div>

          <div>
            <Suspense
              fallback={
                <div className="h-64 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
              }
            >
              <TodayRating />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
