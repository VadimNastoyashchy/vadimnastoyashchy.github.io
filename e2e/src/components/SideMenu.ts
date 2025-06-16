import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class SideMenu extends BaseComponent {
  public container: Locator = this.page.locator('#sidebar');
  public links: Locator = this.container.locator('a');
  public aboutLink: Locator = this.container.locator('.menu-item a[href="/about"]');
  public homeLink: Locator = this.container.locator('.menu-item a[href="/"]');

  constructor(page: Page) {
    super(page);
  }

  public async clickOnAboutLink(): Promise<void> {
    await this.aboutLink.click();
  }

  public async clickOnHomeLink(): Promise<void> {
    await this.homeLink.click();
  }

  async getLinkByText(linkText: string): Promise<Locator> {
    return this.links.filter({ hasText: linkText });
  }
}
