"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('Flights API contract', () => {
    (0, test_1.test)('returns 200 for uppercase search parameters', async ({ request }) => {
        const response = await request.get('/api/flights', {
            params: {
                origin: 'BOG',
                destination: 'MEX',
                departureDate: '2026-02-15'
            }
        });
        (0, test_1.expect)(response.status()).toBe(200);
        const body = await response.json();
        (0, test_1.expect)(Array.isArray(body.flights)).toBe(true);
    });
});
