import { test, expect } from '../src/fixtures/FixtureConfigs';
import { elementsAreVisible, getAllLinks, verifyLinksResponse } from '../src/utils/commonFunctions';

test.describe('Footer visibility', () => {
    test('Footer section is visible and contains working links', {
        tag: '@regression'
    }, async ({ homePage }) => {
        const copyrightText = '© 2025 Vadym Nastoiashchyi';

        await homePage.openAndVerify();

        await expect(homePage.footer.footerSection).toBeVisible();

        const footerLinks = await homePage.footer.allFooterUrls();
        await elementsAreVisible(footerLinks);

        await expect(homePage.footer.copyright).toHaveText(copyrightText);
        
        const pageUrl = await homePage.getPageUrl();
        const linksUrls = await getAllLinks(homePage.footer.footerSection, pageUrl);
        await verifyLinksResponse(linksUrls);
    });
});