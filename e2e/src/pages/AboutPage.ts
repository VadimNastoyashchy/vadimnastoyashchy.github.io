import { Page } from '@playwright/test';
import BasePage from '../base/BasePage';

export default class AboutPage extends BasePage {
    private readonly aboutTitle = this.page.locator('#hi-im-vadym');

    constructor(page: Page) {
        super(page, 'About Page', 'about.html');
    }

    public async getTitle(): Promise<string> {
        return await this.aboutTitle.innerText();
    }
}
