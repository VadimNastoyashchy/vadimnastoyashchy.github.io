import { test as base } from '@playwright/test';
import AboutPage from './pages/AboutPage';

type MyFixtures = {
    aboutPage: AboutPage;
};

export const test = base.extend<MyFixtures>({
    aboutPage: async ({ page }, use) => {
        const aboutPage = new AboutPage(page);
        await use(aboutPage);
    },
});
export { expect } from '@playwright/test';
