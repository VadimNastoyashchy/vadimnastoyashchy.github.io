import { Locator, expect, APIRequestContext, request } from '@playwright/test';

export async function elementsAreVisible(elements: Locator): Promise<void> {
    for (let i = 0; i < (await elements.count()); i++) {
        const element = elements.nth(i);
        await expect(element).toBeVisible();
    }
}

export async function getAllLinks(allReadMoreLinks: Locator, PageURL: string): Promise<Set<string>> {
    const links = allReadMoreLinks.getByRole('link');
    const allLinks = await links.all();
    const allhrefs = await Promise.all(
        allLinks.map((link) => link.getAttribute('href'))
    );
    const allValidHrefs = allhrefs.reduce((links, link) => {
        expect.soft(link).toBeTruthy();
        if (link) {
            links.add(new URL(link, PageURL).href);
        }
        return links;
    }, new Set<string>());
    return allValidHrefs;
}

export async function verifyLinksResponse(linksUrls: Set<string>): Promise<void> {
    const apiRequestContext: APIRequestContext = await request.newContext();
    for(const url of linksUrls) {
        const response = await apiRequestContext.get(url);
        const isSuccessful = (response.status() === 200 || response.status() === 999);
        expect.soft(isSuccessful).toBeTruthy();
    }
}