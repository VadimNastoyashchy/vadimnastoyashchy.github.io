import { test, expect } from '../src/fixtures/FixtureConfigs';
test.describe('Search', () => {
  test(
    'User can search for an article with specific input',
    {
      tag: '@regression',
    },
    async ({ homePage }) => {
      const inputText = 'Playwright';

      await homePage.open();
      await homePage.header.clickOnSearch();
      await expect(homePage.header.searchInput).toBeVisible();

      await homePage.header.fillSearchInput(inputText);
      await expect(homePage.header.searchInput).toHaveValue(inputText);
      await expect(
        (await homePage.postsPreview.getSearchResults(inputText)).length
      ).toBeGreaterThan(0);
    }
  );
});
