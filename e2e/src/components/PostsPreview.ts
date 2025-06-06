import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class PostsPreview extends BaseComponent {
  public allPosts: Locator = this.page.locator('article.entry');
  public allReadMoreLinks: Locator = this.page.locator('.read-more');
  public images: Locator = this.page.locator('img.entry-image-thumbnail');
  public latestPost: Locator = this.allPosts.first();
  public title: Locator = this.latestPost.locator('h1.entry-title');
  public description: Locator = this.latestPost.locator('.entry-excerpt');
  public keywords: Locator = this.latestPost.locator('.entry-tags');
  public image: Locator = this.latestPost.locator('img.entry-image-thumbnail');
  public date: Locator = this.latestPost.locator('time.entry-time');
  public readTime: Locator = this.latestPost.locator(
    '.entry-meta ul li:nth-child(2)'
  );
  private readMore: Locator = this.latestPost.locator('.read-more a');

  constructor(page: Page) {
    super(page);
  }

  public async getPageUrlFromReadMoreLink(): Promise<null | string> {
    return (await this.readMore).getAttribute('href');
  }

  public async clickOnReadMore(): Promise<void> {
    return await this.readMore.click();
  }

  public async getTitleText(): Promise<string> {
    return await this.latestPost.locator('h1.entry-title').innerText();
  }

  public async getDateText(): Promise<string> {
    return await this.latestPost.locator('time.entry-time').innerText();
  }

  public async getReadTimeText(): Promise<string> {
    return await this.latestPost
      .locator('.entry-meta ul li:nth-child(2)')
      .innerText();
  }

  public async getAllPosts(): Promise<Locator[]> {
    return await this.allPosts.all();
  }

  public async getAllReadMoreLinks(): Promise<Locator[]> {
    return this.page.locator('.read-more a').all();
  }

  public async getSearchResults(searchText: string): Promise<Locator[]> {
    return await this.page
      .locator(`.entry-title:has-text("${searchText}")`)
      .all();
  }
}
