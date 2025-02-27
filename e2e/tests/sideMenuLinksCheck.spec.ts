import { test } from '../src/fixtures/FixtureConfigs';
import { elementsAreVisible, getAllLinks, verifyLinksResponse } from '../src/utils/commonFunctions';

test.describe('Side Menu Navigation', () => {
    test('Verify side menu functionality and link navigation', {
        tag: '@regression'
    }, async ({ homePage }) => {
        await homePage.openAndVerify();

        await homePage.header.clickOnBurgerMenu();
        await homePage.sideMenu.sidebarContainer.isVisible();
        await elementsAreVisible(homePage.sideMenu.allLinks);

        const linksUrls = await getAllLinks(homePage.sideMenu.sidebarContainer, await homePage.getPageUrl());
        await verifyLinksResponse(linksUrls);
    });
});