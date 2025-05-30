import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class ArticleContent extends BaseComponent {
  constructor(page: Page) {
    super(page);
  }

  get title(): Locator {
    return this.page.locator('#page-title');
  }

  public async getTitleText(): Promise<string> {
    return await this.title.innerText();
  }

  public async titleIsVisible(): Promise<boolean> {
    return this.title.isVisible();
  }

  public async getDate(): Promise<string> {
    return await this.page.locator('.byline-item').nth(0).innerText();
  }

  public async getReadTime(): Promise<string> {
    return this.page.locator('.byline-item').nth(1).innerText();
  }

  public async getAllImages(): Promise<Locator> {
    return this.page.locator('img');
  }
}
