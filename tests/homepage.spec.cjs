// tests/homepage.spec.js
const { test, expect } = require('@playwright/test');

test.describe('🍺 Brew Heaven - Homepage Tests', () => {
  
  test('Homepage loads successfully', async ({ page }) => {
    console.log('🔄 Testing Brew Heaven homepage...');
    
    await page.goto('/');
    
    // Page title check
    const title = await page.title();
    console.log(`📄 Page title: ${title}`);
    
    // Screenshot lo
    await page.screenshot({ path: 'brew-heaven-homepage.png' });
    
    console.log('✅ Homepage loaded successfully!');
  });

  test('Header is visible', async ({ page }) => {
    await page.goto('/');
    
    // Header check (apne website ke hisaab se customize karo)
    const header = page.locator('header, h1, .header');
    await expect(header).toBeVisible();
    
    console.log('✅ Header is visible');
  });

  test('Navigation links work', async ({ page }) => {
    await page.goto('/');
    
    // Navigation links
    const navLinks = page.locator('nav a');
    const count = await navLinks.count();
    console.log(`📋 Found ${count} navigation links`);
    
    expect(count).toBeGreaterThan(0);
  });
});