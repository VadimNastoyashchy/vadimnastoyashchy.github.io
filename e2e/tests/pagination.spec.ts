import { test, expect } from '../src/fixtures/FixtureConfigs'
import * as utils from '../src/utils'

test.describe('Pagination', () => {
  test(
    'Verify pagination is navigate correctly',
    {
      tag: '@regression',
    },
    async ({ page, homePage }) => {
      await homePage.open()

      await expect(homePage.postsPreview.allPosts).areVisible()
      await homePage.pagination.paginationSection.isVisible()
      await homePage.pagination.olderButton.isVisible()

      const olderButtonUrl = await utils.getHrefFromLink(
        homePage.pagination.olderButton
      )
      await homePage.pagination.clickOnOlderButton()
      await expect(homePage.postsPreview.allPosts).areVisible()
      expect(olderButtonUrl).not.toBe(
        await utils.getHrefFromLink(homePage.pagination.newerButton)
      )

      await homePage.pagination.newerButton.isVisible()
      await homePage.pagination.clickOnNewerButton()
      await expect(homePage.postsPreview.allPosts).areVisible()
      expect(page.url()).toContain(await homePage.getPageUrl())
    }
  )
})
