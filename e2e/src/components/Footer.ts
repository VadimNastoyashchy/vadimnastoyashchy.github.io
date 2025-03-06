import { Page, Locator } from '@playwright/test'
import BaseComponent from '../base/BaseComponent'

export default class Footer extends BaseComponent {
  constructor(page: Page) {
    super(page)
  }

  get container(): Locator {
    return this.page.locator('footer#footer')
  }

  get urls(): Locator {
    return this.page.locator('footer#footer a')
  }

  get copyright(): Locator {
    return this.container.locator('.copyright')
  }
}
