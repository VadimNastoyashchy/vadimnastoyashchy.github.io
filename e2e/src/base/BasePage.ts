import { Locator, Page, expect } from '@playwright/test'
import SideMenu from '../components/SideMenu'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default abstract class BasePage {
  protected readonly PAGE_NAME: string
  protected readonly PAGE_URL: string
  protected readonly page: Page

  public sideMenu: SideMenu
  public header: Header
  public footer: Footer

  // eslint-disable-next-line @typescript-eslint/typedef
  constructor(page: Page, pageName: string, pageUrl = '') {
    this.page = page
    this.PAGE_NAME = pageName
    this.PAGE_URL = pageUrl
    this.sideMenu = new SideMenu(page)
    this.header = new Header(page)
    this.footer = new Footer(page)
  }

  public getPage(): Page {
    return this.page
  }

  public async getPageUrl(): Promise<string> {
    return await this.page.url()
  }

  public async open(): Promise<void> {
    await this.page.goto(this.PAGE_URL)
    expect(this.page.url()).toContain(this.PAGE_URL)
  }
}
