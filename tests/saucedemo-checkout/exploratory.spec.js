const { test, expect } = require('@playwright/test');
const path = require('path');

test('Exploratory: Successful Checkout - Single Item', async ({ page, browserName }) => {
  const screenshotsDir = path.join('test-results','screenshots');

  await page.goto('https://www.saucedemo.com');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory/);
  await page.screenshot({ path: `${screenshotsDir}/${browserName}-inventory.png`, fullPage: true });

  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('.shopping_cart_link');
  await page.screenshot({ path: `${screenshotsDir}/${browserName}-cart.png`, fullPage: true });
  await expect(page.locator('.cart_item')).toHaveCount(1);

  await page.click('#checkout');
  await page.screenshot({ path: `${screenshotsDir}/${browserName}-checkout-info.png`, fullPage: true });

  await page.fill('#first-name','Alex');
  await page.fill('#last-name','Smith');
  await page.fill('#postal-code','90210');
  await page.click('#continue');
  await page.screenshot({ path: `${screenshotsDir}/${browserName}-overview.png`, fullPage: true });
  await expect(page.locator('.cart_item')).toHaveCount(1);

  await page.click('#finish');
  await page.screenshot({ path: `${screenshotsDir}/${browserName}-complete.png`, fullPage: true });
  await expect(page.locator('.complete-header')).toHaveText(/THANK YOU FOR YOUR ORDER/i);
});
