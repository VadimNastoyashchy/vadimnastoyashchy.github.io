import { test, expect } from '../src/fixtures/FixtureConfigs';

test.describe('Tag archive', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test(
    'User can open each tag archive from recent posts and see correct content',
    {
      tag: '@regression',
    },
    async ({ homePage, tagArchivePage, page }) => {
      const tags = await homePage.postsPreview.getTags();

      for (const tag of tags) {
        const expectedTagName = await homePage.postsPreview.getTagName(tag);

        await test.step(`Test for ${expectedTagName} tag`, async () => {
          await homePage.postsPreview.clickOnTag(tag);

          await test.step(
            'Main section displays the page title, subtitle, and selected tag',
            async () => {
              await expect(tagArchivePage.title).toHaveText('Tag Archive');
              await expect(tagArchivePage.subTitle).toBeVisible();
              await expect(tagArchivePage.selectedTag).toBeVisible();

              const selectedTagName = await tagArchivePage.getTagName(tagArchivePage.selectedTag);

              expect(selectedTagName).toBe(expectedTagName);
            });

          await test.step(
            'Selected tag shows at least one related post with its publish date, ordered from most recent to oldest.',
            async () => {
              const tagRelatedPosts = await tagArchivePage.getTagRelatedPosts(tagArchivePage.selectedTag);
              const tagRelatedPostDates = await tagArchivePage.getTagRelatedPostDates(tagRelatedPosts);
              const dateTimestamps = await tagArchivePage.getDateTimestamps(tagRelatedPostDates);
              const numberOfTags = await tagRelatedPosts.count();

              expect(numberOfTags).toBeGreaterThan(0);
              expect(numberOfTags).toEqual(await tagRelatedPostDates.count());
              expect(dateTimestamps).toBeSortedDescending();
            });

          await test.step(
            '"You may also like" section shows only tags excluding selected tag',
            async () => {
              await expect(tagArchivePage.youMayAlsoLikeHeading).toBeVisible();

              const otherTags = await tagArchivePage.otherTags.all();

              for (const tag of otherTags) {
                const tagName = await tagArchivePage.getTagName(tag);

                await expect(tag).toBeVisible();
                expect(tagName).not.toBe(expectedTagName);
              }
            });

          await page.goBack();
        });
      };
    }
  );
});