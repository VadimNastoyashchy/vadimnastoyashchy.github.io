import { Page, Locator, expect } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class Footer extends BaseComponent {
    private readonly footerLocator = this.page.locator('footer#footer');
    private readonly linkedInLocator = (this.page.locator('a[href*="linkedin.com"]')).last();
    private readonly gitHubLocator = (this.page.locator('a[href*="github.com"]')).last();
    private readonly copyrightLocator = (this.page.locator('.copyright'));

    constructor(page: Page) {
        super(page);
    }

    get footer(): Locator {
        return this.footerLocator;
    }

    get linkedInLink(): Locator {
        return this.linkedInLocator;
    }

    get gitHubLink(): Locator {
        return this.gitHubLocator;
    }

    get copyright(): Locator {
        return this.copyrightLocator;
    }

    public async clickLinkAndVerifyResponse(link: Locator, expectedUrlPart: string): Promise<void> {
        const [response] = await Promise.all([
            this.page.waitForResponse(response => response.url().includes(expectedUrlPart) && response.status() === 200),
            link.click()
        ]);
        expect(response.status()).toBe(200);
    }
}