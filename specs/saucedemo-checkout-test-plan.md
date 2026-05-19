# Test Plan: SCRUM-101 - SauceDemo Checkout

## Overview
This plan covers the end-to-end checkout workflow for https://www.saucedemo.com using the `standard_user` / `secret_sauce` credentials. It maps directly to the acceptance criteria in the user story and includes happy paths, negative cases, edge conditions, navigation checks, and responsiveness/cross-browser requirements.

## Test Environment
- Browsers: Chromium (Chrome), Firefox, WebKit (Safari)
- Viewports: Desktop (1280x800), Mobile (375x812)
- Credentials: Username: `standard_user`, Password: `secret_sauce`

## Test Case Template
- Title
- Preconditions
- Steps
- Expected Results
- Test Data

---

### TC-01: Happy Path — Complete Checkout
Preconditions: Logged in as `standard_user`; cart contains at least one item.
Steps:
1. Navigate to products page; add a product to cart
2. Open cart and verify item present
3. Click `Checkout`
4. Fill First Name, Last Name, Zip with valid values
5. Click `Continue` to reach Overview
6. Click `Finish`
Expected Results:
- Items shown in cart with name, description, price, and quantity
- Checkout information accepts valid inputs and proceeds
- Overview shows items, payment/shipping summary, subtotal, tax, total
- After Finish, confirmation page shown with success message and `Back Home` button
- Cart is cleared after confirmation
Test Data: First Name: `John`, Last Name: `Doe`, Zip: `90210`

### TC-02: Cart Review Details
Preconditions: Logged in; multiple items added to cart.
Steps:
1. Open cart page
2. Verify each listed item displays name, description, price, and quantity
3. Verify total price calculation equals sum(items) + tax
4. Click `Continue Shopping` and verify navigation back to products
Expected Results:
- All item details present and totals correct
- `Continue Shopping` returns to products page

### TC-03: Mandatory Field Validation (Empty Fields)
Preconditions: On Checkout Information page with items in cart.
Steps:
1. Leave First Name empty, fill other fields, click `Continue`
2. Repeat for Last Name and Zip fields individually
Expected Results:
- Appropriate validation message displayed identifying the empty required field
- Cannot proceed to Overview until field is filled
Test Data: omit fields per step

### TC-04: Invalid Data Validation
Preconditions: On Checkout Information page.
Steps:
1. Enter invalid values (e.g., `!@#$%` in First/Last, alphanumeric in Zip if Zip expects digits), click `Continue`
Expected Results:
- Proper validation messages displayed for invalid formats
- Cannot proceed until inputs are valid
Test Data: First Name: `!@#`, Last Name: `123`, Zip: `A1B2`

### TC-05: Order Overview Accuracy
Preconditions: Valid checkout information provided.
Steps:
1. Proceed to Overview
2. Verify list of items matches cart with quantities
3. Verify displayed payment and shipping info summary
4. Verify subtotal, tax, and total calculations are correct
5. Click `Cancel` and verify navigation back to cart with data intact
Expected Results:
- Overview displays accurate order summary and pricing calculations
- Cancel returns to cart state preserving items

### TC-06: Finish and Back Home Behavior
Preconditions: On Overview page.
Steps:
1. Click `Finish`
2. Verify confirmation page message content and presence of `Back Home`
3. Click `Back Home` and verify navigation to products and that cart is empty
Expected Results:
- Confirmation page shown with success message
- Back Home returns to products and cart cleared

### TC-07: Cancel at Various Steps
Preconditions: Items in cart; on Checkout Info or Overview pages.
Steps:
1. From Checkout Info, click `Cancel` and verify return to cart
2. From Overview, click `Cancel` and verify return to cart
Expected Results:
- Cancel returns to cart page without completing order

### TC-08: Navigation & Back Button Behavior
Preconditions: Mid-checkout (Info or Overview page).
Steps:
1. Use browser Back button at each step and verify correct navigation and state
Expected Results:
- App handles browser back without exposing invalid states; form data may persist per expected behavior

### TC-09: Mobile Responsiveness
Preconditions: Use mobile viewport (375x812).
Steps:
1. Execute TC-01 and TC-03 on mobile viewport
Expected Results:
- Layout remains usable; form controls reachable; no visual overflow; validations still work

### TC-10: Cross-Browser Smoke
Preconditions: Run critical tests in Chromium, Firefox, WebKit.
Steps:
1. Execute TC-01 and TC-05 across each browser
Expected Results:
- Core flows work consistently across browsers; no selector-specific failures

---

## Reporting & Artifacts
- Save exploratory screenshots for failing steps and key confirmations under `test-results/screenshots/`
- Record manual execution notes and any defects into `test-results/SCRUM-101-checkout-test-report.md`

## Notes for Automation
- Prefer stable selectors: data-test, id, role attributes when available
- Add `beforeEach` hook to log in and seed cart where needed
- Use explicit waits for navigation and element visibility
- Parameterize browsers and viewports in Playwright config
**Test Plan Title:** Saucedemo — Checkout End-to-End Test Plan

**Related User Story:** [user-stories/SCRUM-101-ecommerce-checkout.md](user-stories/SCRUM-101-ecommerce-checkout.md)  
**Suggested file path:** [specs/saucedemo-checkout-test-plan.md](specs/saucedemo-checkout-test-plan.md)  
**Application URL:** https://www.saucedemo.com  
**Credentials (test account):** username: standard_user, password: secret_sauce

**Scope & Goals**
- Verify end-to-end checkout flow from login  add to cart  checkout info  overview  complete.
- Validate UI elements, navigation flows, negative and edge cases.
- Provide test data and explicit steps for automation with Playwright.

**Planned Steps**
1. Prepare test environment and test data.
2. Execute Happy Path scenarios.
3. Execute Negative and Edge Case scenarios.
4. Validate navigation flows and UI elements.
5. Capture recommended screenshots and test evidence.

**Exploration Checklist**
- - **Environment:** Use a clean browser profile; clear cookies/cache before each run.
- - **Baseline:** Confirm availability of https://www.saucedemo.com and login with `standard_user/secret_sauce`.
- - **Accounts:** Ensure only provided test account is used.
- - **Test Data:** Prepare small dataset of product SKUs/names (e.g., Sauce Labs Backpack, Bolt T-Shirt, Fleece Jacket).
- - **Network:** Run tests under normal and throttled network (optional).
- - **Browser Variants:** Run primary tests in Chromium; spot-check in Firefox and WebKit.
- - **Logging:** Capture console logs and network errors.
- - **Accessibility:** Quick a11y check on forms (labels, errors).

**Recommended Screenshots**
- - **Login success:** Inventory page after login.
- - **Added to cart:** Inventory showing items added and cart badge count.
- - **Cart page:** Cart items with price and quantity.
- - **Checkout: Your Information (errors):** Missing/invalid field error messages.
- - **Checkout Overview:** Item list, prices, tax, total.
- - **Order Complete:** "THANK YOU FOR YOUR ORDER" confirmation page.

---

**Test Data**
- - **URL:** https://www.saucedemo.com
- - **Valid Creds:** `standard_user` / `secret_sauce`
- - **Invalid Creds:** `locked_out_user`/`wrong_pass`, ``, `invalid_user`/`invalid`
- - **Products:** "Sauce Labs Backpack", "Sauce Labs Bolt T-Shirt", "Sauce Labs Fleece Jacket"
- - **Checkout Info Valid:** firstName: "Alex", lastName: "Smith", postalCode: "90210"
- - **Checkout Info Invalid Samples:**
  - postalCode: "" (empty)
  - postalCode: "abcde" (non-numeric)
  - firstName: "" (empty)
  - lastName: very long string (64 256 chars)
  - special characters in name: "@lex#"
- - **Quantities:** 1, 5 (if supported); adding same product twice.
- - **Edge payload:** 20 items added (if UI supports), or rapid add/remove.

---

**Happy Path Scenarios**

- **Title:** Successful Checkout — Single Item
  - **Precondition:** User logged out; site reachable.
  - **Steps:**
    1. Open https://www.saucedemo.com.
    2. Login with `standard_user` / `secret_sauce`.
    3. On inventory page, add "Sauce Labs Backpack" to cart.
    4. Click cart icon and open Cart page.
    5. Verify item present with correct name and price.
    6. Click `Checkout`.
    7. Enter firstName: Alex, lastName: Smith, postalCode: 90210; click `Continue`.
    8. Verify Checkout Overview lists the item, item total, tax, and total.
    9. Click `Finish`.
  - **Expected Results:**
    - Login successful; inventory displayed.
    - Cart badge increments to 1.
    - Cart shows "Sauce Labs Backpack" with matching price.
    - Checkout info accepted; overview shows correct price calculation.
    - Finish navigates to confirmation page showing "THANK YOU FOR YOUR ORDER".
  - **Test Data:** product="Sauce Labs Backpack"; user=standard_user; name data above.

- **Title:** Successful Checkout — Multiple Items
  - **Steps:**
    1. Login as above.
    2. Add "Sauce Labs Backpack", "Sauce Labs Bolt T-Shirt", "Sauce Labs Fleece Jacket".
    3. Open Cart, verify all items and sum of prices.
    4. Checkout and enter valid info; continue; finish.
  - **Expected Results:**
    - Cart count = 3.
    - Overview lists three items with correct prices; totals match sum + tax.
    - Order complete page displayed.
  - **Test Data:** products list as above.

- **Title:** Checkout After Removing an Item
  - **Steps:**
    1. Login.
    2. Add two items (Backpack, Bolt T-Shirt).
    3. Open Cart and remove "Bolt T-Shirt".
    4. Continue checkout with remaining item.
  - **Expected Results:**
    - Removed item no longer appears.
    - Totals update accordingly.
    - Checkout completes for remaining item.

---

**Negative Scenarios**

- **Title:** Login with Invalid Credentials
  - **Steps:**
    1. Open login page.
    2. Attempt login with `invalid_user` / `invalid`.
  - **Expected Results:**
    - Error message displayed: "Epic sadface: Username and password do not match any user in this service".
    - No navigation to inventory page.

- **Title:** Checkout with Empty Cart
  - **Steps:**
    1. Login.
    2. Without adding items, click cart then `Checkout`.
  - **Expected Results:**
    - Cart page shows empty state (or no items).
    - Checkout should either prevent continue or show empty overview; graceful handling (no crash).

- **Title:** Checkout — Missing Required Fields
  - **Steps:**
    1. Add an item and go to Checkout: Your Information.
    2. Leave `First Name` blank; fill others; click `Continue`.
    3. Repeat for `Last Name` blank and for `Postal Code` blank.
  - **Expected Results:**
    - Inline validation/error message shown: "Error: First Name is required" (or similar).
    - Cannot proceed to Overview until fields are filled.

- **Title:** Checkout — Invalid Postal Code
  - **Steps:**
    1. Fill postalCode = "abcde"; click `Continue`.
  - **Expected Results:**
    - Either validation error or system accepts but downstream totals still computed; test documents behavior. (If validation present, error message should be displayed.)

- **Title:** Add & Remove Race Condition / Rapid Clicks
  - **Steps:**
    1. Rapidly click `Add to cart` then `Remove` repeatedly for a product.
  - **Expected Results:**
    - Cart count remains consistent; no JavaScript errors; UI ends in valid state (0 or 1 consistent with last action).

- **Title:** Login with Locked Out User
  - **Steps:**
    1. Attempt login with known locked account (e.g., `locked_out_user` if available).
  - **Expected Results:**
    - Show locked out error message: "Epic sadface: Sorry, this user has been locked out." 

---

**Edge Case Scenarios**

- **Title:** Long Input Values in Name Fields
  - **Steps:**
    1. Enter firstName/lastName with 256+ characters; continue.
  - **Expected Results:**
    - App either trims/accepts or shows validation; should not crash.
    - Document how system handles overflow.

- **Title:** Special Characters in Name Fields
  - **Steps:**
    1. Enter firstName="@lex#", lastName="O'Conor-Jr"; continue.
  - **Expected Results:**
    - Fields accepted and checkout completes (or validated per app rules).

- **Title:** Multiple Tabs / Session Persistence
  - **Steps:**
    1. Login in Tab A, add items.
    2. In Tab B, login with same user; verify cart state.
    3. Logout in Tab A; then interact in Tab B.
  - **Expected Results:**
    - Cart persistence behavior documented; no leaking or unexpected states.

- **Title:** Page Refresh at Each Step
  - **Steps:**
    1. Refresh inventory page after adding items.
    2. Refresh cart page, checkout info, overview pages.
  - **Expected Results:**
    - State persists appropriately (cart contents retained); no loss of data.

- **Title:** Quantity Limits / Bulk Adds
  - **Steps:**
    1. Attempt to add a product many times (if supported) or repeatedly add multiple different items hitting high cart counts.
  - **Expected Results:**
    - UI remains stable; cart count increments; checkout calculations scale.

- **Title:** Price Tampering (UI Manipulation)
  - **Steps:**
    1. Inspect prices in DOM or attempt to change displayed price in dev tools, then continue checkout.
  - **Expected Results:**
    - Server-side price validation should prevent tampered client values from affecting final totals. Document observed behavior.

---

**Navigation Flow Tests**

- **Title:** Back Navigation from Overview to Info
  - **Steps:**
    1. Fill checkout info and continue to Overview.
    2. Click browser Back or `Cancel`/`Back` (if present) to return to Information page.
  - **Expected Results:**
    - Previously entered information remains populated and editable.

- **Title:** Continue Shopping from Cart
  - **Steps:**
    1. On Cart page, click `Continue Shopping`.
  - **Expected Results:**
    - Navigates back to Inventory page; cart badge remains unchanged.

- **Title:** Cancel Checkout from Overview
  - **Steps:**
    1. On Overview page, click `Cancel`.
  - **Expected Results:**
    - Returns to Inventory or Cart per app behavior; items remain in cart.

- **Title:** Logout Mid-Checkout
  - **Steps:**
    1. During checkout (any step), click menu  Logout.
  - **Expected Results:**
    - Session ends; on next login cart state either preserved or cleared as per app; document observed behavior.

---

**UI Element Validation (Smoke / Visual Checks)**

For each listed UI page, verify presence, text, and basic visual state:

- **Login Page**
  - - **Elements:** Username input, Password input, Login button, Login error area, Sauce Labs logo.
  - - **Checks:** Field placeholders/labels correct; password masked; `Login` enabled only when fields filled (if applicable).

- **Inventory Page**
  - - **Elements:** Product list tiles, product name, description, price, `Add to cart` button, cart icon with badge, sort dropdown.
  - - **Checks:** Product images load; price formatting `$X.XX`; `Add to cart` toggles to `Remove` when clicked.

- **Cart Page**
  - - **Elements:** Item rows (name, price), `Remove` button, `Continue Shopping`, `Checkout` buttons, cart total summary.
  - - **Checks:** Totals correct; remove action updates badge.

- **Checkout  Your Information**
  - - **Elements:** First Name, Last Name, Postal Code fields; `Continue`, `Cancel`.
  - - **Checks:** Field validation messages; tab order; labels correctly associated.

- **Checkout  Overview**
  - - **Elements:** Itemized list, payment info area, shipping info, item total, tax, total, `Finish`, `Cancel`.
  - - **Checks:** Calculations accurate; `Finish` enabled.

- **Checkout  Complete**
  - - **Elements:** Confirmation heading, order details (if any), back-to-products button.
  - - **Checks:** Confirmation text present and readable.

For each UI check capture at least one screenshot and a DOM snapshot if automating.

---

**Test Execution Notes & Expected Assertions**
- - **Authentication:** Assert login redirect to inventory and presence of inventory header.
- - **Cart Assertions:** Verify cart badge number equals number of unique items added.
- - **Price Assertions:** Assert item price * quantity sum + tax = displayed total (use numeric parsing).
- - **Error Assertions:** Check for specific error messages when validation fails.
- - **Navigation Assertions:** Assert correct URL path or page title at each major step (inventory, cart, checkout-step-1, checkout-step-2, checkout-complete).
- - **Accessibility Quick Checks:** Ensure input fields have accessible labels.

---

**Prioritized Test Scenario Matrix** (for planning/sprints)
- High Priority (smoke/regression): Successful Checkout  Single Item; Login success; Cart add/remove; Checkout required fields validation; Order complete.
- Medium Priority: Multiple Items checkout; Navigation flows (back/cancel); UI element presence.
- Low Priority: Large quantity adds; long input values; session multi-tab behavior; price tampering.

---

**Attachment & Artifacts Recommendations**
- - **Saved Evidence:** For each scenario attach at least one screenshot (login success, cart, checkout error, overview, confirmation).
- - **Logs:** Save browser console logs and Playwright network traces for failing tests.
- - **Test Data File:** Maintain a JSON fixture for products and user data for automation:
  - - Example:
    {
      "user": {"username":"standard_user","password":"secret_sauce"},
      "products":["Sauce Labs Backpack","Sauce Labs Bolt T-Shirt","Sauce Labs Fleece Jacket"]
    }

---

**Notes for Automation with Playwright**
- - **Selectors:** Prefer stable data-test selectors if present (e.g., `data-test="add-to-cart-sauce-labs-backpack"`), fallback to accessible text and CSS classes.
- - **Retries:** Flaky visual loads  add short waits for element visibility, avoid arbitrary sleeps.
- - **Parallelization:** Run independent scenarios in parallel; avoid shared state when tests add/remove items (use fresh browser contexts).
- - **Screenshots on Failure:** Capture full-page screenshot and trace on test failure.

---

End of test plan.
