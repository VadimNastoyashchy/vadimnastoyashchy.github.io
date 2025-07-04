import { Locator, Page } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class RelatedPosts extends BaseComponent {
  private readonly container: Locator = this.page.locator('#related');
  public title: Locator = this.container.getByText('You may also like');
  public postLinks: Locator = this.container.locator('.posts li');

  constructor(page: Page) {
    super(page);
  }
}