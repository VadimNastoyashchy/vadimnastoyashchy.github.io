import { test, expect } from '../src/fixtures/FixtureConfigs';
import { elementsAreVisible, getAllLinks, verifyLinksResponse } from '../src/utils/commonFunctions';

test.describe('Footer visibility', () => {
    test('Footer section is visible and contains working links', {
        tag: '@regression'
    }, async ({ homePage }) => {
        const copyrightText = '© 2025 Vadym Nastoiashchyi';

        await homePage.openAndVerify();

        await expect(homePage.footer.footerSection).toBeVisible();
        await elementsAreVisible(await homePage.footer.allFooterUrls());
        await expect(homePage.footer.copyright).toHaveText(copyrightText);

        const linksUrls = await getAllLinks(homePage.footer.footerSection, await homePage.getPageUrl());
        await verifyLinksResponse(linksUrls);
    });
});