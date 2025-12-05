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

interface RatingListProps {
  ratings: SymptomRating[];
}

export function RatingList({ ratings }: RatingListProps) {
  if (ratings.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-400">
          Ingen registreringer fundet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ratings.map((rating) => (
        <div
          key={rating.id}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
        >
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {rating.device_name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {rating.device_id}
              </p>
            </div>
            <time className="text-sm text-gray-500 dark:text-gray-400">
              {formatDateTime(rating.rating_date)}
            </time>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {rating.dose && (
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Dosis:
                </span>{' '}
                <span className="text-gray-900 dark:text-white">
                  {rating.dose}
                </span>
              </div>
            )}

            {rating.symptoms && (
              <div className="sm:col-span-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Symptomer:
                </span>
                <p className="mt-1 text-gray-900 dark:text-white">
                  {rating.symptoms}
                </p>
              </div>
            )}

            {rating.side_effects && (
              <div className="sm:col-span-2">
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
      ))}
    </div>
  );
}

