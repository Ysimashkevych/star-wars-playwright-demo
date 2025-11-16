import { test as base } from '@playwright/test';
import { StarWarsSearchPage } from '../pages/star-wars-search.page';

export type TestFixtures = {
  starWarsPage: StarWarsSearchPage;
};

export const test = base.extend<TestFixtures>({
  starWarsPage: async ({ page }, use) => {
    const starWarsPage = new StarWarsSearchPage(page);
    await starWarsPage.navigate();
    await page.waitForLoadState('networkidle');
    await use(starWarsPage);
  },
});

export { expect } from '@playwright/test';
