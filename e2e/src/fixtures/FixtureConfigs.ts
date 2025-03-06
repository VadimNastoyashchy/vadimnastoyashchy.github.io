import { test as base, expect as baseExpect, Locator } from '@playwright/test'
import AboutPage from '../pages/AboutPage'
import HomePage from '../pages/HomePage'
import ArticlePage from '../pages/ArticlePage'
import AxeBuilder from '@axe-core/playwright'

type MyFixtures = {
  aboutPage: AboutPage
  homePage: HomePage
  articlePage: ArticlePage
  axeBuilder: AxeBuilder
}

export const test = base.extend<MyFixtures>({
  aboutPage: async ({ page }, use) => {
    const aboutPage = new AboutPage(page)
    await use(aboutPage)
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await use(homePage)
  },
  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page)
    await use(articlePage)
  },
  axeBuilder: async ({ page }, use) => {
    await use(new AxeBuilder({ page }))
  },
})

export const expect = baseExpect.extend({
  async areVisible(locator: Locator, options?: { timeout?: number }) {
    const assertionName = 'areVisible'
    let pass: boolean
    let matcherResult: any
    try {
      for (let i = 0; i < (await locator.count()); i++) {
        const element = locator.nth(i)
        await baseExpect(element).toBeVisible()
      }
      pass = true
    } catch (e: any) {
      matcherResult = e.matcherResult
      pass = false
    }

    const message = pass ? () => '' : () => ''

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual,
    }
  },
})
