import { test as base } from './base.fixture';
import { MOCKED_PLANETS_RESPONSE } from '../mocks/planets.responses';

export const test = base.extend({
    starWarsPage: async ({ starWarsPage, page }, use) => {
        // Intercept the API response with mock data
        await page.route('**/api/planets/?name=Tatooine', (route) => {
            route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(MOCKED_PLANETS_RESPONSE)
            });
        });
        // ensure Planets category is selected before each test
        await starWarsPage.planetsRadio.setChecked(true);
        await use(starWarsPage);
    },
});

export { expect } from './base.fixture';
