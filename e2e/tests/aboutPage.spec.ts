import { test, expect } from '../src/fixtures/FixtureConfigs';
import * as utils from '../src/utils';

test.describe('About', () => {
    test('Page is available and all the elements are working as expected', {
        tag: '@regression'
    }, async ({ homePage, aboutPage }) => {

        await homePage.open();
        await homePage.header.clickOnBurgerMenu();
        await expect(homePage.sideMenu.container).toBeVisible();

        const aboutPageUrl = await utils.getHrefFromLink(homePage.sideMenu.aboutLink);
        await homePage.sideMenu.clickOnAboutLink();

        expect (await aboutPage.getPageUrl()).toContain(aboutPageUrl);

        await aboutPage.content.title.isVisible();
        await aboutPage.content.image.isVisible();
        await aboutPage.content.contactMe.isVisible();
        await expect(aboutPage.content.textInfo).areVisible()

        const links = await utils.getLinks(aboutPage.content.allLinks, await aboutPage.getPageUrl());
        await utils.verifyLinks(links);
    });
});