import { test, expect } from '../src/FixtureConfigs';

test.describe('Footer visibility', () => {
    test('Footer section is visible and contains working links', {
        tag: '@regression'
    }, async ({ page, homePage }) => {
        const github = 'github.com';
        const linkedin = 'linkedin.com';
        const copyrightText = '© 2025 Vadym Nastoiashchyi';

        await homePage.open();
        expect(page.url()).toContain(await homePage.getPageUrl());

        await expect(homePage.footer.footer).toBeVisible();
        
        await expect(homePage.footer.linkedInLink).toBeVisible();
        await expect(homePage.footer.gitHubLink).toBeVisible();
        await expect(homePage.footer.copyright).toHaveText(copyrightText);

        await homePage.footer.clickLinkAndVerifyResponse(homePage.footer.gitHubLink, github);
        await homePage.open(); 
        await homePage.footer.clickLinkAndVerifyResponse(homePage.footer.linkedInLink, linkedin);
    });
});