import { test, expect } from '../src/fixtures/FixtureConfigs';
import { getSearchParamsFromUrl } from '../src/utils';

test.describe('Google Analytics', () => {
  test(
    'GA Event is triggered from the Home Page',
    {
      tag: '@regression',
    },
    async ({ homePage, page }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let gaEvent: any;
      await page.route('**/g/collect*', (route) => {
        gaEvent = route.request();
        route.continue();
      });

      await homePage.open();
      const dlParam = getSearchParamsFromUrl(gaEvent.url(), 'dl');
      const enParam = getSearchParamsFromUrl(gaEvent.url(), 'en');

      expect(dlParam).toEqual(await homePage.getPageUrl());
      expect(enParam).toEqual('page_view');
    }
  );
});