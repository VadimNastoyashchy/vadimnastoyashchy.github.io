import { test, expect } from '../src/fixtures/FixtureConfigs';
import * as utils from '../src/utils';

test.describe('Header', () => {
  test('Section is visible and contains working links',
    {
      tag: '@regression',
    },
    async ({ page, homePage }) => {
      const inputText = 'What is a Testing Pyramid?';

      await homePage.open();

      await homePage.header.burgerMenu.isVisible();
      await homePage.header.logo.isVisible();
      await homePage.header.search.isVisible();

      await homePage.header.clickOnSearch();
      await homePage.header.fillSearchInput(inputText);
      await expect(homePage.header.searchInput).toHaveValue(inputText);

      await homePage.header.clickOnLogo();
      expect(await homePage.getPageUrl()).toBe(page.url());

      await homePage.header.clickOnBurgerMenu();
      await homePage.sideMenu.container.isVisible();
      await expect(homePage.sideMenu.links).areVisible();
    }
  );

  test('Verify click on logo functionality',
    {
      tag: '@smoke',
    },
    async ({ aboutPage, homePage }) => {
      await aboutPage.open();
      await aboutPage.header.clickOnLogo();

      const getUrl = await utils.getHrefFromLink(homePage.header.logo);
      expect(await homePage.getPageUrl()).toContain(getUrl);
    }
  );
});
