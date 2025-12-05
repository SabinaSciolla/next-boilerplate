'use client';

import { useState, useTransition } from 'react';
import { createRating } from '@/app/actions';
import type { CreateRatingInput } from '@/types';

export function RatingForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState<CreateRatingInput>({
    device_id: '',
    device_name: '',
    dose: '',
    rating_date: new Date().toISOString().slice(0, 16), // Format til datetime-local input
    symptoms: '',
    side_effects: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Client-side validering
    if (!formData.device_id.trim() || !formData.device_name.trim()) {
      setError('Device ID og Device Navn er påkrævet');
      return;
    }

    startTransition(async () => {
      const result = await createRating({
        ...formData,
        device_id: formData.device_id.trim(),
        device_name: formData.device_name.trim(),
        dose: formData.dose?.trim() || undefined,
        symptoms: formData.symptoms?.trim() || undefined,
        side_effects: formData.side_effects?.trim() || undefined,
        rating_date: formData.rating_date ? new Date(formData.rating_date).toISOString() : undefined,
      });

      if (result.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          device_id: '',
          device_name: '',
          dose: '',
          rating_date: new Date().toISOString().slice(0, 16),
          symptoms: '',
          side_effects: '',
        });
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || 'Fejl ved oprettelse af registrering');
      }
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="device_id"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Device ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="device_id"
            name="device_id"
            value={formData.device_id}
            onChange={handleChange}
            required
            disabled={isPending}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="device_name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Device Navn <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="device_name"
            name="device_name"
            value={formData.device_name}
            onChange={handleChange}
            required
            disabled={isPending}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="dose"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Dosis
          </label>
          <input
            type="text"
            id="dose"
            name="dose"
            value={formData.dose}
            onChange={handleChange}
            disabled={isPending}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="rating_date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Dato/Tid
          </label>
          <input
            type="datetime-local"
            id="rating_date"
            name="rating_date"
            value={formData.rating_date}
            onChange={handleChange}
            disabled={isPending}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="symptoms"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Symptomer
        </label>
        <textarea
          id="symptoms"
          name="symptoms"
          value={formData.symptoms}
          onChange={handleChange}
          rows={3}
          disabled={isPending}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="side_effects"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Bivirkninger
        </label>
        <textarea
          id="side_effects"
          name="side_effects"
          value={formData.side_effects}
          onChange={handleChange}
          rows={3}
          disabled={isPending}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:text-sm"
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/20">
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
          <p className="text-sm text-green-800 dark:text-green-200">
            Registrering oprettet succesfuldt!
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 sm:w-auto"
      >
        {isPending ? 'Gemmer...' : 'Gem Registrering'}
      </button>
    </form>
  );
}

