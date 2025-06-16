import { test, expect } from '../src/fixtures/FixtureConfigs';

test.describe('Mailchimp integration', () => {
  test(
    'User can subscribe to the newsletter',
    {
      tag: '@regression',
    },
    async ({ homePage, articlePage, context, browserName }) => {
      test.skip(browserName === 'chromium', 'Still working on it');
      const mailchimpUrl =
        'https://github.us14.list-manage.com/subscribe/post?u=1279d7d1e948c1b7300f4931b&id=14954ef12e&f_id=002089e1f0';
      const newTabPromise = context.waitForEvent('page');

      await homePage.open();
      await homePage.postsPreview.clickOnReadMore();
      await expect(articlePage.mailchimp.title).toBeVisible();
      await expect(articlePage.mailchimp.subTitle).toBeVisible();
      await expect(articlePage.mailchimp.inputField).toBeVisible();
      await expect(articlePage.mailchimp.subscribeButton).toBeVisible();
      await articlePage.mailchimp.clickOnSubscribeButton();

      const newTab = await newTabPromise;
      await newTab.waitForEvent('domcontentloaded');
      await expect(newTab).toHaveURL(mailchimpUrl);
    }
  );
});
