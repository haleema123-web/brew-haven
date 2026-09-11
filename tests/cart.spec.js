import { test, expect } from '@playwright/test';

test('Order request ko intercept karke dekho', async ({ page }) => {
  let intercepted = false;

  await page.route('**/api/order/**', async (route) => {
    const request = route.request();
    console.log('\n==============================');
    console.log('ORDER REQUEST INTERCEPTED!');
    console.log('==============================');
    console.log('URL:', request.url());
    console.log('METHOD:', request.method());
    console.log('HEADERS:', request.headers());
    console.log('PAYLOAD:', request.postData());
    intercepted = true;
    await route.continue();
  });

  await page.goto('/');
  await page.screenshot({ path: 'playwright-page.png', fullPage: true });
  await page.waitForLoadState('networkidle');

  console.log('\nWebsite loaded successfully.');
  console.log('Intercept status:', intercepted);
});