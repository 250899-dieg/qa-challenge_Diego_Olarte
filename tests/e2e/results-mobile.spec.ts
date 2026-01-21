import { test, expect } from '@playwright/test';

test.describe('Mobile overlay defect', () => {
  test('Book button is obstructed on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 500, height: 900 });
    await page.goto('/results?origin=BOG&destination=GRU&departureDate=2026-02-25');
    await expect(page.getByTestId('book-overlay')).toBeVisible();
  });
});
