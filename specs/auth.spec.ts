import { test, expect } from "@playwright/test";
import { requireEnv } from "../src/config/env";
import { DashboardPage } from "../src/pages/DashboardPage";
import { login } from "../src/services/auth";

test("User can log in with selected role", async ({ page }) => {
    const username = requireEnv("ORANGE_USERNAME");
    const password = requireEnv("ORANGE_PASSWORD");

    await login(page, username, password);

    const dashboard = new DashboardPage(page);
    await expect(dashboard.header.filter({ hasText: "Dashboard" })).toBeVisible();
});
