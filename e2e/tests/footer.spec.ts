import { test, expect } from '../src/fixtures/FixtureConfigs';
import * as utils from '../src/utils';

test.describe('Footer', () => {
  test('Section is visible and contains working links',
    {
      tag: '@regression',
    },
    async ({ homePage }) => {
      const copyrightText = '© 2025 Vadym Nastoiashchyi';

      await homePage.open();

      await expect(homePage.footer.container).toBeVisible();
      await expect(homePage.footer.urls).areVisible();
      await expect(homePage.footer.copyright).toHaveText(copyrightText);

      const links = await utils.getLinks(
        homePage.footer.container,
        await homePage.getPageUrl()
      );
      await utils.verifyLinks(links);
    }
  );
});
