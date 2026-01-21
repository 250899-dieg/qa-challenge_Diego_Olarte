import { test, expect } from '@playwright/test';

test.describe('Flights API contract', () => {
  test('returns 200 for uppercase search parameters', async ({ request }) => {
    const response = await request.get('/api/flights', {
      params: {
        origin: 'BOG',
        destination: 'MEX',
        departureDate: '2026-02-15'
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body.flights)).toBe(true);
  });
});
