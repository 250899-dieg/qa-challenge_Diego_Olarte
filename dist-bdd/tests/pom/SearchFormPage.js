"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFormPage = void 0;
const test_1 = require("@playwright/test");
class SearchFormPage {
    page;
    origin;
    destination;
    departureDate;
    returnDate;
    submitBtn;
    constructor(page) {
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
    async fillTrip(origin, destination, departure, ret) {
        await this.origin.fill(origin);
        await this.destination.fill(destination);
        await this.departureDate.fill(departure);
        await this.returnDate.fill(ret);
    }
    async submit() {
        await this.submitBtn.click();
    }
    async assertNavigatedToResults(origin) {
        await (0, test_1.expect)(this.page).toHaveURL(new RegExp(`/results\\?origin=${origin}`));
    }
}
exports.SearchFormPage = SearchFormPage;
