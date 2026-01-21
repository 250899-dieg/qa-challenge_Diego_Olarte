import { NextRequest, NextResponse } from 'next/server';

import { listFlights } from '@/data/flights';
import { withTiming } from '@/lib/perf';
import { isIata, isIsoDate } from '@/lib/validation';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const origin = url.searchParams.get('origin') ?? '';
  const destination = url.searchParams.get('destination') ?? '';
  const departureDate = url.searchParams.get('departureDate') ?? '';
  const returnDate = url.searchParams.get('returnDate') ?? undefined;
  const traceId = crypto.randomUUID();

  if (origin && origin !== origin.toUpperCase()) {
    // QA-DEFECT-004: Lowercase origin triggers intentional 500 for QA candidates
    console.warn('QA-DEFECT-004 triggered lowercase origin guard', { origin, traceId });
    return NextResponse.json(
      { message: 'Origin must be uppercase IATA code', traceId },
      { status: 500 }
    );
  }

  if (!origin || !destination || !departureDate) {
    return NextResponse.json(
      { message: 'origin, destination, and departureDate are required', traceId },
      { status: 400 }
    );
  }

  if (!isIata(origin) || !isIata(destination) || !isIsoDate(departureDate)) {
    return NextResponse.json(
      { message: 'Invalid query parameter format', traceId },
      { status: 400 }
    );
  }

  return withTiming('api-flights', () => {
    try {
      const flights = listFlights({ origin, destination, departureDate });
      return NextResponse.json({ flights, traceId, returnDate });
    } catch (error) {
      console.error('Failed to list flights', error, { traceId });
      return NextResponse.json(
        { message: 'Unable to load flights', traceId },
        { status: 500 }
      );
    }
  });
}
