import { test, expect } from '../src/fixtures/FixtureConfigs';
import * as utils from '../src/utils';
test.describe('Side Menu', () => {
  test('Verify functionality and link navigation',
    {
      tag: '@regression',
    },
    async ({ homePage }) => {
      await homePage.open();

      await homePage.header.clickOnBurgerMenu();
      await homePage.sideMenu.container.isVisible();
      await expect(homePage.sideMenu.links).areVisible();

      const linksUrls = await utils.getLinks(
        homePage.sideMenu.container,
        await homePage.getPageUrl()
      );
      await utils.verifyLinks(linksUrls);
    }
  );

  test('Navigation to the Home page from the side bar',
    {
      tag: '@regression',
    },
    async ({ aboutPage, homePage }) => {
      await aboutPage.open();

      await aboutPage.header.clickOnBurgerMenu();
      await aboutPage.sideMenu.container.isVisible();

      const homeLink = await aboutPage.sideMenu.getLinkByText('Home');
      await homeLink.click();

      const getUrl = await utils.getHrefFromLink(homePage.header.logo);

      expect(await homePage.getPageUrl()).toContain(getUrl);
    }
  );
});
