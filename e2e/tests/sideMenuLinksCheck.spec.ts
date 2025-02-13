import { test } from '../src/FixtureConfigs';
import { elementsAreVisible, getAllLinks, verifyLinksResponse } from '../src/commonFunctions';

test.describe('Side Menu Navigation', () => {
    test('Verify side menu functionality and link navigation', {
        tag: '@regression'
    }, async ({ homePage }) => {
        await homePage.openAndVerify();

        await homePage.header.clickOnBurgerMenu();
        await homePage.sideMenu.sidebar.isVisible();
        await elementsAreVisible(homePage.sideMenu.allLinks);

        const linksUrls = await getAllLinks(homePage.sideMenu.sidebar, await homePage.getPageUrl());
        await verifyLinksResponse(linksUrls);
    });
});