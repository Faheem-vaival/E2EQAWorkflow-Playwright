const { test, expect } = require('@playwright/test');

test.describe('Checkout - End-to-End Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC-01: Happy Path - Complete Checkout', async ({ page }, testInfo) => {
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(1);

    await page.click('#checkout');
    await page.fill('#first-name','John');
    await page.fill('#last-name','Doe');
    await page.fill('#postal-code','90210');
    await page.click('#continue');

    await expect(page.locator('.cart_item')).toHaveCount(1);
    await page.click('#finish');
    await expect(page.locator('.complete-header')).toHaveText(/THANK YOU FOR YOUR ORDER/i);
  });

  test('TC-03: Mandatory Field Validation', async ({ page }) => {
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('.shopping_cart_link');
    await page.click('#checkout');

    // Missing first name
    await page.fill('#last-name','Smith');
    await page.fill('#postal-code','90210');
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toHaveText(/Error: First Name is required/i);

    // Missing postal code
    await page.fill('#first-name','Alex');
    await page.fill('#last-name','Smith');
    await page.fill('#postal-code','');
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toHaveText(/Error: Postal Code is required/i);
  });

  test('TC-05: Overview Accuracy and Cancel', async ({ page }) => {
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(2);

    await page.click('#checkout');
    await page.fill('#first-name','John');
    await page.fill('#last-name','Doe');
    await page.fill('#postal-code','90210');
    await page.click('#continue');

    // Verify overview items and totals
    await expect(page.locator('.cart_item')).toHaveCount(2);
    const subtotalText = await page.locator('.summary_subtotal_label').innerText();
    expect(subtotalText).toMatch(/Item total:/i);

    // Cancel returns to cart (app may navigate back to inventory instead)
    await page.click('#cancel');
    await page.waitForLoadState('networkidle');
    // If redirected to inventory, open the cart to verify items; otherwise expect cart URL
    if (page.url().includes('/inventory')) {
      await page.click('.shopping_cart_link');
    } else {
      await expect(page).toHaveURL(/cart/);
    }
    await expect(page.locator('.cart_item')).toHaveCount(2);
  });
});
