# OrangeHRM Playwright (TypeScript)

Minimal Playwright + TypeScript project with Page Object Model.
Credentials are taken from environment variables (`process.env`).

---

## Requirements
- Node.js 18+ (recommended: 20+)

---

## Setup (Local)
1) Install dependencies:
```bash
npm install
```
2) Install Playwright browsers:
```bash
npm run install:browsers
```
3) Create ``.env``:

``Copy .env.example to .env``

``Update values if needed``

Example ``.env``:
````
BASE_URL=https://opensource-demo.orangehrmlive.com/
ORANGE_USERNAME=Admin
ORANGE_PASSWORD=admin123
````
## Run tests (Local)
1) Run all tests:
````
npm test
````
2) Run in headed mode:
````
npm run test:headed
````
3) Run UI mode:
````
npm run test:ui
````
4) Open HTML report:
````
npm run report
````
## What actually runs
````
npm test → npx playwright test

npm run test:headed → npx playwright test --headed

npm run test:ui → npx playwright test --ui
````
## Environment variables
1) Used variables:
````
BASE_URL (default: https://opensource-demo.orangehrmlive.com/)

ORANGE_USERNAME

ORANGE_PASSWORD
````
2) Local development:
###### .env is loaded by dotenv (see src/config/env.ts)

3) CI/CD:
###### - Do NOT commit .env
###### - Provide variables in your CI system (GitHub/GitLab/Jenkins/etc.)
## CI/CD Guide
#### The project reads credentials from environment variables:
````
BASE_URL

ORANGE_USERNAME

ORANGE_PASSWORD
````
#### CI (usually set automatically by CI)

#### Below are simple examples for GitHub Actions and GitLab CI.
## Option A: GitHub Actions
1) Create file: .github/workflows/tests.yml
````
name: e2e

on:
  push:
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    env:
      CI: true
      BASE_URL: https://opensource-demo.orangehrmlive.com/
      ORANGE_USERNAME: ${{ secrets.ORANGE_USERNAME }}
      ORANGE_PASSWORD: ${{ secrets.ORANGE_PASSWORD }}

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run tests
        run: npx playwright test

      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report
````
2) Secrets
###### Store credentials here:

###### Repository → Settings → Secrets and variables → Actions
````
ORANGE_USERNAME

ORANGE_PASSWORD
````
## Option B: GitLab CI
1) Create file: .gitlab-ci.yml
````
image: mcr.microsoft.com/playwright:v1.54.0-jammy

stages:
  - test

e2e:
  stage: test
  variables:
    CI: "true"
    BASE_URL: "https://opensource-demo.orangehrmlive.com/"
  script:
    - npm ci
    - npx playwright test
  artifacts:
    when: always
    paths:
      - playwright-report/
      - test-results/
    expire_in: 7 days
````
2) CI/CD Variables
###### Store credentials here:

###### Project → Settings → CI/CD → Variables
````
ORANGE_USERNAME

ORANGE_PASSWORD
````
## Notes
Locally: run via npm scripts (Windows-friendly).

CI/CD: variables come from secrets/variables, .env is not required.

Reports are generated in playwright-report/ and test-results/.