"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('Smoke', () => {
    (0, test_1.test)('homepage renders hero content', async ({ page }) => {
        await page.goto('/');
        await (0, test_1.expect)(page.getByRole('heading', { name: 'Flight Management QA Challenge' })).toBeVisible();
    });
});
