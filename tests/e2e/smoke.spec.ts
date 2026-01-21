import { test, expect } from '@playwright/test';

test.describe('Smoke', () => {
  test('homepage renders hero content', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Flight Management QA Challenge' })).toBeVisible();
  });
});
