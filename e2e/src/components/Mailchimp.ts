import { Page } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';
import { step } from '../utils/step';

export default class Mailchimp extends BaseComponent {
  private readonly container = this.page.locator('#mc_embed_signup');
  public readonly title = this.container.getByRole('heading', {
    name: 'Get new posts and extra comments',
  });
  public readonly subTitle = this.container.getByText(
    'You\'ll get every new post'
  );
  public readonly inputField = this.container.getByRole('textbox', {
    name: 'Email address',
  });
  public readonly subscribeButton = this.container.getByRole('button', {
    name: 'Subscribe',
  });

  constructor(page: Page) {
    super(page);
  }

  @step()
  public async clickOnSubscribeButton(): Promise<void> {
    await this.subscribeButton.click();
  }
}
