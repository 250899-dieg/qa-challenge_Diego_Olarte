import { test, expect } from '@playwright/test';

test.describe('Results list', () => {
  test('shows flights and negative fare', async ({ page }) => {
    await page.goto('/results?origin=BOG&destination=MEX&departureDate=2026-02-15');
    await expect(page.getByText('Skyline Skyways')).toBeVisible();
    await expect(page.getByTestId('results-list')).toBeVisible();
  });
});
