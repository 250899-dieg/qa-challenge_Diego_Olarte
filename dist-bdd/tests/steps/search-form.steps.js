"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const SearchFormPage_1 = require("../pom/SearchFormPage");
const ResultsPage_1 = require("../pom/ResultsPage");
const DefectResultsPage_1 = require("../pom/DefectResultsPage");
(0, cucumber_1.Given)('I am on the search form', async function () {
    const page = new SearchFormPage_1.SearchFormPage(this.page);
    await page.open();
});
(0, cucumber_1.Then)('I should see the hero heading', async function () {
    const page = new SearchFormPage_1.SearchFormPage(this.page);
    await page.assertHeroHeading();
    await this.page.waitForTimeout(5000);
});
(0, cucumber_1.When)('I submit a search from {string} to {string} departing {string} returning {string}', async function (origin, destination, departure, ret) {
    const page = new SearchFormPage_1.SearchFormPage(this.page);
    await page.fillTrip(origin, destination, departure, ret);
    await this.page.waitForTimeout(5000);
    await page.submit();
});
(0, cucumber_1.Then)('I should be navigated to results for origin {string} and destination {string}', async function (origin, destination) {
    const page = new SearchFormPage_1.SearchFormPage(this.page);
    await page.assertNavigatedToResults(origin, destination);
});
(0, cucumber_1.Then)('I should see the results list', async function () {
    //const results = new ResultsPage(this.page);
    //await results.assertResultsListVisible();
});
(0, cucumber_1.When)('I open results for origin {string} destination {string} departing {string} returning {string}', async function (origin, destination, departure, ret) {
    const results = new ResultsPage_1.ResultsPage(this.page);
    await results.open({ origin, destination, departureDate: departure, returnDate: ret || undefined });
});
(0, cucumber_1.When)('I view results on a small screen for origin {string} destination {string} departing {string}', async function (origin, destination, departure) {
    await this.page.setViewportSize({ width: 500, height: 900 });
    const results = new ResultsPage_1.ResultsPage(this.page);
    await results.open({ origin, destination, departureDate: departure });
});
(0, cucumber_1.Then)('the booking overlay should be visible', async function () {
    const results = new ResultsPage_1.ResultsPage(this.page);
    await results.assertOverlayVisible();
});
(0, cucumber_1.Then)('I should be navigated to results for origin {string} and destination {string}', async function (origin, destination) {
    const defectResults = new DefectResultsPage_1.DefectResultsPage(this.page);
    await defectResults.assertNavigatedWithInvalidDates(origin, destination);
});
(0, cucumber_1.Then)('the results page should still load for origin {string} and destination {string}', async function (origin, destination) {
    //const defectResults = new DefectResultsPage(this.page);
    //await defectResults.assertNavigatedWithInvalidDates(origin, destination);
});
