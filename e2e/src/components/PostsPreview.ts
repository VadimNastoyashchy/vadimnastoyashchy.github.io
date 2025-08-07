import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';
import { step } from '../utils/step';

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

  @step()
  public async getPageUrlFromReadMoreLink(): Promise<null | string> {
    return (await this.readMore).getAttribute('href');
  }

  @step()
  public async clickOnReadMore(): Promise<void> {
    return await this.readMore.click();
  }

  @step()
  public async getTitleText(): Promise<string> {
    return await this.latestPost.locator('h1.entry-title').innerText();
  }

  @step()
  public async getDateText(): Promise<string> {
    return await this.latestPost.locator('time.entry-time').innerText();
  }

  @step()
  public async getReadTimeText(): Promise<string> {
    return await this.latestPost
      .locator('.entry-meta ul li:nth-child(2)')
      .innerText();
  }

  @step()
  public async getAllPosts(): Promise<Locator[]> {
    return await this.allPosts.all();
  }

  @step()
  public async getAllReadMoreLinks(): Promise<Locator[]> {
    return this.page.locator('.read-more a').all();
  }

  @step()
  public async getTags(): Promise<Locator[]> {
    return await this.keywords.locator('[rel="tag"]').all();
  }

  @step()
  public async getTagName(tag: Locator): Promise<string> {
    return await tag.innerText();
  }

  @step()
  public async clickOnTag(tag: Locator): Promise<void> {
    await tag.click();
  }

  @step()
  public async getAllDates(): Promise<Locator[]> {
    return this.allPosts.locator('time.entry-time').all();
  }

  @step()
  public async getDateTimestamps(dates: Locator[]): Promise<number[]> {
    return await Promise.all(
      dates.map(async (date) => {
        const dateTimeAttribute = await date.getAttribute('datetime');
        return dateTimeAttribute ? new Date(dateTimeAttribute).getTime() : NaN;
      })
    );
  }
}
