import { test, expect } from '../src/FixtureConfigs';

test.describe('Post Reading Functionality', () => {

    test('Verify user can open and read full post details from preview', {
        tag: '@smoke',
    }, async ({ page, homePage, articlePage }) => {
        await homePage.open();
        expect(page.url()).toContain(await homePage.getPageUrl());

        await homePage.verifyAllPreviewsVisible();
        await homePage.postComponent.checkPostVisibility();
        const previewData = await homePage.postComponent.getPreviewData();
        await homePage.postComponent.navigateToFullPost();

        const articleData = await articlePage.getArticleData();
        expect(articleData.title).toBe(previewData.title);
        expect(articleData.date).toBe(previewData.date);
        expect(articleData.readTime).toBe(previewData.readTime);
        await articlePage.verifyImageVisible();
    });
});