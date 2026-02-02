"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('Mobile overlay defect', () => {
    (0, test_1.test)('Book button is obstructed on small screens', async ({ page }) => {
        await page.setViewportSize({ width: 500, height: 900 });
        await page.goto('/results?origin=BOG&destination=GRU&departureDate=2026-02-25');
        await (0, test_1.expect)(page.getByTestId('book-overlay')).toBeVisible();
    });
});
