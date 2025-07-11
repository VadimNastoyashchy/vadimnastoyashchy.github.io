import { test, expect } from '../src/fixtures/FixtureConfigs';

test.describe('Giscus integration', () => {
  test.beforeEach(async ({ homePage, articlePage }) => {
      await homePage.open();
      await homePage.postsPreview.clickOnReadMore();
      await articlePage.giscusComments.scrollIntoView();
  });
  test(
    'Is loaded and displays elements',
    {
      tag: '@regression',
    },
    async ({ articlePage }) => {
      await expect(articlePage.giscusComments.reactionsCount).toBeVisible();
      await expect(articlePage.giscusComments.commentsCount).toBeVisible();
      await expect(articlePage.giscusComments.reactionsButton).toBeVisible();
      await expect(articlePage.giscusComments.writeTabButton).toBeVisible();
      await expect(articlePage.giscusComments.previewTabButton).toBeVisible();
      await expect(articlePage.giscusComments.commentInputBox).toBeVisible();
      await expect(articlePage.giscusComments.signInButton).toBeVisible();
    }
  );
  test(
    'Signed out user should not be able to leave reactions and comments',
    {
      tag: '@regression',
    },
    async ({ articlePage }) => {
      await articlePage.giscusComments.clickOnReactionsButton();

      await expect(articlePage.giscusComments.reactionsPopover).toBeVisible();
      await expect(articlePage.giscusComments.reactionsPopoverMessage).toHaveText('Sign in to add your reaction.');
      await expect(articlePage.giscusComments.reactionsEmojiButtons).areDisabled();
      await expect(articlePage.giscusComments.commentInputBox).toBeDisabled();
      await expect(articlePage.giscusComments.commentInputBox).toHaveAttribute('placeholder', 'Sign in to comment');
    }
  );
});