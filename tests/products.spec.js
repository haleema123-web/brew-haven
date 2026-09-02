// tests/products.spec.js
const { test, expect } = require('@playwright/test');

test.describe('🍺 Brew Heaven - Products Tests', () => {
  
  test('Products page loads', async ({ page }) => {
    await page.goto('/products');
    await page.screenshot({ path: 'brew-heaven-products.png' });
    console.log('✅ Products page loaded');
  });

  test('Add to cart button exists', async ({ page }) => {
    await page.goto('/products');
    
    // Apne website ke hisaab se selector change karo
    const addButton = page.locator('button:has-text("Add to Cart"), .add-to-cart');
    await expect(addButton.first()).toBeVisible();
    
    console.log('✅ Add to cart button found');
  });
});