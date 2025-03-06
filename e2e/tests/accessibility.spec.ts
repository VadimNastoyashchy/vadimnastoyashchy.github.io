import { test } from '../src/fixtures/FixtureConfigs';
import AccessibilityUtils from '../src/utils/accessibilityUtils';

test.describe('Accessibility Tests', { tag: ['@accessibility'] }, () => {
    test.describe('Home Page Accessibility', () => {

        test.beforeEach(async ({ homePage, page }) => {
            await AccessibilityUtils.skipForMobileDevices(page);
            await homePage.open();
        });

        test('Check header for accessibility violations', async ({ axeBuilder }) => {
            const accUtils = new AccessibilityUtils(axeBuilder);
            const headerSelectors = ['.navicon-button', '.site-title span', '.search-toggle'];
            await accUtils.checkAccessibility(headerSelectors);
        });

        test('Check footer for accessibility violations', async ({ axeBuilder }) => {
            const accUtils = new AccessibilityUtils(axeBuilder);
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

        test('Check navigation menu accessibility', async ({ homePage, axeBuilder }) => {
            await homePage.header.clickOnBurgerMenu();
            await homePage.sideMenu.container.isVisible();
            const accUtils = new AccessibilityUtils(axeBuilder);
            await accUtils.checkAccessibility(['#sidebar']);
        });
    });
});