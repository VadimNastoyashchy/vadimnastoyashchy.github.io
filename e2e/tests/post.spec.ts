import { test, expect } from '../src/fixtures/FixtureConfigs';
import * as utils from '../src/utils';

test.describe('Post', () => {
    test('Verify user can open and read latest post', {
        tag: ['@regression', '@smoke']
    }, async ({ homePage, articlePage }) => {
        await homePage.open();

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

        await expect(await articlePage.articleContent.getAllImages()).areVisible()
    });


        test('Ensure the home page displays preview posts with correctly functioning links', {
            tag: ['@regression', '@smoke']
        }, async ({ homePage }) => {
            const amountOfPosts = 15;
    
            await homePage.open();
    
            await expect(homePage.postsPreview.allPosts).areVisible();
            expect(await homePage.postsPreview.getAllPosts()).toHaveLength(amountOfPosts);
            expect(await homePage.postsPreview.getAllReadMoreLinks()).toHaveLength(amountOfPosts);
    
            const linksUrls = await utils.getLinks(homePage.postsPreview.allReadMoreLinks, await homePage.getPageUrl());
            await utils.verifyLinks(linksUrls);
        });
});