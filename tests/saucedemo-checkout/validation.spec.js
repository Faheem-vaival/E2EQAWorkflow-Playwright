const { test, expect } = require('@playwright/test');

test.describe('Checkout - Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(1);
    await page.click('#checkout');
  });

  test('missing required fields show error', async ({ page }) => {
    // Leave first name blank
    await page.fill('#last-name','Smith');
    await page.fill('#postal-code','90210');
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toHaveText(/Error: First Name is required/i);

    // Fill first name, leave postal code blank
    await page.fill('#first-name','Alex');
    await page.fill('#last-name','Smith');
    await page.fill('#postal-code','');
    await page.click('#continue');
    await expect(page.locator('[data-test="error"]')).toHaveText(/Error: Postal Code is required/i);
  });

  test('invalid postal code behavior', async ({ page }) => {
    await page.fill('#first-name','Alex');
    await page.fill('#last-name','Smith');
    await page.fill('#postal-code','abcde');
    await page.click('#continue');
    // App may accept or reject; check for error or proceed to overview
    const error = page.locator('[data-test="error"]');
    if (await error.count() > 0) {
      await expect(error).toBeVisible();
    } else {
      await expect(page).toHaveURL(/checkout-step-two/);
    }
  });
});
