# Playwright TypeScript Automation Framework

A modular UI automation framework built using Playwright and TypeScript, following Page Object Model (POM) and hybrid framework practices. This project demonstrates reusable automation components, custom fixtures, test execution, reporting, and AI-assisted browser automation using Playwright Agents and MCP.

## 🚀 Project Overview

This repository demonstrates end-to-end UI automation using Playwright with TypeScript.

The framework follows a modular architecture to maintain reusable page objects, test fixtures, test scenarios, utilities, test data, and reporting components.

It also explores AI-assisted test automation using Playwright Agents, Playwright MCP, and AI coding assistants.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Playwright | Browser automation |
| TypeScript | Programming language |
| Node.js | Runtime environment |
| Playwright Test | Test execution |
| TSX | TypeScript execution |
| Chrome | Target browser |
| Playwright Agents | AI-assisted test generation and execution |
| Playwright MCP | AI-to-browser interaction |
| GitHub Copilot | AI-assisted coding |
| Claude | AI-assisted development |
| HTML Reporter | Test reporting |
| Custom Extent Reporter | HTML reporting |

## ✨ Framework Features

- Playwright automation using TypeScript
- Page Object Model (POM)
- Hybrid framework architecture
- Reusable page classes and components
- Custom Playwright test fixtures
- Modular test organization
- Custom test runner
- Chrome browser automation
- Parallel test execution
- Playwright HTML reporting
- Custom Extent HTML reporting
- Trace collection on test failures
- Headed, Debug and UI execution modes
- AI-assisted browser test generation using Playwright Agents
- Browser automation using Playwright MCP
- AI-assisted test development using GitHub Copilot and Claude

## 🤖 AI-Assisted Test Automation

This project explores AI-assisted browser automation using Playwright Agents, Playwright MCP, and AI coding assistants.

### Playwright Agents

- Used Playwright Agents to generate browser automation tests.
- Executed browser tests generated with Playwright Agents.
- Explored AI-assisted browser interactions and test scenario creation.

### Playwright MCP

- Configured Playwright MCP server in VS Code using MCP configuration.
- Used AI assistants to interact with browser automation capabilities through MCP.
- Explored AI-assisted browser testing workflows.

### AI Coding Assistants

- Used GitHub Copilot and Claude to assist with test script development.
- Explored AI-assisted automation development and debugging.

These tools complement the conventional Playwright TypeScript framework and demonstrate practical exploration of AI-powered testing workflows.

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

### Components
Contains test specifications for different application workflows.

- `cartflow.spec.ts` – Cart workflow testing
- `loginflow.spec.ts` – Login workflow testing
- `shoppingnavigation.spec.ts` – Shopping navigation testing
- `shoppingshop.spec.ts` – Shopping workflow testing

### Pages
Contains reusable page classes following Page Object Model.

- `base.page.ts` – Base page functionality
- `cart.page.ts` – Cart page interactions
- `home.page.ts` – Home page interactions
- `login.page.ts` – Login page interactions
- `shopping.page.ts` – Shopping page interactions

### Fixtures
Contains reusable Playwright test fixtures.

- `test-fixtures.ts` – Custom fixture configuration

### Reporters
Contains custom test reporting implementation.

- `extent-html-reporter.ts` – Custom Extent HTML reporter

### Test Data and Utils
Dedicated directories for test data and reusable helper functions.

## ⚙️ Prerequisites

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

Run default Chrome tests:

```bash
npm test
```

Run Chrome tests:

```bash
npm run test:chrome
```

Run tests in headed mode:

```bash
npm run test:headed
```

Run tests in debug mode:

```bash
npm run test:debug
```

Run tests using Playwright UI mode:

```bash
npm run test:ui
```

Run Cart test suite:

```bash
npm run test:cart
```

Run custom test runner:

```bash
npm run run
```

## 📊 Test Reporting

### Playwright HTML Report

```bash
npm run report
```

Report directory:

```text
reports/playwright-html/
```

### Custom Extent HTML Report

```text
reports/extent-report.html
```

## ⚙️ Playwright Configuration

- Test directory: `./tests`
- Test matching pattern: `**/*.spec.ts`
- Fully parallel execution
- Chrome browser project
- Configurable base URL
- HTML and custom Extent reporting
- Trace collection: `retain-on-failure`

Default base URL:

`https://www.scriptedqa.com`

The base URL can be overridden using the `BASE_URL` environment variable.

## 👩‍💻 Author

**Gokilappriya Shanmugam**

Quality Engineering Analyst | QA Automation | Playwright | TypeScript | AI-Assisted Testing

GitHub: https://github.com/Gokilappriya-qa

---

⭐ Feel free to explore the repository and automation framework.
