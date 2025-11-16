import { test as base } from './base.fixture';

export const test = base.extend({
  starWarsPage: async ({ starWarsPage }, use) => {
    // ensure People category is selected before each test
    await starWarsPage.peopleRadio.setChecked(true);
    await use(starWarsPage);
  },
});

export { expect } from './base.fixture';
