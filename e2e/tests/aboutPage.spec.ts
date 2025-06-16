import { test, expect } from '../src/fixtures/FixtureConfigs';
import * as utils from '../src/utils';

test.describe('About Page', () => {
  test(
    'Is available and elements are present on the page',
    {
      tag: '@regression',
    },
    async ({ homePage, aboutPage, page }) => {
      await homePage.open();
      await homePage.header.clickOnBurgerMenu();
      await homePage.sideMenu.clickOnAboutLink();

      expect(await aboutPage.getPageUrl()).toContain(page.url());
      await expect(aboutPage.title).toBeVisible();
      await expect(aboutPage.image).toBeVisible();
      await expect(aboutPage.contactMe).toBeVisible();

      const links = await utils.getLinks(
        aboutPage.allLinks,
        await aboutPage.getPageUrl()
      );
      await utils.verifyLinks(links);
    }
  );
});
