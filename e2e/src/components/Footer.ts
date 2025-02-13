import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class Footer extends BaseComponent {
    private readonly footerLocator = this.page.locator('footer#footer');
    private readonly copyrightLocator = (this.page.locator('.copyright'));

    constructor(page: Page) {
        super(page);
    }

    get footerSection(): Locator {
        return this.footerLocator;
    }

    public async allFooterUrls(): Promise<Locator> {
        return this.page.locator('footer#footer a');
    }

    get copyright(): Locator {
        return this.footerLocator.locator(this.copyrightLocator);
    }
}