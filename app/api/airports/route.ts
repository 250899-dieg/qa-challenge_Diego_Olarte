import { NextResponse } from 'next/server';

import { listAirports } from '@/data/airports';
import { withTiming } from '@/lib/perf';

export async function GET() {
  return withTiming('api-airports', () => {
    try {
      const traceId = crypto.randomUUID();
      return NextResponse.json({ airports: listAirports(), traceId });
    } catch (error) {
      console.error('Failed to list airports', error);
      return NextResponse.json(
        { message: 'Unable to load airports', traceId: crypto.randomUUID() },
        { status: 500 }
      );
    }
  });
}
