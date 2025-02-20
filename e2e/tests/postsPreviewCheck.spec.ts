import { test, expect } from '../src/fixtures/FixtureConfigs';
import { elementsAreVisible, getAllLinks, verifyLinksResponse } from '../src/utils/commonFunctions';
test.describe('Preview Post Validations', () => {
    test('Ensure the home page displays preview posts with correctly functioning links', {
        tag: ['@regression', '@smoke']
    }, async ({ homePage }) => {
        const amoutOfPosts = 15;

        await homePage.openAndVerify();

        await elementsAreVisible(homePage.postsPreview.allPosts);

        expect(await homePage.postsPreview.getAllPosts()).toHaveLength(amoutOfPosts);
        expect(await homePage.postsPreview.getAllReadMoreLinks()).toHaveLength(amoutOfPosts);

        const linksUrls = await getAllLinks(homePage.postsPreview.allReadMoreLinks, await homePage.getPageUrl());
        await verifyLinksResponse(linksUrls);
    });
});