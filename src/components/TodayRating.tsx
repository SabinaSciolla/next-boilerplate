import { getTodaysRating } from '@/app/actions';
import type { SymptomRating } from '@/types';

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export async function TodayRating() {
  const result = await getTodaysRating();

  if (!result.success) {
    return (
      <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
        <p className="text-sm text-red-800 dark:text-red-200">
          Fejl ved hentning af dagens registrering: {result.error}
        </p>
      </div>
    );
  }

  const rating: SymptomRating | null = result.data;

  if (!rating) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
          Dagens Registrering
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Ingen registrering i dag endnu.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        Dagens Registrering
      </h2>
      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Device:
          </span>{' '}
          <span className="text-gray-900 dark:text-white">
            {rating.device_name} ({rating.device_id})
          </span>
        </div>

        {rating.dose && (
          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Dosis:
            </span>{' '}
            <span className="text-gray-900 dark:text-white">{rating.dose}</span>
          </div>
        )}

        <div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Dato/Tid:
          </span>{' '}
          <span className="text-gray-900 dark:text-white">
            {formatDateTime(rating.rating_date)}
          </span>
        </div>

        {rating.symptoms && (
          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Symptomer:
            </span>
            <p className="mt-1 text-gray-900 dark:text-white">
              {rating.symptoms}
            </p>
          </div>
        )}

        {rating.side_effects && (
          <div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Bivirkninger:
            </span>
            <p className="mt-1 text-gray-900 dark:text-white">
              {rating.side_effects}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

