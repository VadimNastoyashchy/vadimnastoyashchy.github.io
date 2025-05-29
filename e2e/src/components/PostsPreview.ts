import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class PostsPreview extends BaseComponent {
  constructor(page: Page) {
    super(page);
  }

  get allPosts(): Locator {
    return this.page.locator('article.entry');
  }

  get allReadMoreLinks(): Locator {
    return this.page.locator('.read-more');
  }

  get searchResultPosts(): Locator {
    return this.page.locator('.search-content article.entry');
  }

  public getAllImages(): Locator {
    return this.page.locator('img.entry-image-thumbnail');
  }

  public async getLatestPost(): Promise<Locator> {
    return this.allPosts.nth(0);
  }

  public async title(): Promise<Locator> {
    return (await this.getLatestPost()).locator('h1.entry-title');
  }

  public async description(): Promise<Locator> {
    return (await this.getLatestPost()).locator('.entry-excerpt');
  }

  public async keywords(): Promise<Locator> {
    return (await this.getLatestPost()).locator('.entry-tags');
  }

  public async image(): Promise<Locator> {
    return (await this.getLatestPost()).locator('img.entry-image-thumbnail');
  }

  public async date(): Promise<Locator> {
    return (await this.getLatestPost()).locator('time.entry-time');
  }

  public async readTime(): Promise<Locator> {
    return (await this.getLatestPost()).locator(
      '.entry-meta ul li:nth-child(2)'
    );
  }

  private async getLastReadMore(): Promise<Locator> {
    return this.page.locator('.read-more a').nth(0);
  }

  public async getPageUrlFromReadMoreLink(): Promise<null | string> {
    const latestReadMore = await this.getLastReadMore();
    const href = await latestReadMore.getAttribute('href');
    return href;
  }

  public async clickOnReadMore(): Promise<void> {
    return (await this.getLastReadMore()).click();
  }

  public async getTitle(): Promise<string> {
    const getPreviewTitle = await this.title();
    const title = await getPreviewTitle.innerText();
    return title;
  }

  public async getDate(): Promise<string> {
    const getDatePreview = await this.date();
    const date = await getDatePreview.innerText();
    return date;
  }

  public async getReadTime(): Promise<string> {
    const getPreviewReadTime = await this.readTime();
    const readTime = await getPreviewReadTime.innerText();
    return readTime;
  }

  public async getAllPosts(): Promise<Locator[]> {
    return await this.allPosts.all();
  }

  public async getAllReadMoreLinks(): Promise<Locator[]> {
    return this.page.locator('.read-more a').all();
  }

  public async getSearchResults(searchText: string): Promise<Locator[]> {
    const searchResults = await this.page
      .locator(`.entry-title:has-text("${searchText}")`)
      .all();
    return searchResults;
  }
}
