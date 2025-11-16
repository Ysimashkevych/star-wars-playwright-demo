import { test, expect } from './fixtures/planets.fixture';

test('should search for a planet and display properties', async ({ starWarsPage }) => {
    await starWarsPage.searchAndWait('Tatooine');
    const properties = await starWarsPage.getPlanetProperties('Tatooine');

    expect(properties.population).toEqual('200000');
    expect(properties.climate).toEqual('arid');
    expect(properties.gravity).toEqual('1 standard');
});

test('should display not found for invalid planet', async ({ starWarsPage }) => {
    await starWarsPage.searchAndWait('InvalidPlanet123');
    const isNotFoundDisplayed = await starWarsPage.isNotFoundDisplayed();

    expect(isNotFoundDisplayed).toBeTruthy();
});

test('should search for planet using Enter key', async ({ starWarsPage }) => {
    await starWarsPage.searchFor('Alderaan');
    await starWarsPage.pressEnter();
    const resultsCount = await starWarsPage.getResultsCount()

    expect(resultsCount).toBeGreaterThan(0);
});

// This test fails as results from the previous search are still displayed after clearing the input
test('should clear search results when clearing input', async ({ starWarsPage }) => {
    await starWarsPage.searchAndWait('Dagobah');
    const initialCount = await starWarsPage.getResultsCount();

    expect(initialCount).toBeGreaterThan(0);
    
    await starWarsPage.clearSearch();
    await starWarsPage.clickSearch();
    const resultsCount = await starWarsPage.getResultsCount()
    
    expect(resultsCount).toBe(0);
});
