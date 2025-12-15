import { test, expect } from '../src/fixtures/FixtureConfigs';
import searchTerms from '../src/test-data/searchTerms.json';

test.describe('Search', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test(
    'should return matching results for specific input',
    {
      tag: ['@regression', '@smoke'],
    },
    async ({ homePage }) => {
      await homePage.header.clickOnSearch();
      await expect(homePage.searchModal.searchInput).toBeVisible();
      await homePage.searchModal.search(searchTerms.specificInput);
      await expect(homePage.searchModal.searchInput).toHaveValue(
        searchTerms.specificInput
      );

      const filteredResults = await homePage.searchModal.getResultsContaining(
        searchTerms.specificInput
      );

      expect(await filteredResults.count()).toBeGreaterThan(0);
    }
  );

  test(
    'should close when clicking search icon again',
    {
      tag: '@regression',
    },
    async ({ homePage }) => {
      await homePage.header.clickOnSearch();
      await expect(homePage.searchModal.searchInput).toBeVisible();
      await homePage.header.clickOnSearch();
      await expect(homePage.searchModal.searchInput).toBeHidden();
    }
  );

  test(
    'should display correct results counter matching actual number of results',
    {
      tag: '@regression',
    },
    async ({ homePage }) => {
      await homePage.header.clickOnSearch();
      await expect(homePage.searchModal.searchInput).toBeVisible();
      await homePage.searchModal.search(searchTerms.specificInput);
      await expect(homePage.searchModal.resultCounter).toBeVisible();

      const resultItemsCount = await homePage.searchModal.searchResults.count();
      const resultCounterValue =
        await homePage.searchModal.getResultCounterValue();

      expect(resultCounterValue).toEqual(resultItemsCount);
    }
  );

  test(
    'should show no results for empty input',
    {
      tag: '@regression',
    },
    async ({ homePage }) => {
      await homePage.header.clickOnSearch();
      await expect(homePage.searchModal.searchInput).toBeVisible();
      await homePage.searchModal.search(searchTerms.emptyInput);
      expect(await homePage.searchModal.searchResults.count()).toBe(0);
    }
  );

  test(
    'should show no results when input has no match',
    {
      tag: '@regression',
    },
    async ({ homePage }) => {
      await homePage.header.clickOnSearch();
      await expect(homePage.searchModal.searchInput).toBeVisible();
      await homePage.searchModal.search(searchTerms.noMatchInput);
      expect(await homePage.searchModal.searchResults.count()).toBe(0);
    }
  );

  test(
    'should handle input with special characters',
    {
      tag: '@regression',
    },
    async ({ homePage }) => {
      await homePage.header.clickOnSearch();
      await expect(homePage.searchModal.searchInput).toBeVisible();
      await homePage.searchModal.search(searchTerms.specialCharactersInput);

      const filteredResults = await homePage.searchModal.getResultsContaining(
        searchTerms.specialCharactersInput
      );

      expect(await filteredResults.count()).toBeGreaterThan(0);
    }
  );

  test(
    'should be case-insensitive when searching',
    {
      tag: '@regression',
    },
    async ({ homePage }) => {
      await homePage.header.clickOnSearch();
      await expect(homePage.searchModal.searchInput).toBeVisible();
      await homePage.searchModal.search(searchTerms.lowercaseInput);

      const lowercaseResultsCount =
        await homePage.searchModal.searchResults.count();

      await homePage.searchModal.clearSearchInput();
      await homePage.searchModal.search(searchTerms.uppercaseInput);

      const uppercaseResultsCount =
        await homePage.searchModal.searchResults.count();

      expect(lowercaseResultsCount).toEqual(uppercaseResultsCount);
    }
  );

  test(
    'should display search results with title and description',
    {
      tag: '@regression',
    },
    async ({ homePage }) => {
      await homePage.header.clickOnSearch();
      await expect(homePage.searchModal.searchInput).toBeVisible();
      await homePage.searchModal.search(searchTerms.specificInput);

      const firstSearchResult = (
        await homePage.searchModal.searchResults.all()
      )[0];

      await expect(
        await homePage.searchModal.getSearchResultTitle(firstSearchResult)
      ).toBeVisible();
      await expect(
        await homePage.searchModal.getSearchResultDescription(firstSearchResult)
      ).toBeVisible();
    }
  );
});
