import { expect, Locator, Page } from "@playwright/test";

export class LeftNavMenu {
    private readonly _page: Page;

    private readonly _pimMenuItem: Locator;

    constructor(page: Page) {
        this._page = page;

        this._pimMenuItem = page
            .locator("aside")
            .getByRole("link", { name: "PIM" })
            .first();
    }

    get pimMenuItem(): Locator {
        return this._pimMenuItem;
    }

    public async clickPim(): Promise<void> {
        await expect(this.pimMenuItem, "PIM menu item should be visible").toBeVisible();
        await this.pimMenuItem.click();
    }
}
