import { Locator, expect, APIRequestContext, request } from '@playwright/test';

export async function getHrefFromLink(
  locator: Locator
): Promise<null | string> {
  return await locator.getAttribute('href');
}

export async function getLinks(
  locator: Locator,
  PageURL: string
): Promise<Set<string>> {
  const links = await locator.getByRole('link').all();
  const hrefs = await Promise.all(links.map((link) => getHrefFromLink(link)));
  const validHrefs = hrefs.reduce((links, link) => {
    expect.soft(link).toBeTruthy();
    if (link && !link?.startsWith('mailto:') && !link?.startsWith('#')) {
      links.add(new URL(link, PageURL).href);
    }
    return links;
  }, new Set<string>());
  return validHrefs;
}

export async function verifyLinks(urls: Set<string>): Promise<void> {
  const apiRequestContext: APIRequestContext = await request.newContext();
  for (const url of urls) {
    try {
      const response = await apiRequestContext.get(url);
      const isSuccessful = response.ok() || response.status() === 999;
      expect
        .soft(isSuccessful, `URL ${url} returned status ${response.status()}`)
        .toBeTruthy();
    } catch (error) {
      expect.soft(false, `Failed to fetch URL ${url}: ${error}`).toBeTruthy();
    }
  }
}

export function getSearchParamsFromUrl(url: string, param: string): string | null {
  return new URL(url).searchParams.get(param);
}

export function areRelatedPostLinksCorrect(
  recentPostUrls: Set<string>,
  relatedPostUrls: Set<string>,
  currentPostUrl: string
): boolean {
  const recentPosts = [...recentPostUrls];
  const relatedPosts = [...relatedPostUrls];

  let relatedIndex = 0;

  for (let i = 0; relatedIndex < 3; i++) {
    const url = recentPosts[i];

    if (url === currentPostUrl) {
      continue;
    }

    if (url !== relatedPosts[relatedIndex]) {
      return false;
    }

    relatedIndex++;
  }

  return true;
}