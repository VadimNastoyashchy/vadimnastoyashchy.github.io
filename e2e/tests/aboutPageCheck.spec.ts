import { test, expect } from '../src/fixtures/FixtureConfigs';
import { elementsAreVisible, getAllLinks, verifyLinksResponse, getHrefFromLink } from '../src/utils/commonFunctions';

test.describe('About Page Functionality', () => {
    test('About page is available and all the elements are working as expected', {
        tag: '@regression'
    }, async ({ homePage, aboutPage }) => {

        await homePage.openAndVerify();

        await homePage.header.clickOnBurgerMenu();
        await expect(homePage.sideMenu.sidebarContainer).toBeVisible();
        const getAboutUrl = await getHrefFromLink(homePage.sideMenu.aboutLink);
        await homePage.sideMenu.clickOnAboutLink();

        expect (await aboutPage.getPageUrl()).toContain(getAboutUrl);

        await aboutPage.aboutContent.title.isVisible();
        await aboutPage.aboutContent.image.isVisible();
        await aboutPage.aboutContent.contactMe.isVisible();
        await elementsAreVisible(aboutPage.aboutContent.textInfo);

        const allLinks = await getAllLinks(aboutPage.aboutContent.allLinks, await aboutPage.getPageUrl());
        await verifyLinksResponse(allLinks);
    });
});