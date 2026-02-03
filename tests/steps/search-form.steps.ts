import { Given, When, Then } from '@cucumber/cucumber';
import type { CustomWorld } from '../support/world';
import { SearchFormPage } from '../pom/SearchFormPage';
import { ResultsPage } from '../pom/ResultsPage';
import { DefectResultsPage } from '../pom/DefectResultsPage';

Given('I am on the search form', async function (this: CustomWorld) {
  const page = new SearchFormPage(this.page);
  await page.open();


});

Then('I should see the hero heading', async function (this: CustomWorld) {
  const page = new SearchFormPage(this.page);
  await page.assertHeroHeading();
  await this.page.waitForTimeout(5000);
});

When(
  'I submit a search from {string} to {string} departing {string} returning {string}',
  async function (this: CustomWorld, origin: string, destination: string, departure: string, ret: string) {
    const page = new SearchFormPage(this.page);
    await page.fillTrip(origin, destination, departure, ret);
    await this.page.waitForTimeout(5000);
    await page.submit();


  }
);

Then(
  'I should be navigated to results for origin {string} and destination {string}',
  async function (this: CustomWorld, origin: string, destination: string) {
    const page = new SearchFormPage(this.page);
    await page.assertNavigatedToResults(origin, destination);

  }
);

Then('I should see the results list', async function (this: CustomWorld) {
  //const results = new ResultsPage(this.page);
  //await results.assertResultsListVisible();

});

When(
  'I open results for origin {string} destination {string} departing {string} returning {string}',
  async function (this: CustomWorld, origin: string, destination: string, departure: string, ret: string) {

    const results = new ResultsPage(this.page);
    await results.open({ origin, destination, departureDate: departure, returnDate: ret || undefined });


  }
);



When(
  'I view results on a small screen for origin {string} destination {string} departing {string}',
  async function (this: CustomWorld, origin: string, destination: string, departure: string) {
    await this.page.setViewportSize({ width: 500, height: 900 });
    const results = new ResultsPage(this.page);
    await results.open({ origin, destination, departureDate: departure });

  }
);

Then('the booking overlay should be visible', async function (this: CustomWorld) {
  const results = new ResultsPage(this.page);
  await results.assertOverlayVisible();
});
Then(
  'I should be navigated to results for origin {string} and destination {string}',
  async function (this: CustomWorld, origin: string, destination: string) {
    const defectResults = new DefectResultsPage(this.page);

    await defectResults.assertNavigatedWithInvalidDates(origin, destination);
  }
);
Then(
  'the results page should still load for origin {string} and destination {string}',
  async function (this: CustomWorld, origin: string, destination: string) {
    //const defectResults = new DefectResultsPage(this.page);
    //await defectResults.assertNavigatedWithInvalidDates(origin, destination);
  }
);
