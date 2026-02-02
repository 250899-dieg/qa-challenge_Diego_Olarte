"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('Results list', () => {
    (0, test_1.test)('shows flights and negative fare', async ({ page }) => {
        await page.goto('/results?origin=BOG&destination=MEX&departureDate=2026-02-15');
        await (0, test_1.expect)(page.getByText('Skyline Skyways')).toBeVisible();
        await (0, test_1.expect)(page.getByTestId('results-list')).toBeVisible();
    });
});
