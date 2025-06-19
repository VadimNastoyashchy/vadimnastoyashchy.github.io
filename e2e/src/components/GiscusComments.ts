import { FrameLocator, Locator, Page } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class GiscusComments extends BaseComponent {
  public container: Locator = this.page.locator('.giscus');
  public frame: FrameLocator = this.page.frameLocator('iframe.giscus-frame');
  public reactionsCount: Locator = this.frame.locator('.gsc-reactions-count');
  public commentsCount: Locator = this.frame.locator('.gsc-comments-count');
  public writeTabButton: Locator = this.frame.getByRole('button', { name: 'Write' });
  public previewTabButton: Locator = this.frame.getByRole('button', { name: 'Preview' });
  public commentInputBox: Locator = this.frame.getByPlaceholder('Sign in to comment');
  public signInButton: Locator = this.frame.getByText('Sign in with GitHub');

  constructor(page: Page) {
    super(page);
  }

  public async scrollIntoView(): Promise<void> {
    await this.container.scrollIntoViewIfNeeded();
  }
}