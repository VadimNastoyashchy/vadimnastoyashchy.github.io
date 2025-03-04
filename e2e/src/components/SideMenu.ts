import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class SideMenu extends BaseComponent {
    private readonly sidebarLocator = this.page.locator('#sidebar');
    private readonly allLinksLocator = this.page.locator('#sidebar a');
    private readonly aboutLinkLocator = this.page.locator(
        '.menu-item a[href="/about"]',
    );
    private readonly homeLinkLocator = this.page.locator(
        '.menu-item a[href="/"]',
    );


    constructor(page: Page) {
        super(page);
    }

    get sidebarContainer(): Locator {
        return this.sidebarLocator;
    }

    get allLinks(): Locator {
        return this.allLinksLocator;
    }

    get aboutLink(): Locator {
        return this.aboutLinkLocator;
    }

    public async clickOnAboutLink(): Promise<void> {
        await this.aboutLinkLocator.click();
    }

    public async clickOnHomeLink(): Promise<void> {
        await this.homeLinkLocator.click();
    }

    async getLinkByText(linkText: string): Promise<Locator> {
        return this.allLinksLocator.filter({ hasText: linkText });
    }
}
