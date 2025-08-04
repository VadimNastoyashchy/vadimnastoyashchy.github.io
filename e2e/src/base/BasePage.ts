import { Page, expect } from '@playwright/test';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { step } from '../utils/step';

export default abstract class BasePage {
  protected readonly page: Page;
  protected readonly PAGE_URL: string;

  public sideMenu: SideMenu;
  public header: Header;
  public footer: Footer;

  // eslint-disable-next-line @typescript-eslint/typedef
  constructor(page: Page, pageUrl = '') {
    this.page = page;
    this.PAGE_URL = pageUrl;
    this.sideMenu = new SideMenu(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  @step()
  public async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  @step()
  public async open(): Promise<void> {
    await this.page.goto(this.PAGE_URL);
    expect(this.page.url()).toContain(this.PAGE_URL);
  }
}
