import { test, expect } from '../src/fixtures/FixtureConfigs';

test.describe('Giscus integration', () => {
  test(
    'Is loaded and displays elements',
    async ({ homePage, articlePage }) => {
      await homePage.open();
      await homePage.postsPreview.clickOnReadMore();
      await articlePage.giscusComments.scrollIntoView();

      await expect(articlePage.giscusComments.reactionsCount).toBeVisible();
      await expect(articlePage.giscusComments.commentsCount).toBeVisible();
      await expect(articlePage.giscusComments.writeTabButton).toBeVisible();
      await expect(articlePage.giscusComments.previewTabButton).toBeVisible();
      await expect(articlePage.giscusComments.commentInputBox).toBeVisible();
      await expect(articlePage.giscusComments.signInButton).toBeVisible();
    }
  );
});