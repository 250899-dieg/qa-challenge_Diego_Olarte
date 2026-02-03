import { expect, type Page, type Locator } from '@playwright/test';

export class DefectResultsPage {
  readonly page: Page;

  readonly title: Locator;
  readonly availabilityText: Locator;
  readonly emptyState: Locator;

  constructor(page: Page) {
    this.page = page;

    this.title = page.getByRole('heading', { name: 'Flight Results' });

    // Texto: "Showing availability for BOG → MEX on 2026-02-20."
    this.availabilityText = page.getByText(/Showing availability for/i);

    // Mensaje cuando no hay vuelos
    this.emptyState = page.getByText(/No flights found for this combination/i);
  }

  /**
   * DEFECTO:
   * Permite return < departure y navega a /results
   */
  async assertNavigatedWithInvalidDates(origin: string, destination: string) {
    await expect(this.page).toHaveURL(
      new RegExp(
        `/results\\?[^#]*origin=${origin}[^#]*destination=${destination}`
      )
    );

    await expect(this.title).toBeVisible();
  }

  /**
   * (Opcional) Confirma que igual muestra availability
   */
  async assertAvailabilityShown(origin: string, destination: string) {
    await expect(this.availabilityText).toContainText(`${origin} → ${destination}`);
  }

  /**
   * (Opcional) Estado sin resultados
   */
  async assertEmptyStateVisible() {
    await expect(this.emptyState).toBeVisible();
  }
}
