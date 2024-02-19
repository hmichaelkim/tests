import { test, expect } from '@playwright/test';

test('Search for "Mango vs Zain 2"', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.waitForSelector('input[name="search_query"]');
  await page.click('input[name="search_query"]');
  await page.fill('input[id="search"]', 'Mango vs Zain');
  await page.press('input[id="search"]', 'Enter');
  const searchInputValue = await page.inputValue('input[id="search"]');
  const searchResults = await page.innerText('.style-scope ytd-video-renderer');
  // Convert to lowercase 
  const words = searchResults.toLowerCase().split(/\s+/);
  // Assert that the search results contain "mango" and "zain"
  expect(words.includes('mango') && words.includes('zain')).toBeTruthy();
});