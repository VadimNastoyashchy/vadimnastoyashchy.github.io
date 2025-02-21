import { test, expect } from '../src/fixtures/FixtureConfigs';
import { elementsAreVisible } from '../src/utils/commonFunctions';
test.describe('Search Functionality', () => {
    test('User can search for an article with specific keywords', {
        tag: '@regression'
    }, async ({ homePage }) => {
        const inputText = 'Playwright';

        await homePage.openAndVerify();
        await homePage.header.clickOnSearch();
        await expect(homePage.header.searchInput).toBeVisible();

        await homePage.header.fillSearchInput(inputText);
        await expect(homePage.header.searchInput).toHaveValue(inputText);
        await homePage.header.submitSearch();

        await elementsAreVisible(homePage.postsPreview.searchResultPosts);
        await homePage.postsPreview.getSearchResults(inputText);
    });
});