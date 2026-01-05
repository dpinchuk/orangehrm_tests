import type { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

export async function login(page: Page, username: string, password: string): Promise<void> {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.fillUsername(username);
    await loginPage.fillPassword(password);
    await loginPage.clickLogin();
}
