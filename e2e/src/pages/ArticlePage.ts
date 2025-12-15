import { Page, Locator } from '@playwright/test';
import BasePage from '../base/BasePage';
import Mailchimp from '../components/Mailchimp';
import GiscusComments from '../components/GiscusComments';
import RelatedPosts from '../components/RelatedPosts';
import { step } from '../utils/step';

export default class ArticlePage extends BasePage {
  public mailchimp: Mailchimp;
  public giscusComments: GiscusComments;
  public relatedPosts: RelatedPosts;

  public title: Locator = this.page.locator('#page-title');
  public images: Locator = this.page.locator('img');

  constructor(page: Page) {
    super(page);
    this.mailchimp = new Mailchimp(page);
    this.giscusComments = new GiscusComments(page);
    this.relatedPosts = new RelatedPosts(page);
  }

@step()
  public async getTitleText(): Promise<string> {
    return await this.title.innerText();
  }

  @step()
  public async getDate(): Promise<string> {
    return await this.page.locator('.byline-item').nth(0).innerText();
  }

  @step()
  public async getReadTime(): Promise<string> {
    return this.page.locator('.byline-item').nth(1).innerText();
  }

  @step()
  public async titleIsVisible(): Promise<boolean> {
    return this.title.isVisible();
  }
}
