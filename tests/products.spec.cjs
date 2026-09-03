// tests/products.spec.cjs
const { test, expect } = require('@playwright/test');

test.describe('🍺 Brew Heaven - Products Tests', () => {
  
  test('Products page loads', async ({ page }) => {
    await page.goto('/products');
    await page.screenshot({ path: 'brew-heaven-products.png' });
    console.log('✅ Products page loaded');
  });

  test('Products page has content', async ({ page }) => {
    await page.goto('/products');
    const body = page.locator('body');
    await expect(body).toBeVisible();
    console.log('✅ Products page content visible');
  });
});