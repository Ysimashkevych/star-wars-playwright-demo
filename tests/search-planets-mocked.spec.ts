import { test, expect } from './fixtures/planets-mocked.fixture';

test.describe('Search Planets - Mocked API Responses', () => {
    test('should display Tatooine with correct mocked properties', async ({ starWarsPage }) => {
    const planetName = 'Tatooine';
    await starWarsPage.searchAndWait(planetName);
    const properties = await starWarsPage.getPlanetProperties(planetName);
    
    expect(properties.population).toEqual('2');
    expect(properties.climate).toEqual('arid edited');
    expect(properties.gravity).toEqual('2 standard');
    });
});
