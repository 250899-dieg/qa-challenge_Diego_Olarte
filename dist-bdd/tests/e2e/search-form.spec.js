"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('Search form', () => {
    (0, test_1.test)('submitting navigates to results page', async ({ page }) => {
        await page.goto('/');
        await page.getByLabel('Origin Airport').fill('BOG');
        await page.getByLabel('Destination Airport').fill('JFK');
        await page.getByLabel('Departure Date').fill('2026-02-15');
        await page.getByLabel('Return Date').fill('2026-02-20');
        await page.locator('form button[type="submit"]').click();
        await (0, test_1.expect)(page).toHaveURL(/results\?origin=BOG/);
    });
});
