import { Page, Locator, expect } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class Footer extends BaseComponent {
    private readonly footerLocator = this.page.locator('footer#footer');
    private readonly copyrightLocator = (this.page.locator('.copyright'));

    constructor(page: Page) {
        super(page);
    }

    static FooterConstants = {
        COPYRIGHT_TEXT: '© 2025 Vadym Nastoiashchyi',
    };

    get footerSection(): Locator {
        return this.footerLocator;
    }

    public async allFooterUrls(): Promise<Locator> {
        return this.page.locator('footer#footer a');
    }

    public async elementsAreVisible(elements: Locator): Promise<void> {
        for (let i = 0; i < (await elements.count()); i++) {
            const element = elements.nth(i);
            await expect(element).toBeVisible();
        }
    }

    get copyright(): Locator {
        return this.footerLocator.locator(this.copyrightLocator);
    }

    async getAllLinks(footerSection: Locator): Promise<Set<string>> {
        const links = footerSection.getByRole('link');
        const allLinks = await links.all();
        const allhrefs = await Promise.all(
            allLinks.map((link) => link.getAttribute('href'))
        );
        const allValidHrefs = allhrefs.reduce((links, link) => {
            expect.soft(link).toBeTruthy();
            if (link) {
                links.add(new URL(link, this.page.url()).href);
            }
            return links;
        }, new Set<string>());
        return allValidHrefs;
    }

    public async verifyLinksResponse(linksUrls: Set<string>): Promise<void> {
        for(const url of linksUrls) {
            const response = await this.page.request.get(url);
            const isSuccessful = (response.status() === 200 || response.status() === 999);
            expect.soft(isSuccessful).toBeTruthy();
        }
    }
}