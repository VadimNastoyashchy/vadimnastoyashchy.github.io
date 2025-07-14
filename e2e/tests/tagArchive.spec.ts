import { test, expect } from '../src/fixtures/FixtureConfigs';

test.describe('Tag archive', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.open();
  });

  test(
    'Verify user can open each tag archive from a recent post and see the expected content',
    {
      tag: '@regression',
    },
    async ({ homePage, tagArchivePage, page }) => {
      const tagLinks = await homePage.postsPreview.getTagLinks();

      for (const tagLink of tagLinks) {
        const tagName = await tagLink.innerText();

        await test.step(`Test for ${tagName} tag`, async () => {
          await tagLink.click();
          await expect(tagArchivePage.title).toHaveText('Tag Archive');
          await expect(tagArchivePage.subTitle).toBeVisible();

          const currentTag = await tagArchivePage.currentTag;

          await expect(tagArchivePage.currentTagName).toContainText(tagName);
          await expect(await tagArchivePage.getTagRelatedPosts(currentTag)).areVisible();
          await expect(tagArchivePage.otherTagsSectionTitle).toBeVisible();
          await expect(tagArchivePage.otherTags).areVisible();
          await page.goBack();
        });
      };
    }
  );

  test(
    'Verify that the "You may also like" section displays only tags other than the current tag',
    {
      tag: '@regression',
    },
    async ({ homePage, tagArchivePage }) => {
      const firstTagLink = await homePage.postsPreview.getFirstTagLink();
      const currentTagName = await firstTagLink.innerText();

      await firstTagLink.click();

      const otherTagNames = await (await tagArchivePage.getOtherTagNames()).all();

      for (const name of otherTagNames) {
        await expect(name).not.toContainText(currentTagName);
        await expect(name).toBeVisible();
      }
  });

  test(
    'Verify each tag displays at least one related post with the publish date, listed in descending chronological order',
    {
      tag: '@regression',
    },
    async ({ homePage, tagArchivePage }) => {
      const firstTagLink = await homePage.postsPreview.getFirstTagLink();

      await firstTagLink.click();

      const tags = await tagArchivePage.getAllTags();

      for (const tag of tags) {
        const tagPosts = await tagArchivePage.getTagRelatedPosts(tag);
        const tagsCount = await tagPosts.count();
        const timeStamps: number[] = [];

        expect(tagsCount).toBeGreaterThan(0);

        for (let i = 0; i < tagsCount; i++) {
          const post = tagPosts.nth(i);
          const link = post.locator('a');
          const date = post.locator('i');

          await expect(link).toBeVisible();
          await expect(date).toBeVisible();

          const dateText = await date.innerText();
          const parsed = new Date(dateText);

          timeStamps.push(parsed.getTime());
        }

        for (let i = 0; i < timeStamps.length - 1; i++) {
          expect(timeStamps[i]).toBeGreaterThanOrEqual(timeStamps[i + 1]);
        }
      }
  });
});