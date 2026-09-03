// cart.spec.js
import { test, expect } from '@playwright/test';

test.describe('🛒 Brew Heaven - Cart Tests', () => {
  test('Cart page is accessible', async ({ page }) => {
    await page.goto('/cart');
    await page.screenshot({ path: 'brew-heaven-cart.png' });
    console.log('✅ Cart page loaded');
  });
});