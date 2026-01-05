import { expect, Locator, Page } from "@playwright/test";

export type LoginDetailsStatus = "Enabled" | "Disabled";

export interface AddEmployeeData {
    firstName: string;
    middleName?: string;
    lastName: string;
    employeeId?: string;
    createLoginDetails?: boolean;
    username?: string;
    status?: LoginDetailsStatus;
    password?: string;
    confirmPassword?: string;
}

export class AddEmployeePage {
    private readonly _page: Page;

    private readonly _title: Locator;

    private readonly _firstNameInput: Locator;
    private readonly _middleNameInput: Locator;
    private readonly _lastNameInput: Locator;
    private readonly _employeeIdInput: Locator;

    private readonly _createLoginDetailsToggleInput: Locator;
    private readonly _createLoginDetailsToggleUi: Locator;
    private readonly _usernameInput: Locator;
    private readonly _enabledRadio: Locator;
    private readonly _disabledRadio: Locator;
    private readonly _passwordInput: Locator;
    private readonly _confirmPasswordInput: Locator;

    private readonly _cancelButton: Locator;
    private readonly _saveButton: Locator;

    constructor(page: Page) {
        this._page = page;

        this._title = page.getByRole("heading", { name: "Add Employee" });

        this._firstNameInput = page.locator("input[name=\"firstName\"]");
        this._middleNameInput = page.locator("input[name=\"middleName\"]");
        this._lastNameInput = page.locator("input[name=\"lastName\"]");
        this._employeeIdInput = page
            .locator(".oxd-input-group")
            .filter({ has: page.locator(".oxd-label", { hasText: "Employee Id" }) })
            .locator("input.oxd-input")
            .first();

        this._createLoginDetailsToggleInput = page.locator(".user-form-header input[type=\"checkbox\"]").first();
        this._createLoginDetailsToggleUi = page.locator(".user-form-header .oxd-switch-input").first();

        this._usernameInput = page
            .locator(".oxd-input-group")
            .filter({ has: page.locator(".oxd-label", { hasText: "Username" }) })
            .locator("input.oxd-input")
            .first();

        this._enabledRadio = page
            .locator(".oxd-radio-wrapper")
            .filter({ hasText: "Enabled" })
            .locator("input[type=\"radio\"]")
            .first();

        this._disabledRadio = page
            .locator(".oxd-radio-wrapper")
            .filter({ hasText: "Disabled" })
            .locator("input[type=\"radio\"]")
            .first();

        this._passwordInput = page
            .locator(".oxd-input-group")
            .filter({ has: page.locator(".oxd-label", { hasText: "Password" }) })
            .locator("input[type=\"password\"]")
            .first();

        this._confirmPasswordInput = page
            .locator(".oxd-input-group")
            .filter({ has: page.locator(".oxd-label", { hasText: "Confirm Password" }) })
            .locator("input[type=\"password\"]")
            .first();

        this._cancelButton = page.getByRole("button", { name: "Cancel" });
        this._saveButton = page.getByRole("button", { name: "Save" });
    }

    get title(): Locator {
        return this._title;
    }

    get firstNameInput(): Locator {
        return this._firstNameInput;
    }

    get middleNameInput(): Locator {
        return this._middleNameInput;
    }

    get lastNameInput(): Locator {
        return this._lastNameInput;
    }

    get employeeIdInput(): Locator {
        return this._employeeIdInput;
    }

    get createLoginDetailsToggleInput(): Locator {
        return this._createLoginDetailsToggleInput;
    }

    get createLoginDetailsToggleUi(): Locator {
        return this._createLoginDetailsToggleUi;
    }

    get usernameInput(): Locator {
        return this._usernameInput;
    }

    get enabledRadio(): Locator {
        return this._enabledRadio;
    }

    get disabledRadio(): Locator {
        return this._disabledRadio;
    }

    get passwordInput(): Locator {
        return this._passwordInput;
    }

    get confirmPasswordInput(): Locator {
        return this._confirmPasswordInput;
    }

    get cancelButton(): Locator {
        return this._cancelButton;
    }

    get saveButton(): Locator {
        return this._saveButton;
    }

    public async expectPageLoaded(): Promise<void> {
        await expect(this.title, "\"Add Employee\" title should be visible").toBeVisible();
        await expect(this.firstNameInput, "First Name input should be visible").toBeVisible();
        await expect(this.lastNameInput, "Last Name input should be visible").toBeVisible();
        await expect(this.saveButton, "Save button should be visible").toBeVisible();
    }

    public async setFirstName(value: string): Promise<void> {
        await this.firstNameInput.fill(value);
    }

    public async setMiddleName(value: string): Promise<void> {
        await this.middleNameInput.fill(value);
    }

    public async setLastName(value: string): Promise<void> {
        await this.lastNameInput.fill(value);
    }

    public async setEmployeeId(value: string): Promise<void> {
        await this.employeeIdInput.clear();
        await this.employeeIdInput.fill(value);
    }

    public async toggleCreateLoginDetails(enable: boolean): Promise<void> {
        await expect(this.createLoginDetailsToggleInput).toBeAttached();

        const isChecked = await this.createLoginDetailsToggleInput.isChecked();
        if (isChecked === enable) {
            return;
        }

        await this.createLoginDetailsToggleUi.click();

        await expect(this.createLoginDetailsToggleInput).toHaveJSProperty("checked", enable);
    }

    public async setUsername(value: string): Promise<void> {
        await expect(this.usernameInput, "Username input should be visible").toBeVisible();
        await this.usernameInput.fill(value);
    }

    public async setStatus(value: LoginDetailsStatus): Promise<void> {
        if (value === "Enabled") {
            await this.enabledRadio.check();
            return;
        }
        await this.disabledRadio.check();
    }

    public async setPassword(value: string): Promise<void> {
        await expect(this.passwordInput, "Password input should be visible").toBeVisible();
        await this.passwordInput.fill(value);
    }

    public async setConfirmPassword(value: string): Promise<void> {
        await expect(this.confirmPasswordInput, "Confirm Password input should be visible").toBeVisible();
        await this.confirmPasswordInput.fill(value);
    }

    public async clickSave(): Promise<void> {
        await this.saveButton.click();
    }

    public async fillEmployee(data: AddEmployeeData): Promise<void> {
        await this.setFirstName(data.firstName);

        if (data.middleName) {
            await this.setMiddleName(data.middleName);
        }

        await this.setLastName(data.lastName);

        if (data.employeeId) {
            await this.setEmployeeId(data.employeeId);
        }
    }

    public async fillLoginDetails(enable: boolean, data?: Omit<AddEmployeeData, "createLoginDetails">): Promise<void> {
        await this.toggleCreateLoginDetails(enable);

        if (!enable) {
            return;
        }

        if (!data) {
            return;
        }

        if (data.username) {
            await this.setUsername(data.username);
        }

        if (data.status) {
            await this.setStatus(data.status);
        }

        if (data.password) {
            await this.setPassword(data.password);
        }

        if (data.confirmPassword) {
            await this.setConfirmPassword(data.confirmPassword);
        }
    }

    public async fillAndSave(data: AddEmployeeData, isLoginDetail: boolean = true): Promise<void> {
        await this.expectPageLoaded();
        await this.fillEmployee(data);
        await this.fillLoginDetails(isLoginDetail, data);
        await this.clickSave();
    }
}
