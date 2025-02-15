import { Page } from '@playwright/test';
import BaseComponent from '../base/BaseComponent';

export default class Header extends BaseComponent {

    private readonly burgerLocator = this.page.locator('.navicon-button');

    constructor(page: Page) {
        super(page);
    }

    public async clickOnBurgerMenu(): Promise<void> {
        return this.burgerLocator.click();
    }
}