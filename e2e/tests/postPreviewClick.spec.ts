import { test, expect } from '../src/FixtureConfigs';

test.describe('Post Reading Functionality', () => {
    test('Verify user can open and read full post details from preview', {
        tag: ['@regression', '@smoke']
    }, async ({ page, homePage, articlePage }) => {
        await homePage.open();
        expect(page.url()).toContain(await homePage.getPageUrl());

        (await homePage.postsPreview.title()).isVisible();
        (await homePage.postsPreview.description()).isVisible();
        (await homePage.postsPreview.keywords()).isVisible();
        (await homePage.postsPreview.image()).isVisible();
        (await homePage.postsPreview.date()).isVisible();
        (await homePage.postsPreview.readTime()).isVisible();

        const titlePreviewData = await homePage.postsPreview.getTitle();
        const datePreviewData = await homePage.postsPreview.getDate();
        const readTimePreviewData = await homePage.postsPreview.getReadTime();
        const pageUrlFromReadMoreLink = await homePage.postsPreview.getPageUrlFromReadMoreLink();

        await homePage.postsPreview.clickOnReadMore();
        expect(await articlePage.getPageUrl()).toContain(pageUrlFromReadMoreLink);

        expect(await articlePage.articleContent.getTitle()).toEqual(titlePreviewData);
        expect(await articlePage.articleContent.getDate()).toEqual(datePreviewData);
        expect(await articlePage.articleContent.getReadTime()).toEqual(readTimePreviewData);

        await articlePage.articleContent.elementsAreVisible(await articlePage.articleContent.getAllImages());
    });
});