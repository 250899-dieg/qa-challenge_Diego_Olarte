import { Page, Locator, expect } from '@playwright/test';

export class SearchFormPage {
  readonly page: Page;

  readonly origin: Locator;
  readonly destination: Locator;
  readonly departureDate: Locator;
  readonly returnDate: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page = page;

    // ✅ Reutiliza EXACTO lo que ya funciona en el spec
    this.origin = page.getByLabel('Origin Airport');
    this.destination = page.getByLabel('Destination Airport');
    this.departureDate = page.getByLabel('Departure Date');
    this.returnDate = page.getByLabel('Return Date');
    this.submitBtn = page.locator('form button[type="submit"]');
  }

  async open() {
    const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';
    await this.page.goto(baseUrl + '/', { waitUntil: 'domcontentloaded' });
  }

  async fillTrip(origin: string, destination: string, departure: string, ret: string) {
    await this.origin.fill(origin);
    await this.destination.fill(destination);
    await this.departureDate.fill(departure);
    await this.returnDate.fill(ret);
  }

  async submit() {
    await this.submitBtn.click();
  }

  async assertNavigatedToResults(origin: string) {
    await expect(this.page).toHaveURL(new RegExp(`/results\\?origin=${origin}`));
  }
}
