# ScriptedQA Playwright POM tests

The active suite has four Playwright spec files in `components/`. Page locators and actions are encapsulated in `pages/`, with shared fixtures in `fixtures/`, reusable helpers in `utils/`, and data-driven inputs in `test-data/`.

Cart cases CART-01 and CART-04 are tagged `@sanity`; all four cart cases are tagged `@regression`. The runner maps `--tags` to Playwright's `--grep` filter.

From the `tests/` directory, run:

```powershell
npm run test:cart -- --tags @sanity
npm run test:cart -- --tags @regression
```

From the repository root, use the `tests` package explicitly:

```powershell
npm --prefix tests run test:cart -- --tags @sanity
npm --prefix tests run test:cart -- --tags @regression
```

Playwright writes its HTML report to `reports/playwright-html`. The custom Extent-style HTML report is generated from the reporter's `onEnd` hook after the entire selected run finishes and saved to `reports/extent-report.html`. Install dependencies from `tests/` with `npm install`. The `chrome` project launches Google Chrome.
