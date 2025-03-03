import { test, expect } from '../src/fixtures/FixtureConfigs';
import { elementsAreVisible } from '../src/utils/commonFunctions';

test.describe('Post Reading Functionality', () => {
    test('Verify user can open and read full post details from preview', {
        tag: ['@regression', '@smoke']
    }, async ({ homePage, articlePage }) => {
        await homePage.openAndVerify();

        await homePage.postsPreview.verifyAllElementsAreVisible();

        const titlePreviewData = await homePage.postsPreview.getTitle();
        const datePreviewData = await homePage.postsPreview.getDate();
        const readTimePreviewData = await homePage.postsPreview.getReadTime();
        const pageUrlFromReadMoreLink = await homePage.postsPreview.getPageUrlFromReadMoreLink();

        await homePage.postsPreview.clickOnReadMore();
        expect(await articlePage.getPageUrl()).toContain(pageUrlFromReadMoreLink);

        expect(await articlePage.articleContent.getTitle()).toEqual(titlePreviewData);
        expect(await articlePage.articleContent.getDate()).toEqual(datePreviewData);
        expect(await articlePage.articleContent.getReadTime()).toEqual(readTimePreviewData);

        await elementsAreVisible(await articlePage.articleContent.getAllImages());
    });
});