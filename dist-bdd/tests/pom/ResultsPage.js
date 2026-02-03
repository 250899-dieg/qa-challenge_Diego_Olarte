"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultsPage = void 0;
const test_1 = require("@playwright/test");
class ResultsPage {
    page;
    resultsList;
    overlay;
    constructor(page) {
        this.page = page;
        this.resultsList = page.getByTestId('results-list');
        this.overlay = page.getByTestId('book-overlay'); // usado en results-mobile.spec.ts
    }
    async open(params) {
        const baseUrl = process.env.BASE_URL ?? 'http://localhost:3000';
        const url = new URL('/results', baseUrl);
        url.searchParams.set('origin', params.origin);
        url.searchParams.set('destination', params.destination);
        url.searchParams.set('departureDate', params.departureDate);
        if (params.returnDate)
            url.searchParams.set('returnDate', params.returnDate);
        await this.page.goto(url.toString(), { waitUntil: 'domcontentloaded' });
    }
    async assertOnResults(origin, destination) {
        await (0, test_1.expect)(this.page).toHaveURL(new RegExp(`/results\\?[^#]*origin=${origin}[^#]*destination=${destination}`));
    }
    async assertHeader(origin, destination) {
        // En UI se ve “Flight Results” + “Showing availability for BOG → MEX…”
        await (0, test_1.expect)(this.page.getByText('Flight Results')).toBeVisible();
        await (0, test_1.expect)(this.page.getByText(`${origin} → ${destination}`)).toBeVisible();
    }
    async assertResultsListVisible() {
        await (0, test_1.expect)(this.resultsList).toBeVisible();
        // si quieres ser más fuerte: al menos 1 card
        await (0, test_1.expect)(this.resultsList.locator('article')).toHaveCount(1);
    }
    async assertOverlayVisible() {
        await (0, test_1.expect)(this.overlay).toBeVisible();
    }
}
exports.ResultsPage = ResultsPage;
