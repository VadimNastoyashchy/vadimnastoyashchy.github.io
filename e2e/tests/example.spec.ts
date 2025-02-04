import { expect, test } from '../src/FixtureConfigs';

test.describe('Example test', () => {

    test('@smoke Checking the title on the About page', async ({ page, aboutPage }) => {
        await aboutPage.open();
        await expect(await page.url()).toContain(await aboutPage.getPageUrl());
        await expect(await aboutPage.getTitle()).toContain('Hi, i’m Vadym');
    });
});