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
        (await homePage.postsPreview.getDate()).isVisible();
        (await homePage.postsPreview.getReadTime()).isVisible();

        const titlePreviewData = await homePage.postsPreview.getTitlePreviewData();
        const datePreviewData = await homePage.postsPreview.getDatePreviewData();
        const readTimePreviewData = await homePage.postsPreview.getReadTimePreviewData();
        const pageUrlFromReadMoreLink = await homePage.postsPreview.getPageUrlFromReadMoreLink();

        await homePage.postsPreview.clickOnReadMore();
        expect(await articlePage.getPageUrl()).toContain(pageUrlFromReadMoreLink);

        expect(await articlePage.articleContent.getTitleArticleData()).toContain(titlePreviewData);
        expect(await articlePage.articleContent.getDateArticleData()).toContain(datePreviewData);
        expect(await articlePage.articleContent.getReadTimeArticleData()).toContain(readTimePreviewData);

        await articlePage.articleContent.elementsAreVisible(await articlePage.articleContent.getAllImages());
    });
});