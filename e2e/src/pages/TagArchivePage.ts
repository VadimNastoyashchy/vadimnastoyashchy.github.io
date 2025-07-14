import { Page, Locator } from '@playwright/test';
import BasePage from '../base/BasePage';

export default class TagArchivePage extends BasePage {
  public title: Locator = this.page.locator('#page-title');
  public subTitle: Locator = this.page.getByText('Search through all of my posts by tag!');
  private readonly currentTagContainer: Locator = this.page.locator('#tags-list');
  public currentTag: Locator = this.currentTagContainer.locator('.highlighted-tag');
  public currentTagName: Locator = this.currentTag.locator('.post-list-heading');
  private readonly otherTagsContainer: Locator = this.page.locator('#you-may-also-like');
  public otherTagsSectionTitle: Locator = this.otherTagsContainer.getByText('You may also like:');
  public otherTags: Locator = this.otherTagsContainer.locator('.tag-list');

  constructor(page: Page) {
    super(page);
  }

  public async getTagRelatedPosts(tag: Locator): Promise<Locator> {
    return tag.locator('.post-list li');
  }

  public async getOtherTagNames(): Promise<Locator> {
    return this.otherTagsContainer.locator('.post-list-heading');
  }

  public async getAllTags(): Promise<Locator[]> {
    return await this.page.locator('.tag-list').all();
  }
}