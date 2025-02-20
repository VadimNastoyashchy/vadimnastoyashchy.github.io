import { Page, Locator } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class SideMenu extends BaseComponent {
    private readonly sidebarLocator = this.page.locator('#sidebar');
    private readonly allLinksLocator = this.page.locator('#sidebar a');

    constructor(page: Page) {
        super(page);
    }

    get sidebarContainer(): Locator {
        return this.sidebarLocator;
    }

    get allLinks(): Locator {
        return this.allLinksLocator;
    }

    async getLinkByText(linkText: string): Promise<Locator> {
        return this.allLinksLocator.filter({ hasText: linkText });
    }
}
