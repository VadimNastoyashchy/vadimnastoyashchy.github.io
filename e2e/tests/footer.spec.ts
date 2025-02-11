import Footer from '../src/components/Footer';
import { test, expect } from '../src/FixtureConfigs';

test.describe('Footer visibility', () => {
    test('Footer section is visible and contains working links', {
        tag: '@regression'
    }, async ({ page, homePage }) => {
        await homePage.open();
        expect(page.url()).toContain(await homePage.getPageUrl());

        await expect(homePage.footer.footerSection).toBeVisible();
        await homePage.footer.elementsAreVisible(await homePage.footer.allFooterUrls());
        await expect(homePage.footer.copyright).toHaveText(Footer.FooterConstants.COPYRIGHT_TEXT);

        const linksUrls = await homePage.footer.getAllLinks(homePage.footer.footerSection);
        await homePage.footer.verifyLinksResponse(linksUrls);
    });
});