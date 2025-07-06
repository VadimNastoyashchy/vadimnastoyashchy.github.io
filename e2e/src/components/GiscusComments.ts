import { FrameLocator, Locator, Page } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class GiscusComments extends BaseComponent {
  private readonly container: Locator = this.page.locator('.giscus');
  public frame: FrameLocator = this.page.frameLocator('iframe.giscus-frame');
  public reactionsCount: Locator = this.frame.locator('.gsc-reactions-count');
  public reactionsButton: Locator = this.frame.locator('summary[aria-label="Add reactions"]');
  public reactionsPopover: Locator = this.frame.locator('div.gsc-reactions-popover');
  public reactionsPopoverMessage: Locator = this.reactionsPopover.locator('p.m-2');
  public reactionsEmojiButtons: Locator = this.reactionsPopover.locator('button');
  public commentsCount: Locator = this.frame.locator('.gsc-comments-count');
  public writeTabButton: Locator = this.frame.getByRole('button', { name: 'Write' });
  public previewTabButton: Locator = this.frame.getByRole('button', { name: 'Preview' });
  public commentInputBox: Locator = this.frame.locator('textarea');
  public signInButton: Locator = this.frame.getByText('Sign in with GitHub');

  constructor(page: Page) {
    super(page);
  }

  public async scrollIntoView(): Promise<void> {
    await this.container.scrollIntoViewIfNeeded();
  }

  public async clickOnReactionsButton(): Promise<void> {
    await this.reactionsButton.click();
  }
}