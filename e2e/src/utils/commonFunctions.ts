import { Locator, expect, APIRequestContext, request } from '@playwright/test'

export async function getLinks(
  allReadMoreLinks: Locator,
  PageURL: string
): Promise<Set<string>> {
  const links = allReadMoreLinks.getByRole('link')
  const allLinks = await links.all()
  const allhrefs = await Promise.all(
    allLinks.map((link) => link.getAttribute('href'))
  )
  const allValidHrefs = allhrefs.reduce((links, link) => {
    expect.soft(link).toBeTruthy()
    if (link && !link?.startsWith('mailto:') && !link?.startsWith('#')) {
      links.add(new URL(link, PageURL).href)
    }
    return links
  }, new Set<string>())
  return allValidHrefs
}

export async function verifyLinks(linksUrls: Set<string>): Promise<void> {
  const apiRequestContext: APIRequestContext = await request.newContext()
  for (const url of linksUrls) {
    try {
      const response = await apiRequestContext.get(url)
      const isSuccessful = response.ok() || response.status() === 999
      expect
        .soft(isSuccessful, `URL ${url} returned status ${response.status()}`)
        .toBeTruthy()
    } catch (error) {
      expect.soft(false, `Failed to fetch URL ${url}: ${error}`).toBeTruthy()
    }
  }
}

export async function getHrefFromLink(
  locator: Locator
): Promise<null | string> {
  const href = await locator.getAttribute('href')
  return href
}
