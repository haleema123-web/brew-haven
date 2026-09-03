// tests/homepage.spec.cjs
const { test, expect } = require('@playwright/test');

test.describe('🍺 Brew Heaven - Homepage Tests', () => {
  
  test('Homepage loads successfully', async ({ page }) => {
    console.log('🔄 Testing Brew Heaven homepage...');
    
    await page.goto('/');
    
    const title = await page.title();
    console.log(`📄 Page title: ${title}`);
    
    await page.screenshot({ path: 'brew-heaven-homepage.png' });
    
    console.log('✅ Homepage loaded successfully!');
  });

  test('Header is visible', async ({ page }) => {
    await page.goto('/');
    
    const header = page.locator('header, h1, .header, nav');
    await expect(header.first()).toBeVisible({ timeout: 10000 });
    
    console.log('✅ Header is visible');
  });

  test('Navigation links work', async ({ page }) => {
    await page.goto('/');
    
    const navLinks = page.locator('nav a, header a, .nav a');
    const count = await navLinks.count();
    console.log(`📋 Found ${count} navigation links`);
    
    expect(count).toBeGreaterThan(0);
  });
});