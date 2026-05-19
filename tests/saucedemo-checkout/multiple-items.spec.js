const { test, expect } = require('@playwright/test');

test.describe('Checkout - Multiple Items', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL(/inventory/);
  });

  test('successful checkout multiple items', async ({ page }) => {
    await page.click('#add-to-cart-sauce-labs-backpack');
    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt');
    await page.click('#add-to-cart-sauce-labs-fleece-jacket');
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(3);

    await page.click('#checkout');
    await page.fill('#first-name','Alex');
    await page.fill('#last-name','Smith');
    await page.fill('#postal-code','90210');
    await page.click('#continue');

    // Verify totals and items
    const itemCount = await page.locator('.cart_item').count();
    expect(itemCount).toBe(3);

    await page.click('#finish');
    await expect(page.locator('.complete-header')).toHaveText(/THANK YOU FOR YOUR ORDER/i);
  });
});
