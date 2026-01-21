"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react';
import clsx from 'clsx';

import type { Airport } from '@/data/airports';
import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/forms/DatePicker';
import { markClient } from '@/lib/perf';
import { validateSearch, type SearchFormValues } from '@/lib/validation';

const initialValues: SearchFormValues = {
  origin: '',
  destination: '',
  departureDate: '',
  returnDate: ''
};

export function SearchForm({ airports }: { airports: Airport[] }) {
  const router = useRouter();
  const [values, setValues] = useState<SearchFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof SearchFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateValue(field: keyof SearchFormValues, value: string) {
    setValues((prev: SearchFormValues) => ({ ...prev, [field]: value.toUpperCase() }));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === 'origin' || name === 'destination') {
      updateValue(name, value.toUpperCase());
      return;
    }
    setValues((prev: SearchFormValues) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markClient('search-submit', 'start');
    const validation = validateSearch(values);
    setErrors(validation.errors);

    if (!validation.valid) {
      markClient('search-submit', 'end');
      return;
    }

    try {
      setIsSubmitting(true);
      const params = new URLSearchParams();
      params.set('origin', values.origin.toUpperCase());
      params.set('destination', values.destination.toUpperCase());
      params.set('departureDate', values.departureDate);
      if (values.returnDate) {
        params.set('returnDate', values.returnDate);
      }
      router.push(`/results?${params.toString()}`);
    } finally {
      setIsSubmitting(false);
      markClient('search-submit', 'end');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-neutral-100 bg-white/80 p-6 shadow-card">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-neutral-600" htmlFor="origin">
            Origin Airport
          </label>
          <input
            id="origin"
            name="origin"
            type="text"
            list="airports"
            value={values.origin}
            onChange={handleChange}
            placeholder="e.g., BOG"
            className={clsx(
              'mt-2 w-full rounded-2xl border px-4 py-3 text-base uppercase shadow-sm focus:border-brand.sky focus:outline-none',
              errors.origin ? 'border-red-400' : 'border-neutral-200'
            )}
          />
          {errors.origin && <p className="mt-1 text-xs text-red-500">{errors.origin}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-neutral-600" htmlFor="destination">
            Destination Airport
          </label>
          <input
            id="destination"
            name="destination"
            type="text"
            list="airports"
            value={values.destination}
            onChange={handleChange}
            placeholder="e.g., JFK"
            className={clsx(
              'mt-2 w-full rounded-2xl border px-4 py-3 text-base uppercase shadow-sm focus:border-brand.sky focus:outline-none',
              errors.destination ? 'border-red-400' : 'border-neutral-200'
            )}
          />
          {errors.destination && <p className="mt-1 text-xs text-red-500">{errors.destination}</p>}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <DatePicker
          id="departureDate"
          name="departureDate"
          label="Departure Date"
          value={values.departureDate}
          onChange={handleChange}
          error={errors.departureDate}
        />
        <DatePicker
          id="returnDate"
          name="returnDate"
          label="Return Date"
          optional
          value={values.returnDate ?? ''}
          onChange={handleChange}
          error={errors.returnDate}
        />
      </div>
      <datalist id="airports">
        {airports.map((airport) => (
          <option key={airport.code} value={airport.code}>
            {airport.name} – {airport.city}
          </option>
        ))}
      </datalist>
      <div className="flex items-center gap-3">
        {/* QA-DEFECT-001: Icon-only search button lacks accessible label */}
        <Button type="submit" size="icon" disabled={isSubmitting} aria-hidden>
          <Search className="h-5 w-5" aria-hidden />
        </Button>
        <p className="text-xs text-neutral-500">
          Submit a search to view mock availability. QA candidates should document any surprising behavior.
        </p>
      </div>
    </form>
  );
}
