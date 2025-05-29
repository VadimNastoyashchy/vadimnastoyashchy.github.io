import { Page } from '@playwright/test';
import BasePage from '../base/BasePage';
import AboutContent from '../components/AboutContent';

export default class AboutPage extends BasePage {
  public content: AboutContent;

  constructor(page: Page) {
    super(page);
    this.content = new AboutContent(page);
  }
}
