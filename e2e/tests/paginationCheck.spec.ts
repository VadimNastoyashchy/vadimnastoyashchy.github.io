import { test, expect } from '../src/fixtures/FixtureConfigs';
import { elementsAreVisible, getHrefFromLink } from '../src/utils/commonFunctions';

test.describe('Pagination Functionality', () => {
    test('Verify pagination controls and navigation', {
        tag: '@regression'
    }, async ({ page, homePage }) => {
        await homePage.openAndVerify();

        await elementsAreVisible(homePage.postsPreview.allPosts);
        await homePage.pagination.paginationSection.isVisible();
        await homePage.pagination.olderButton.isVisible();

        const olderButtonUrl = await getHrefFromLink(homePage.pagination.olderButton);
        await homePage.pagination.clickOnOlderButton();
        await elementsAreVisible(homePage.postsPreview.allPosts);
        expect(olderButtonUrl).not.toBe(await getHrefFromLink(homePage.pagination.newerButton));

        await homePage.pagination.newerButton.isVisible();
        await homePage.pagination.clickOnNewerButton();
        await elementsAreVisible(homePage.postsPreview.allPosts);
        expect(page.url()).toContain(await homePage.getPageUrl());
    });
});