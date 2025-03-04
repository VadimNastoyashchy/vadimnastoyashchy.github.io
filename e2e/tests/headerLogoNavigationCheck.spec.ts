import { test, expect } from '../src/fixtures/FixtureConfigs';
import { getHrefFromLink } from '../src/utils/commonFunctions';
test.describe('Header Logo Functionality', () => {
    test('Check header logo navigation functionality', {
        tag: '@smoke'
    }, async ({ aboutPage, homePage }) => {

        await aboutPage.openAndVerify();

        await aboutPage.header.clickOnLogo();

        const getUrl = await getHrefFromLink(homePage.header.logo);

        expect (await homePage.getPageUrl()).toContain(getUrl);

    });
});