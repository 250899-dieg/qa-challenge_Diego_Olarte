import { test, expect } from '@playwright/test';

test.describe('Search form', () => {
  test('submitting navigates to results page', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Origin Airport').fill('BOG');
    await page.getByLabel('Destination Airport').fill('JFK');
    await page.getByLabel('Departure Date').fill('2026-02-15');
    await page.getByLabel('Return Date').fill('2026-02-20');
    await page.locator('form button[type="submit"]').click();
    await expect(page).toHaveURL(/results\?origin=BOG/);
  });
});
