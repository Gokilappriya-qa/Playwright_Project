# Playwright TypeScript Automation Framework

A scalable Playwright automation framework built using **TypeScript**, following Page Object Model (POM) and hybrid framework practices. This project demonstrates reusable automation components, test fixtures, custom test execution, and HTML reporting.

## 🚀 Project Overview

This repository contains a Playwright-based UI automation framework designed to automate end-to-end web application workflows.

The framework uses a modular structure to separate page objects, test scenarios, reusable components, fixtures, test data, utilities, and reporting.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Playwright | Browser automation |
| TypeScript | Programming language |
| Node.js | Runtime environment |
| Playwright Test | Test execution |
| TSX | TypeScript execution |
| Chrome | Target browser |
| HTML Reporter | Test reporting |
| Custom Extent Reporter | Custom HTML reporting |
| Git | Version control |

## ✨ Framework Features

- Playwright automation using TypeScript
- Page Object Model (POM)
- Hybrid framework structure
- Reusable page classes and components
- Custom test fixtures
- Modular test organization
- Custom test runner
- Chrome browser execution
- Parallel test execution
- Playwright HTML reporting
- Custom Extent HTML reporting
- Trace collection on test failures
- Headed execution
- Debug mode
- Playwright UI mode
- Separate test data and utility directories

## 📁 Project Structure

```text
Playwright_Project/
│
├── .vscode/
│   └── mcp.json
│
├── specs/
│
├── tests/
│   │
│   ├── components/
│   │   ├── cartflow.spec.ts
│   │   ├── loginflow.spec.ts
│   │   ├── shoppingnavigation.spec.ts
│   │   └── shoppingshop.spec.ts
│   │
│   ├── fixtures/
│   │   └── test-fixtures.ts
│   │
│   ├── pages/
│   │   ├── base.page.ts
│   │   ├── cart.page.ts
│   │   ├── home.page.ts
│   │   ├── login.page.ts
│   │   └── shopping.page.ts
│   │
│   ├── reporters/
│   │   └── extent-html-reporter.ts
│   │
│   ├── test-data/
│   │
│   └── utils/
│
├── .gitignore
├── package.json
├── playwright.config.ts
├── runner.ts
└── README.md
```

## 🏗️ Framework Architecture

### 1. Components
Contains test specifications for different application workflows.

- `cartflow.spec.ts` – Cart workflow testing
- `loginflow.spec.ts` – Login workflow testing
- `shoppingnavigation.spec.ts` – Shopping navigation testing
- `shoppingshop.spec.ts` – Shopping workflow testing

### 2. Pages
Contains page classes following the Page Object Model.

- `base.page.ts` – Base page functionality
- `cart.page.ts` – Cart page interactions
- `home.page.ts` – Home page interactions
- `login.page.ts` – Login page interactions
- `shopping.page.ts` – Shopping page interactions

### 3. Fixtures
Contains reusable Playwright test fixtures.

- `test-fixtures.ts` – Custom test fixture configuration

### 4. Reporters
Contains custom test reporting implementation.

- `extent-html-reporter.ts` – Custom Extent HTML reporter

### 5. Test Data
Dedicated directory for maintaining test data separately from test implementation.

### 6. Utils
Dedicated directory for reusable helper functions and utilities.

## ⚙️ Prerequisites

Install the following:

- Node.js
- npm
- Google Chrome
- Visual Studio Code (recommended)

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/Gokilappriya-qa/Playwright_Project.git
```

Navigate to the project:

```bash
cd Playwright_Project
```

Install dependencies:

```bash
npm install
```

## ▶️ Running Tests

**Run default Chrome tests**

```bash
npm test
```

**Run Chrome tests**

```bash
npm run test:chrome
```

**Run tests in headed mode**

```bash
npm run test:headed
```

**Run tests in debug mode**

```bash
npm run test:debug
```

**Run tests using Playwright UI mode**

```bash
npm run test:ui
```

**Run Cart test suite**

```bash
npm run test:cart
```

**Run custom test runner**

```bash
npm run run
```

## 📊 Test Reporting

### Playwright HTML Report

Generate and view the HTML report:

```bash
npm run report
```

Report output directory:

```text
reports/playwright-html/
```

### Custom Extent HTML Report

The framework also includes a custom Extent HTML reporter.

```text
reports/extent-report.html
```

## 🔍 Debugging and Execution

The framework supports:

- Browser execution in headed mode
- Playwright debugging
- Interactive UI mode
- Trace collection on test failures
- HTML report generation

## ⚙️ Playwright Configuration

The framework configuration includes:

- Test directory: `./tests`
- Test matching pattern: `**/*.spec.ts`
- Fully parallel test execution
- Chrome browser project
- Configurable base URL
- HTML reporter
- Custom Extent reporter
- Trace collection: `retain-on-failure`

Default application URL:

`https://www.scriptedqa.com`

The base URL can be overridden using the `BASE_URL` environment variable.

## 👩‍💻 Author

**Gokilappriya Shanmugam**

Quality Engineering Analyst | Playwright | TypeScript | Automation Testing

GitHub: [Gokilappriya-qa](https://github.com/Gokilappriya-qa)

---

⭐ Feel free to explore this repository and its automation framework.
