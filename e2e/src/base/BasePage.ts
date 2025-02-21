import { Page, expect } from '@playwright/test';

export default abstract class BasePage {
    protected readonly PAGE_NAME: string;
    protected readonly PAGE_URL: string;
    protected readonly page: Page;

    // eslint-disable-next-line @typescript-eslint/typedef
    constructor(page: Page, pageName: string, pageUrl = '') {
        this.page = page;
        this.PAGE_NAME = pageName;
        this.PAGE_URL = pageUrl;
    }

    public getPage(): Page {
        return this.page;
    }

    public async open(): Promise<void> {
        await this.page.goto(this.PAGE_URL);
    }

    public async getPageUrl(): Promise<string> {
        return await this.page.url();
    }

    public async openAndVerify(): Promise<void> {
        await this.open();
        expect(this.page.url()).toContain(this.PAGE_URL);
    }
}
