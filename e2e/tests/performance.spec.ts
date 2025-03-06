import { test, expect } from '../src/fixtures/FixtureConfigs';
import {
  measurePerformance,
  getLastPerformanceMetric,
} from '../src/utils/measurePerformance';
import { Page } from 'playwright';

test.describe('Website Performance Tests', () => {
  test.beforeEach(async ({ homePage}) => {
    await homePage.open();
  });
  async function assertPerformanceStep(
    pageFunction: () => Promise<void>,
    stepName: string,
    expectedTime: number,
    page: Page
  ): Promise<void> {
    await measurePerformance(pageFunction, stepName, page);
    const lastMetric = getLastPerformanceMetric();
    expect(lastMetric.timeElapsed).toBeLessThan(expectedTime);
  }

  test('Complete Page Performance',
    { tag: '@performance' },
    async ({ homePage }) => {
      await assertPerformanceStep(
        async () => {
          await homePage.open();
        },
        'HomePageLoad',
        1500,
        homePage.getPage()
      );
    }
  );

  test('Check image load times are within acceptable limits',
    { tag: '@performance' },
    async ({ homePage }) => {
      await assertPerformanceStep(
        async () => {
          const images = homePage.postsPreview.getAllImages();
          const count = await images.count();
          for (let i = 0; i < count; i++) {
            await expect(images.nth(i)).toBeVisible();
          }
        },
        'ImageLoad',
        1500,
        homePage.getPage()
      );
    }
  );

  test('Verify rapid page switches using pagination',
    { tag: '@performance' },
    async ({ homePage }) => {
      await assertPerformanceStep(
        async () => {
          await homePage.pagination.clickOnOlderButton();
          await homePage.pagination.clickOnNewerButton();
        },
        'PaginationNavigation',
        1500,
        homePage.getPage()
      );
    }
  );

  test('Measure time to open and display a full post',
    { tag: '@performance' },
    async ({ homePage, articlePage }) => {
      await assertPerformanceStep(
        async () => {
          await homePage.postsPreview.clickOnReadMore();
          const titleVisible =
            await articlePage.articleContent.titleIsVisible();
          expect(titleVisible).toBe(true);
        },
        'SinglePostLoad',
        1500,
        homePage.getPage()
      );
    }
  );

  test('Main Page Response after Sidebar Navigation',
    { tag: '@performance' },
    async ({ homePage }) => {
      await assertPerformanceStep(
        async () => {
          await homePage.getPage().waitForLoadState('networkidle');
          await homePage.header.clickOnBurgerMenu();
          const aboutLinkLocator =
            await homePage.sideMenu.getLinkByText('About');
          await aboutLinkLocator.click();
          await expect(homePage.getPage()).toHaveURL(/about/);
        },
        'SidebarNavigation',
        2700,
        homePage.getPage()
      );
    }
  );
});
