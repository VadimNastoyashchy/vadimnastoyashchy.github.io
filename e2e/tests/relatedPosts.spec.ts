import { test, expect } from '../src/fixtures/FixtureConfigs';
import * as utils from '../src/utils';

test.describe('Related posts section', () => {
  test(
    'Is visible on the page and contains working links to the 3 most recent post',
    {
      tag: '@regression',
    },
    async ({ homePage, articlePage }) => {
      await homePage.open();

      const recentPostUrls = await utils.getLinks(
        homePage.postsPreview.allReadMoreLinks,
        await homePage.getPageUrl()
      );

      await homePage.postsPreview.clickOnReadMore();
      await expect(articlePage.relatedPosts.title).toBeVisible();
      await expect(articlePage.relatedPosts.postLinks).areVisible();
      await expect(articlePage.relatedPosts.postLinks).toHaveCount(3);

      const pageUrl = await articlePage.getPageUrl();
      const relatedPostUrls =  await utils.getLinks(
        articlePage.relatedPosts.postLinks,
        pageUrl
      );

      await expect(utils.areRelatedPostLinksCorrect(recentPostUrls, relatedPostUrls, pageUrl)).toBeTruthy();
      await utils.verifyLinks(relatedPostUrls);
    }
  );
});