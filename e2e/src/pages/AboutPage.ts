import { Page } from '@playwright/test';
import BasePage from '../base/BasePage';
import AboutContent from '../components/AboutContent';

export default class AboutPage extends BasePage {
    public aboutContent: AboutContent;

    constructor(page: Page) {
        super(page, 'About Page', 'about');
        this.aboutContent = new AboutContent(page);
    }
}
