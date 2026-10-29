# Perficient | Playwright Capstone - guide to run and present

## 1. What this project is

This framework perform end to end test on the practice.
An E2E test simulates steps a person would take and verifies the expected result.

## 2. How to run it from scratch

1. Open in VS Code the folder where `package.json` lives.
2. Open Terminal > New Terminal.
3. Run `npm install`.
4. Run `npx playwright install`.
5. Run `npm run typecheck`.
6. Run `npm run test:list`.
7. Run `npm run test:smoke`.
8. Run each TC one by one and record failures.
9. Run `npm run test:ci` for Chromium, Firefox and WebKit without TC08.
10. Run `npm run report` to open the HTML results.

## 3. What each folder contains

- `pages/`: Page Objects with actions and locators for each screen.
- `fixtures/`: automated setup and teardown of data and objects.
- `testdata/`: fake values; NO real users are used.
- `tests/`: eight scenarios TC01 to TC08.
- `utils/`: controlled network interception/mocking.
- `config/`: environment URL configuration.
- `reports/`: folder reserved for chosen evidence.
- `.github/workflows/`: automated execution in GitHub Actions.

## 4. Functional test cases

- TC01: creates an account via UI, verifies success and deletes it.
- TC02: sets up an account via UI, login, logout and cleanup.
- TC03: searches two texts, validates results and demonstrates an HTTP mock.
- TC04: adds product 1 to the cart and removes it.
- TC05: sets up a user, login, dummy checkout and confirms order.
- TC06: submits a contact form with a dummy attachment.
- TC07: runs axe-core on the header and reports WCAG violations.
- TC08: compares the All Products header against a baseline image.

## 5. Key terms to know

- Playwright: tool that controls browsers and verifies results.
- TypeScript: JavaScript with type checking.
- POM: centralizes actions and locators per page.
- Locator: instruction to identify a web element.
- Assertion: check that something expected actually happened.
- Fixture: object or setup that Playwright provides to the test.
- Mock: controlled network response for a specific test.
- Trace: evidence that allows reviewing every action, network call and DOM state.
- Baseline: approved snapshot used to detect visual changes.

## 6. Common commands

npm run typecheck
npm run test:list
npm run test:smoke
npx playwright test tests/04-cart.spec.ts --project=chromium --trace on
npm run test:visual:update
npm run test:visual
npm run test:ci
npm run report

## 7. Decisions and limitations

Registration for TC02 and TC05 is done via UI because a previous version
returned `ECONNRESET` when using POST /api/createAccount from a Cloud PC.
The TC03 mock demonstrates HTTP request interception but does not
represent a contract between the UI search and the products API.
TC07 only evaluates the #header region; its scope must be explained.
TC08 keeps a Windows + Chromium visual reference and is not run in CI on Linux.
Tests that depend on a public site may fail due to external causes.
A case must not be declared passed without evidence.

## 8. How to debug an error

1. Read the first error and the file name/line.
2. Re-run only the affected test with `--trace on`.
3. Open `npm run report` and select the case.
4. Inspect Screenshot / Trace / URL / Locator.
5. Change only what is necessary and repeat.

## 9. AI usage

Use Copilot/MCP or Claude
the proposal, human review, decision and re-run.
Never claim MCP was used if it was not actually executed.

## 10. How to present it to Perficient

1. Business problem and application under test.
2. Show folder architecture and the Test -> Fixture -> Page Object -> Web flow.
3. Show TC04 running and a cart validation.
4. Open the HTML report and an authentic Trace Viewer.
5. Explain Data Driven, mocking, accessibility and visual testing.
6. Show real results, findings and AI decisions.

## 11. Actual execution status

Complete `EVIDENCIAS.md`. Everything remains PENDING until run and verified.

## 12. How to understand TC04 step by step

File `tests/04-cart.spec.ts`:

1. The `test` defines a scenario that Playwright will execute.
2. `products` and `cart` are Page Objects prepared by the fixture.
3. `addFirstProduct()` opens products and adds an item.
4. `expect(cart.row(1)).toBeVisible()` checks that it appears.
5. `cart.remove(1)` removes the product and verifies it disappears.
This is Arrange, Act and Assert: prepare, act and verify.

## 13. Questions I should be able to answer

**Why POM?** Avoids repeating selectors across multiple scenarios.
**What is a fixture?** Prepares a Page Object or temporary user for a test.
**Why separate data?** Makes it easier to add new tests without changing the flow.
**How do I avoid flaky waits?** I use Playwright actions and expect, not fixed sleeps.
**What is a locator?** A way to identify a web element.
**What is a mock?** A controlled response to a network request.
**What is Trace Viewer for?** To see actions, DOM, console and network of a run.
**What does axe-core check?** Automatable accessibility rules within the chosen scope.
**What does the visual test compare?** The current screenshot against an approved baseline.
**How do I demonstrate cross-browser?** I run the same suite on different browser engines.
**How did I use AI?** Describe actions performed and validated; do not fabricate MCP usage.

## 14. Short presentation script

"I automated user journeys on a demo store. I separated scenarios by
functionality and centralized screen actions in Page Objects.
I used fixtures to prepare objects and a temporary user when needed.
I will run TC04, review its result in the HTML report and show how I would
use the trace if it failed. Finally I will explain network, accessibility,
visual testing, cross-browser execution and real results."
