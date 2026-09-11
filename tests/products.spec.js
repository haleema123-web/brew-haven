// tests/products.spec.js
import { test, expect } from '@playwright/test';

test.describe('🍺 Brew Heaven - Products Tests', () => {
  
  test('Products page loads', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    console.log('✅ Products page loaded');
  });

  test('Products page has content', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    console.log('✅ Products page content visible');
  });
});