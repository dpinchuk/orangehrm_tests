import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DashboardPage extends BasePage {
    private readonly _header: Locator;

    constructor(page: Page) {
        super(page);

        this._header = this.page.locator("h6").first();
    }

    get header(): Locator {
        return this._header;
    }

    async isOpened(): Promise<boolean> {
        return this.header.filter({ hasText: "Dashboard" }).first().isVisible();
    }
}
