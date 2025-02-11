import { test, expect } from '../src/FixtureConfigs';

test.describe('Preview Post Validations', () => {
    test('Ensure the home page displays preview posts with correctly functioning links', {
        tag: ['@regression', '@smoke']
    }, async ({ page, homePage }) => {
        const amoutOfPosts = 15;

        await homePage.open();
        expect(page.url()).toContain(await homePage.getPageUrl());

        await homePage.postsPreview.elementsAreVisible(homePage.postsPreview.allPosts);
        expect(await homePage.postsPreview.getAllPosts()).toHaveLength(amoutOfPosts);
        expect(await homePage.postsPreview.getAllReadMoreLinks()).toHaveLength(amoutOfPosts);

        const linksUrls = await homePage.postsPreview.getAllLinks(homePage.postsPreview.allReadMoreLinks);
        await homePage.postsPreview.verifyLinksResponse(linksUrls);
    });
});