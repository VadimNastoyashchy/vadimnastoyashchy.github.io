import { test, expect } from '../src/fixtures/FixtureConfigs';
import * as utils from '../src/utils';

test.describe('Post', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });
  test(
    'Verify user can open and read latest post',
    {
      tag: ['@regression', '@smoke'],
    },
    async ({ homePage, articlePage }) => {
      expect(await homePage.postsPreview.title).toBeVisible();
      expect(await homePage.postsPreview.description).toBeVisible();
      expect(await homePage.postsPreview.keywords).toBeVisible();
      expect(await homePage.postsPreview.image).toBeVisible();
      expect(await homePage.postsPreview.date).toBeVisible();
      expect(await homePage.postsPreview.readTime).toBeVisible();

      const previewTitle = await homePage.postsPreview.getTitleText();
      const previewDate = await homePage.postsPreview.getDateText();
      const previewReadTime = await homePage.postsPreview.getReadTimeText();
      const readMoreLink =
        await homePage.postsPreview.getPageUrlFromReadMoreLink();

      await homePage.postsPreview.clickOnReadMore();

      expect(await articlePage.getPageUrl()).toContain(readMoreLink);
      expect(await articlePage.getTitleText()).toEqual(previewTitle);
      expect(await articlePage.getDate()).toEqual(previewDate);
      expect(await articlePage.getReadTime()).toEqual(previewReadTime);
      await expect(await articlePage.images).areVisible();
    }
  );

  test(
    'Ensure the home page displays preview posts with correctly functioning links',
    {
      tag: ['@regression', '@smoke'],
    },
    async ({ homePage }) => {
      const amountOfPosts = 15;

      await expect(homePage.postsPreview.allPosts).areVisible();
      expect(await homePage.postsPreview.getAllPosts()).toHaveLength(
        amountOfPosts
      );
      expect(await homePage.postsPreview.getAllReadMoreLinks()).toHaveLength(
        amountOfPosts
      );

      const linksUrls = await utils.getLinks(
        homePage.postsPreview.allReadMoreLinks,
        await homePage.getPageUrl()
      );
      await utils.verifyLinks(linksUrls);
    }
  );
});
