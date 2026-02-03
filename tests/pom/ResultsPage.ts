import { Page, Locator, expect } from '@playwright/test';

export class ResultsPage {
  readonly page: Page;

  readonly resultsList: Locator;
  readonly overlay: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resultsList = page.getByTestId('results-list');
    this.overlay = page.getByTestId('book-overlay'); // usado en results-mobile.spec.ts
  }

  async open(params: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
  }) {
    const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';

    const url = new URL('/results', baseUrl);
    url.searchParams.set('origin', params.origin);
    url.searchParams.set('destination', params.destination);
    url.searchParams.set('departureDate', params.departureDate);
    if (params.returnDate) url.searchParams.set('returnDate', params.returnDate);

    await this.page.goto(url.toString(), { waitUntil: 'domcontentloaded' });
  }

  async assertOnResults(origin: string, destination: string) {
    await expect(this.page).toHaveURL(new RegExp(`/results\\?[^#]*origin=${origin}[^#]*destination=${destination}`));
  }

  async assertHeader(origin: string, destination: string) {
    // En UI se ve “Flight Results” + “Showing availability for BOG → MEX…”
    await expect(this.page.getByText('Flight Results')).toBeVisible();
    await expect(this.page.getByText(`${origin} → ${destination}`)).toBeVisible();
  }

  async assertResultsListVisible() {
    await expect(this.resultsList).toBeVisible();
    // si quieres ser más fuerte: al menos 1 card
    await expect(this.resultsList.locator('article')).toHaveCount(1);
  }

  async assertOverlayVisible() {
    await expect(this.overlay).toBeVisible();
  }
}
