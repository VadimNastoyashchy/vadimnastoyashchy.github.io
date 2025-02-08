import { test, expect } from '../src/FixtureConfigs';

test.describe('Post Reading Functionality', () => {
    test('Verify user can open and read full post details from preview', {
        tag: '@smoke',
    }, async ({ page, homePage, articlePage }) => {
        await homePage.open();
        expect(page.url()).toContain(await homePage.getPageUrl());

        await homePage.postsPreview.getLatestPost();
        (await homePage.postsPreview.getTitle()).isVisible();
        (await homePage.postsPreview.getDescription()).isVisible();
        (await homePage.postsPreview.getKeywords()).isVisible();
        (await homePage.postsPreview.getImage()).isVisible();
        (await homePage.postsPreview.getDateAndReadTime()).isVisible();

        await homePage.postsPreview.getTitlePreviewData();
        await homePage.postsPreview.getDateAndReadTimePreviewData();

        const pageUrlFromReadMoreLink = await homePage.postsPreview.getPageUrlFromReadMoreLink()

        await homePage.postsPreview.clickOnReadMore();
        // await homePage.postsPreview.navigateToFullPost();

        // const articleData = await articlePage.getArticleData();
        // expect(articleData.title).toBe(previewData.title);
        // expect(articleData.date).toBe(previewData.date);
        // expect(articleData.readTime).toBe(previewData.readTime);
        // await articlePage.verifyImageVisible();
    });
});