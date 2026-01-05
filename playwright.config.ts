import { defineConfig } from "@playwright/test";
import { loadEnv } from "./src/config/env";

loadEnv();

export default defineConfig({
    testDir: "./specs",
    // Global test file pattern (applied to all projects, can be overridden per project)
    testMatch: /.*\.spec\.ts/,
    timeout: 3 * 60_000,
    expect: {
        timeout: 60_000
    },
    fullyParallel: true,
    retries: process.env.CI ? 1 : 0,
    workers: process.env.CI ? 1 : 1,
    reporter: [
        ["html" ],
        ["list"],
        [
            "junit",
            {
                // You can use one file for all projects or generate per-project file if needed
                outputFile:
                    process.env.PLAYWRIGHT_JUNIT_OUTPUT_NAME || "results.xml",
            },
        ],
    ],
    use: {
        launchOptions: {
            args: [
                "--disable-web-security",
                "--disable-blink-features=AutomationControlled",
                "--deny-permission-prompts",
                "--disable-notifications",
                "--disable-gpu-sandbox",
                "--disable-popup-blocking",
                "--disable-infobars",
                "--disable-features=SuppressDifferentOriginSubframeJSDialogs",
                "--no-default-browser-check",
                "--disable-features=beforeunload",
            ],
            ignoreDefaultArgs: [
                "--disable-component-extensions-with-background-pages",
            ],
        },
        baseURL: process.env.BASE_URL || "https://opensource-demo.orangehrmlive.com/",
        headless: !!process.env.CI,
        screenshot: "only-on-failure",
        video: "off",
        trace: "on-first-retry"
    }
});
