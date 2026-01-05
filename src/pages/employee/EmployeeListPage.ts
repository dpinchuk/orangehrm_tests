import { expect, Locator, Page } from "@playwright/test";

export class EmployeeListPage {
    private readonly _page: Page;

    private readonly _title: Locator;
    private readonly _pageHeader: Locator;
    private readonly _addButton: Locator;

    constructor(page: Page) {
        this._page = page;

        this._title = page.getByRole("heading", { name: "Employee Information" });
        this._pageHeader = page.locator(".oxd-topbar-header-title");
        this._addButton = page.getByRole("button", { name: " Add " });
    }

    get title(): Locator {
        return this._title;
    }

    get pageHeader(): Locator {
        return this._pageHeader;
    }

    get addButton(): Locator {
        return this._addButton;
    }

    public async expectPageLoaded(): Promise<void> {
        await expect(this._page, "Employee List page URL should contain /pim/viewEmployeeList").toHaveURL(/\/pim\/viewEmployeeList/);
        await expect(this.pageHeader, "Employee List header should be visible").toBeVisible();
        await expect(this.addButton, "\"Add\" button should be visible").toBeVisible();
    }

    public async clickAdd(): Promise<void> {
        await this.addButton.click();
    }
}
