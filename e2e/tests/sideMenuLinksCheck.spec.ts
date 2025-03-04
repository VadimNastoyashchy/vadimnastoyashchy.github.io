import { test, expect } from '../src/fixtures/FixtureConfigs';
import { elementsAreVisible, getAllLinks, verifyLinksResponse, getHrefFromLink } from '../src/utils/commonFunctions';

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

    test('Navigation to the Home page from the side bar', {
        tag: '@regression'
    }, async ({ aboutPage, homePage }) => {

        await aboutPage.openAndVerify();

        await aboutPage.header.clickOnBurgerMenu();
        await aboutPage.sideMenu.sidebarContainer.isVisible();

        await aboutPage.sideMenu.clickOnHomeLink();

        const getUrl = await getHrefFromLink(homePage.header.logo);

        expect (await homePage.getPageUrl()).toContain(getUrl);
    });
});