import { Given, When, Then } from '@cucumber/cucumber';
import { SearchFormPage } from '../pom/SearchFormPage';
import type { CustomWorld } from '../support/world';

Given('I am on the search form', async function (this: CustomWorld) {
  const page = new SearchFormPage(this.page);
  await page.open();
});

When(
  'I submit a search from {string} to {string} departing {string} returning {string}',
  async function (this: CustomWorld, origin: string, destination: string, departure: string, ret: string) {
    const page = new SearchFormPage(this.page);
    await page.fillTrip(origin, destination, departure, ret);
    await page.submit();
  }
);

Then('I should be navigated to results for origin {string}', async function (this: CustomWorld, origin: string) {
  //const page = new SearchFormPage(this.page);
  //await page.assertNavigatedToResults(origin);
});
