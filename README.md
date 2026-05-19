# Playwright Checkout QA Workflow

This repository contains an end-to-end QA workflow for the SauceDemo checkout process (SCRUM-101).

## Setup

Install dependencies:

```bash
npm install
```

## Run the Checkout Test Suite

Execute all SauceDemo checkout tests:

```bash
npm test -- tests/saucedemo-checkout
```

Or run the new consolidated checkout suite directly:

```bash
npx playwright test tests/saucedemo-checkout/checkout.spec.js
```

## Reports and Artifacts

- Manual exploratory screenshots are saved under: `test-results/screenshots/`
- The execution report is available at: `test-results/SCRUM-101-checkout-test-report.md`
- The comprehensive test plan is at: `specs/saucedemo-checkout-test-plan.md`

## Notes

- The suite uses the SauceDemo credentials: `standard_user` / `secret_sauce`
- The tests are intended to run across Chromium, Firefox, and WebKit.
