import js from "@eslint/js";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
    prettier,
    {
        plugins: { prettier: prettierPlugin },
        rules: { "prettier/prettier": "error" },
    },

    js.configs.recommended,

    ...tseslint.configs.recommendedTypeChecked,

    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parserOptions: {
                project: true, // возьмёт tsconfig.json
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },

    // Playwright rules!!!
    {
        files: ["**/*.spec.ts", "**/*.test.ts", "**/tests/**/*.ts"],
        plugins: { playwright },
        rules: {
            ...playwright.configs["playwright-test"].rules,
        },
    },

    {
        rules: {
            "prettier/prettier": "off",
        },
    },
];
