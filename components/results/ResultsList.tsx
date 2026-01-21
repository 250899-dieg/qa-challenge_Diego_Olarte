"use client";

import { useEffect, useState } from 'react';

import type { FlightOption } from '@/data/flights';
import { markClient } from '@/lib/perf';
import { FlightCard } from '@/components/results/FlightCard';

export type ResultsListProps = {
  params: {
    origin?: string;
    destination?: string;
    departureDate?: string;
    returnDate?: string;
  };
};

export function ResultsList({ params }: ResultsListProps) {
  const [flights, setFlights] = useState<FlightOption[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'empty' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (!params.origin || !params.destination || !params.departureDate) {
      setStatus('idle');
      return;
    }

    const controller = new AbortController();
    async function loadFlights() {
      setStatus('loading');
      setErrorMessage('');
      markClient('results-fetch', 'start');
      try {
        const url = new URL('/api/flights', window.location.origin);
        url.searchParams.set('origin', params.origin!);
        url.searchParams.set('destination', params.destination!);
        url.searchParams.set('departureDate', params.departureDate!);
        if (params.returnDate) {
          url.searchParams.set('returnDate', params.returnDate);
        }
        const response = await fetch(url.toString(), { signal: controller.signal });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Unable to load flights');
        }
        const data = (await response.json()) as { flights: FlightOption[] };
        setFlights(data.flights);
        setStatus(data.flights.length ? 'success' : 'empty');
      } catch (error) {
        if (controller.signal.aborted) return;
        setErrorMessage(error instanceof Error ? error.message : 'Unexpected error');
        setStatus('error');
      } finally {
        markClient('results-fetch', 'end');
      }
    }

    void loadFlights();
    return () => controller.abort();
  }, [params.origin, params.destination, params.departureDate, params.returnDate]);

  if (!params.origin || !params.destination || !params.departureDate) {
    return (
      <p className="text-sm text-neutral-500">
        Submit a search to view results. Include origin, destination, and departure date.
      </p>
    );
  }

  if (status === 'loading') {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-3xl bg-neutral-100" />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50/60 p-4 text-sm text-red-700">
        {errorMessage || 'We could not load flights with the provided filters.'}
      </div>
    );
  }

  if (status === 'empty') {
    return (
      <div className="rounded-2xl border border-neutral-100 bg-white p-6 text-sm text-neutral-600">
        No flights found for this combination. QA candidates should note this state in BUGS.md.
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="space-y-4" data-testid="results-list">
        {flights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    );
  }

  return null;
}
