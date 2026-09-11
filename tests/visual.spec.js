// tests/visual.spec.js
import { test, expect } from '@playwright/test';

test.describe('🍺 Brew Heaven - Visual Tests', () => {

  test('Homepage visual snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('homepage.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test('Products page visual snapshot', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    await expect(page).toHaveScreenshot('products.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

});