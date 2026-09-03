// tests/cart.spec.cjs
const { test, expect } = require('@playwright/test');

test.describe('🛒 Brew Heaven - Cart Tests', () => {
  
  test('Cart page is accessible', async ({ page }) => {
    await page.goto('/cart');
    await page.screenshot({ path: 'brew-heaven-cart.png' });
    console.log('✅ Cart page loaded');
  });
});