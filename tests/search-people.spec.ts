import { test, expect } from './fixtures/people.fixture';

test('should search for a character and display properties', async ({ starWarsPage }) => {
    await starWarsPage.searchAndWait('Luke');
    const properties = await starWarsPage.getCharacterProperties('Luke Skywalker');

    expect(properties.gender).toEqual('male');
    expect(properties.birthYear).toEqual('19BBY');
    expect(properties.eyeColor).toEqual('blue');
    expect(properties.skinColor).toEqual('fair');
});

test('should display not found for invalid character', async ({ starWarsPage }) => {
    await starWarsPage.searchAndWait('InvalidCharacter123');
    const isNotFoundDisplayed = await starWarsPage.isNotFoundDisplayed();

    expect(isNotFoundDisplayed).toBeTruthy();
});

test('should search using Enter key', async ({ starWarsPage }) => {
    await starWarsPage.searchFor('Leia');
    await starWarsPage.pressEnter();
    const resultsCount = await starWarsPage.getResultsCount();
    
    expect(resultsCount).toBeGreaterThan(0);
});