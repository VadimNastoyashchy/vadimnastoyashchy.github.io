/* eslint-disable playwright/no-standalone-expect */
import { test as base, expect as baseExpect, Locator } from '@playwright/test';
import AboutPage from '../pages/AboutPage';
import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/ArticlePage';
import AxeBuilder from '@axe-core/playwright';
import TagArchivePage from '../pages/TagArchivePage';

type MyFixtures = {
  aboutPage: AboutPage;
  homePage: HomePage;
  articlePage: ArticlePage;
  axeBuilder: AxeBuilder;
  tagArchivePage: TagArchivePage;
};

export const test = base.extend<MyFixtures>({
  aboutPage: async ({ page }, use) => {
    const aboutPage = new AboutPage(page);
    await use(aboutPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  articlePage: async ({ page }, use) => {
    const articlePage = new ArticlePage(page);
    await use(articlePage);
  },
  axeBuilder: async ({ page }, use) => {
    await use(new AxeBuilder({ page }));
  },
  tagArchivePage: async ({ page }, use) => {
    const tagArchivePage = new TagArchivePage(page);
    await use(tagArchivePage);
  },
});

export const expect = baseExpect.extend({
  async areVisible(locator: Locator) {
    const assertionName = 'areVisible';
    let pass: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let matcherResult: any;
    try {
      for (let i = 0; i < (await locator.count()); i++) {
        const element = locator.nth(i);
        await baseExpect(element).toBeVisible();
      }
      pass = true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      matcherResult = e.matcherResult;
      pass = false;
    }

    const message = pass ? (): string => '' : (): string => '';

    return {
      message,
      pass,
      name: assertionName,
      actual: matcherResult?.actual,
    };
  },

  async areDisabled(locator: Locator) {
    const assertionName: string = 'areDisabled';
    const pass: boolean = true;

    const count: number = await locator.count();

    if (count === 0) {
      return {
        message: (): string =>
          `expect(locator).areDisabled()\n\n` +
          `Expected at least one element, but locator matched zero.`,
        pass: false,
        name: assertionName,
      };
    }

    for (let i = 0; i < count; i++) {
      const element: Locator = locator.nth(i);
      const disabled: boolean = await element.isDisabled();

      if (!disabled) {
        const html: string = await element.evaluate(el => el.outerHTML);

        return {
          message: (): string =>
          `expect(locator).areDisabled()\n\n` +
          `Expected all ${count} elements to be disabled,\n` +
          `but found an enabled element:\n\n${html}`,
          pass: false,
          name: assertionName,
        };
      }
    }

    return {
      message: (): string => '',
      pass,
      name: assertionName,
    };
  }
});
