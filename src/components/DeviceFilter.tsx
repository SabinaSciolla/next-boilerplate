'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface Device {
  id: string;
  name: string;
}

interface DeviceFilterProps {
  devices: Device[];
  selectedDeviceId?: string;
}

export function DeviceFilter({ devices, selectedDeviceId }: DeviceFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (deviceId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (deviceId === 'all' || deviceId === '') {
      params.delete('device');
    } else {
      params.set('device', deviceId);
    }

    router.push(`/history?${params.toString()}`);
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <label
        htmlFor="device-filter"
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Filtrer efter device:
      </label>
      <select
        id="device-filter"
        value={selectedDeviceId || 'all'}
        onChange={(e) => handleFilterChange(e.target.value)}
        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-auto"
      >
        <option value="all">Alle devices</option>
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name} ({device.id})
          </option>
        ))}
      </select>
    </div>
  );
}

