import { test, expect } from '../src/fixtures/FixtureConfigs';
import { elementsAreVisible } from '../src/utils/commonFunctions';

test.describe('Header Functionality', () => {
    test('Verify header visibility and interactivity', {
        tag: '@regression'
    }, async ({ page, homePage }) => {
        const inputText = 'What is a Testing Piramide?';

        await homePage.openAndVerify();

        await homePage.header.burgerMenu.isVisible();
        await homePage.header.logo.isVisible();
        await homePage.header.search.isVisible();

        await homePage.header.clickOnSearch();
        await homePage.header.fillSearchInput(inputText);
        await expect(homePage.header.searchInput).toHaveValue(inputText);

        await homePage.header.clickOnLogo();
        expect(await homePage.getPageUrl()).toBe(page.url());

        await homePage.header.clickOnBurgerMenu();
        await homePage.sideMenu.sidebarContainer.isVisible();
        await elementsAreVisible(homePage.sideMenu.allLinks);
    });
});