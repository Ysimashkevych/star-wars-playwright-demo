import { test as base } from './base.fixture';

export const test = base.extend({
  starWarsPage: async ({ starWarsPage }, use) => {
    // ensure Planets category is selected before each test
    await starWarsPage.planetsRadio.setChecked(true);
    await use(starWarsPage);
  },
});

export { expect } from './base.fixture';
