import { Page, Locator } from '@playwright/test';

export class StarWarsSearchPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly results: Locator;
    readonly characterResults: Locator;
    readonly planetResults: Locator;
    readonly notFoundMessage: Locator;
    readonly peopleRadio: Locator;
    readonly planetsRadio: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByRole('searchbox', { name: 'Query' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.peopleRadio = page.getByRole('radio', { name: 'People' });
        this.planetsRadio = page.getByRole('radio', { name: 'Planets' });
        this.results = page.locator('.card');
        this.planetResults = page.locator('[data-testid="planet-result"]');
        this.notFoundMessage = page.getByText('Not found.');
    }

    private async getValueFromCardRowByLabel(cardHeader: string, label: string): Promise<string | null> {
        const card = this.page.locator(`.card:has-text("${cardHeader}")`);
        const row = card.locator(`.row:has-text("${label}")`);
        const text = await row.locator('.col-sm-10').textContent();
        if (text) {
            return text.trim();
        }
        return null;
    }

    async navigate() {
        await this.page.goto('/');
    }

    async selectPeopleCategory() {
        await this.planetsRadio.setChecked(true);
    }

    async selectPlanetsCategory() {
        await this.planetsRadio.setChecked(true);
    }

    async searchFor(query: string) {
        await this.searchInput.fill(query);
    }

    async clickSearch() {
        await this.searchButton.click();
    }

    async waitForLoadingToFinish() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.page.getByText('Loading...').waitFor({ state: 'detached', timeout: 5000 })
    }

    async searchAndWait(query: string) {
        await this.searchFor(query);
        await this.clickSearch();
        await this.waitForLoadingToFinish();
    }

    async pressEnter() {
        await this.searchInput.press('Enter');
        await this.page.waitForLoadState('networkidle'); // TODO: consider replacing with more specific wait
    }

    async clearSearch() {
        await this.searchInput.clear();
    }

    async getCharacterProperties(characterName: string) {
        return {
            gender: await this.getValueFromCardRowByLabel(characterName, 'Gender:'),
            birthYear: await this.getValueFromCardRowByLabel(characterName, 'Birth Year:'),
            eyeColor: await this.getValueFromCardRowByLabel(characterName, 'Eye color:'),
            skinColor: await this.getValueFromCardRowByLabel(characterName, 'Skin color:'),
        };
    }

    async getPlanetProperties(planetName: string) {
        return {
            population: await this.getValueFromCardRowByLabel(planetName, 'Population:'),
            climate: await this.getValueFromCardRowByLabel(planetName, 'Climate:'),
            gravity: await this.getValueFromCardRowByLabel(planetName, 'Gravity:'),
        };
    }

    async isNotFoundDisplayed() {
        return await this.notFoundMessage.isVisible();
    }

    async getResultsCount() {
        return await this.results.count();
    }
}