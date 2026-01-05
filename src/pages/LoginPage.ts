import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
    private readonly _page: Page;

    private readonly _usernameInput: Locator;
    private readonly _passwordInput: Locator;
    private readonly _loginButton: Locator;

    constructor(page: Page) {
        this._page = page;

        this._usernameInput = page.getByPlaceholder("Username");
        this._passwordInput = page.getByPlaceholder("Password");
        this._loginButton = page.getByRole("button", { name: "Login" });
    }

    get usernameInput(): Locator {
        return this._usernameInput;
    }

    get passwordInput(): Locator {
        return this._passwordInput;
    }

    get loginButton(): Locator {
        return this._loginButton;
    }

    public async login(username: string, password: string): Promise<void> {
        await expect(this.usernameInput, "Username input should be visible").toBeVisible();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
