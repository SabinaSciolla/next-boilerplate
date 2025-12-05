import Link from 'next/link';
import { Suspense } from 'react';
import { getAllRatings } from '@/app/actions';
import { RatingList } from '@/components/RatingList';
import { DeviceFilter } from '@/components/DeviceFilter';

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: { device?: string };
}) {
  const deviceId = searchParams.device;
  const result = await getAllRatings(deviceId);

  if (!result.success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Tilbage til forsiden
            </Link>
          </div>
          <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
            <p className="text-sm text-red-800 dark:text-red-200">
              Fejl ved hentning af historik: {result.error}
            </p>
          </div>
        </main>
      </div>
    );
  }

  const ratings = result.data;
  const uniqueDevices = Array.from(
    new Set(ratings.map((r) => ({ id: r.device_id, name: r.device_name })))
  ).map((device) => ({ id: device.id, name: device.name }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/"
              className="mb-2 inline-block text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              ← Tilbage til forsiden
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Historik
            </h1>
          </div>
        </div>

        {uniqueDevices.length > 0 && (
          <div className="mb-6">
            <Suspense
              fallback={
                <div className="h-20 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
              }
            >
              <DeviceFilter
                devices={uniqueDevices}
                selectedDeviceId={deviceId}
              />
            </Suspense>
          </div>
        )}

        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {deviceId
            ? `Viser ${ratings.length} registrering(er) for valgt device`
            : `Viser alle ${ratings.length} registrering(er)`}
        </div>

        <RatingList ratings={ratings} />
      </main>
    </div>
  );
}

