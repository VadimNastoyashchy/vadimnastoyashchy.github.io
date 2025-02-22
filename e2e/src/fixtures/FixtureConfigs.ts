import { test as base } from '@playwright/test';
import AboutPage from '../pages/AboutPage';
import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/ArticlePage';
import AxeBuilder from '@axe-core/playwright';

type MyFixtures = {
    aboutPage: AboutPage;
    homePage: HomePage;
    articlePage: ArticlePage;
    axeBuilder: AxeBuilder;
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
});

export { expect } from '@playwright/test';
