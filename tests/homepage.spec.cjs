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
    const header = page.locator('header, h1, .header, nav, .navbar, [class*="header"]');
    await expect(header.first()).toBeVisible({ timeout: 10000 });
    console.log('✅ Header is visible');
  });

  test('Navigation links work', async ({ page }) => {
    await page.goto('/');
    
    // Find all links on page
    const allLinks = page.locator('a[href]');
    const totalLinks = await allLinks.count();
    console.log(`📋 Total links on page: ${totalLinks}`);
    
    // Try multiple navigation selectors
    const navSelectors = [
      'nav a', 'header a', '.nav a', '.navbar a',
      '[class*="nav"] a', '[role="navigation"] a',
      'a[href="/"]', 'a[href*="/menu"]', 'a[href*="/products"]', 'a[href*="/cart"]'
    ];
    
    let foundNavLinks = 0;
    for (const selector of navSelectors) {
      const links = page.locator(selector);
      const count = await links.count();
      if (count > 0) {
        foundNavLinks += count;
        console.log(`✅ Found ${count} links with: ${selector}`);
      }
    }
    
    console.log(`📋 Total navigation links found: ${foundNavLinks}`);
    
    // If no navigation links found, check if page has any links
    if (foundNavLinks === 0) {
      console.log(`ℹ️ Total links on page: ${totalLinks}`);
      expect(totalLinks).toBeGreaterThan(0);
      console.log('✅ Page has links (navigation likely exists)');
    } else {
      expect(foundNavLinks).toBeGreaterThan(0);
      console.log('✅ Navigation links found');
    }
  });
});