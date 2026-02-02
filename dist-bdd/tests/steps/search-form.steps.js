"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const SearchFormPage_1 = require("../pom/SearchFormPage");
(0, cucumber_1.Given)('I am on the search form', async function () {
    const page = new SearchFormPage_1.SearchFormPage(this.page);
    await page.open();
});
(0, cucumber_1.When)('I submit a search from {string} to {string} departing {string} returning {string}', async function (origin, destination, departure, ret) {
    const page = new SearchFormPage_1.SearchFormPage(this.page);
    await page.fillTrip(origin, destination, departure, ret);
    await page.submit();
});
(0, cucumber_1.Then)('I should be navigated to results for origin {string}', async function (origin) {
    //const page = new SearchFormPage(this.page);
    //await page.assertNavigatedToResults(origin);
});
