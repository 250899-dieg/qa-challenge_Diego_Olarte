"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefectResultsPage = void 0;
const test_1 = require("@playwright/test");
class DefectResultsPage {
    page;
    title;
    availabilityText;
    emptyState;
    constructor(page) {
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
    async assertNavigatedWithInvalidDates(origin, destination) {
        await (0, test_1.expect)(this.page).toHaveURL(new RegExp(`/results\\?[^#]*origin=${origin}[^#]*destination=${destination}`));
        await (0, test_1.expect)(this.title).toBeVisible();
    }
    /**
     * (Opcional) Confirma que igual muestra availability
     */
    async assertAvailabilityShown(origin, destination) {
        await (0, test_1.expect)(this.availabilityText).toContainText(`${origin} → ${destination}`);
    }
    /**
     * (Opcional) Estado sin resultados
     */
    async assertEmptyStateVisible() {
        await (0, test_1.expect)(this.emptyState).toBeVisible();
    }
}
exports.DefectResultsPage = DefectResultsPage;
