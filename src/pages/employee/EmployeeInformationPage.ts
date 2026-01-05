import { expect, Locator, Page } from "@playwright/test";

export class EmployeeInformationPage {
    private readonly _page: Page;

    private readonly _employeeNameInput: Locator;
    private readonly _employeeIdInput: Locator;
    private readonly _employmentStatusDropdown: Locator;
    private readonly _includeDropdown: Locator;
    private readonly _supervisorNameInput: Locator;
    private readonly _jobTitleDropdown: Locator;
    private readonly _subUnitDropdown: Locator;

    private readonly _resetButton: Locator;
    private readonly _searchButton: Locator;

    private readonly _addButton: Locator;

    private readonly _recordsFoundText: Locator;
    private readonly _table: Locator;

    constructor(page: Page) {
        this._page = page;

        this._employeeNameInput = this.getInputByLabel("Employee Name");
        this._employeeIdInput = this.getPlainInputByLabel("Employee Id");
        this._employmentStatusDropdown = this.getDropdownByLabel("Employment Status");
        this._includeDropdown = this.getDropdownByLabel("Include");
        this._supervisorNameInput = this.getInputByLabel("Supervisor Name");
        this._jobTitleDropdown = this.getDropdownByLabel("Job Title");
        this._subUnitDropdown = this.getDropdownByLabel("Sub Unit");
        this._resetButton = page.getByRole("button", { name: "Reset" });
        this._searchButton = page.getByRole("button", { name: "Search" });
        this._addButton = page.getByRole("button", { name: "Add" });
        this._recordsFoundText = page.locator(".oxd-text--span", { hasText: "Records Found" });
        this._table = page.locator(".oxd-table.orangehrm-employee-list");
    }

    get employeeNameInput(): Locator {
        return this._employeeNameInput;
    }

    get employeeIdInput(): Locator {
        return this._employeeIdInput;
    }

    get employmentStatusDropdown(): Locator {
        return this._employmentStatusDropdown;
    }

    get includeDropdown(): Locator {
        return this._includeDropdown;
    }

    get supervisorNameInput(): Locator {
        return this._supervisorNameInput;
    }

    get jobTitleDropdown(): Locator {
        return this._jobTitleDropdown;
    }

    get subUnitDropdown(): Locator {
        return this._subUnitDropdown;
    }

    get resetButton(): Locator {
        return this._resetButton;
    }

    get searchButton(): Locator {
        return this._searchButton;
    }

    get addButton(): Locator {
        return this._addButton;
    }

    get recordsFoundText(): Locator {
        return this._recordsFoundText;
    }

    get table(): Locator {
        return this._table;
    }

    private getInputByLabel(labelText: string): Locator {
        return this._page
            .locator(".oxd-input-group")
            .filter({ has: this._page.locator(".oxd-label", { hasText: labelText }) })
            .locator("input")
            .first();
    }

    private getPlainInputByLabel(labelText: string): Locator {
        return this._page
            .locator(".oxd-input-group")
            .filter({ has: this._page.locator(".oxd-label", { hasText: labelText }) })
            .locator("input.oxd-input")
            .first();
    }

    private getDropdownByLabel(labelText: string): Locator {
        return this._page
            .locator(".oxd-input-group")
            .filter({ has: this._page.locator(".oxd-label", { hasText: labelText }) })
            .locator(".oxd-select-text")
            .first();
    }

    private dropdownOption(optionText: string): Locator {
        return this._page.getByRole("option", { name: optionText }).first();
    }

    public async setEmployeeName(value: string): Promise<void> {
        await this.employeeNameInput.fill(value);
        await this.employeeNameInput.press("Enter");
    }

    public async setEmployeeId(value: string): Promise<void> {
        await this.employeeIdInput.fill(value);
    }

    public async selectEmploymentStatus(optionText: string): Promise<void> {
        await this.employmentStatusDropdown.click();
        await this.dropdownOption(optionText).click();
    }

    public async selectInclude(optionText: string): Promise<void> {
        await this.includeDropdown.click();
        await this.dropdownOption(optionText).click();
    }

    public async setSupervisorName(value: string): Promise<void> {
        await this.supervisorNameInput.fill(value);
        await this.supervisorNameInput.press("Enter");
    }

    public async selectJobTitle(optionText: string): Promise<void> {
        await this.jobTitleDropdown.click();
        await this.dropdownOption(optionText).click();
    }

    public async selectSubUnit(optionText: string): Promise<void> {
        await this.subUnitDropdown.click();
        await this.dropdownOption(optionText).click();
    }

    public async clickSearch(): Promise<void> {
        await this.searchButton.click();
        await expect(this.table).toBeVisible();
    }

    public async clickReset(): Promise<void> {
        await this.resetButton.click();
    }

    public async getRecordsFound(): Promise<number> {
        const text = (await this.recordsFoundText.textContent())?.trim() ?? "";
        const match = text.match(/\((\d+)\)\s*Records Found/i);
        return match ? Number(match[1]) : 0;
    }
}
