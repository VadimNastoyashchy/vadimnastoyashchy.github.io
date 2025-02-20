import { test as base } from '@playwright/test';
import AboutPage from '../pages/AboutPage';
import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/ArticlePage';

type MyFixtures = {
    aboutPage: AboutPage;
    homePage: HomePage;
    articlePage: ArticlePage;
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
});

export { expect } from '@playwright/test';
