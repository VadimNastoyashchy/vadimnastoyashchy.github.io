import { Page, Locator } from '@playwright/test';
import BasePage from '../base/BasePage';

export default class TagArchivePage extends BasePage {
  private readonly youMayAlsoLikeContainer: Locator = this.page.locator('#you-may-also-like');

  public title: Locator = this.page.locator('#page-title');
  public subTitle: Locator = this.page.getByText('Search through all of my posts by tag!');
  public selectedTag: Locator = this.page.locator('#tags-list .post-list-heading');
  public otherTags: Locator = this.youMayAlsoLikeContainer.locator('.post-list-heading');
  public youMayAlsoLikeHeading: Locator = this.youMayAlsoLikeContainer.getByText('You may also like:');

  constructor(page: Page) {
    super(page);
  }

  public async getTagRelatedPosts(tag: Locator): Promise<Locator> {
    return tag.locator('xpath=following-sibling::ul[1]/li');
  }

  public async getTagRelatedPostDates(posts: Locator): Promise<Locator> {
    return posts.locator('i');
  }

  public async getDateTimestamps(dates: Locator): Promise<number[]> {
    const dateTexts = await dates.allTextContents();

    return dateTexts.map(date => new Date(date).getTime());
  }

  public async getTagName(tag: Locator): Promise<string> {
    const tagText = await tag.innerText();
    const match = tagText.match(/#(.*?):/);

    return match?.[1] ?? '';
  }
}