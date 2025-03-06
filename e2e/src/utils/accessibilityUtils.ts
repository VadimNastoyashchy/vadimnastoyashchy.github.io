import { Page } from '@playwright/test'
import { test, expect } from '../fixtures/FixtureConfigs'
import { AxeBuilder } from '@axe-core/playwright'

class AccessibilityUtils {
  private axeBuilder: AxeBuilder

  constructor(axeBuilder: AxeBuilder) {
    this.axeBuilder = axeBuilder
  }

  async checkAccessibility(selectors: string[]): Promise<void> {
    for (const selector of selectors) {
      await this.axeBuilder.include(selector)
    }
    const results = await this.axeBuilder.analyze()
    expect(results.violations).toEqual([])
  }

  static async skipForMobileDevices(page: Page): Promise<void> {
    const userAgent = await page.evaluate(() => navigator.userAgent)
    if (userAgent.includes('iPhone')) {
      test.skip()
    }
  }
}

export default AccessibilityUtils
