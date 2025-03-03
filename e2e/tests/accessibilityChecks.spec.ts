import { test } from '../src/fixtures/FixtureConfigs';
import AccessibilityUtils from '../src/utils/accessibilityUtils';

test.describe('Accessibility Tests', { tag: ['@accessibility'] }, () => {
    test.describe('Home Page Accessibility', () => {
        let accUtils:any;

        test.beforeEach(async ({ homePage, page, axeBuilder }) => {
            await AccessibilityUtils.skipForMobileDevices(page);
            await homePage.openAndVerify();
            accUtils = new AccessibilityUtils(axeBuilder);
        });

        test('Check header for accessibility violations', async ({}) => {
            const headerSelectors = ['.navicon-button', '.site-title span', '.search-toggle'];
            await accUtils.checkAccessibility(headerSelectors);
        });

        test('Check footer for accessibility violations', async ({}) => {
            await accUtils.checkAccessibility(['footer#footer']);
        });

        test('Ensure no critical accessibility issues on public-facing pages', async ({ axeBuilder }) => {
            const results = await axeBuilder.analyze();
            test.expect(results.violations.filter(v => v.impact === 'critical')).toHaveLength(0);
        });

        test('Check for WCAG A or AA level violations', async ({ axeBuilder }) => {
            const results = await axeBuilder.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
            test.expect(results.violations).toEqual([]);
        });

        test('Check navigation menu accessibility', async ({ homePage }) => {
            await homePage.header.clickOnBurgerMenu();
            await homePage.sideMenu.sidebarContainer.isVisible();
            await accUtils.checkAccessibility(['#sidebar']);
        });
    });
});