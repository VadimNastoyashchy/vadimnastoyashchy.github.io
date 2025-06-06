import { Page, Locator } from '@playwright/test';
import BasePage from '../base/BasePage';

export default class ArticlePage extends BasePage {
  public title: Locator = this.page.locator('#page-title');
  public images: Locator = this.page.locator('img');

  constructor(page: Page) {
    super(page);
  }

  public async getTitleText(): Promise<string> {
    return await this.title.innerText();
  }

  public async getDate(): Promise<string> {
    return await this.page.locator('.byline-item').nth(0).innerText();
  }

  public async getReadTime(): Promise<string> {
    return this.page.locator('.byline-item').nth(1).innerText();
  }

  public async titleIsVisible(): Promise<boolean> {
    return this.title.isVisible();
  }
}
