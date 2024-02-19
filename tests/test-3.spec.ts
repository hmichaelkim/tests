import { test, expect } from '@playwright/test';

test('Search for "Mango vs Zain 2"', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.waitForSelector('input[name="search_query"]');
  await page.click('input[name="search_query"]');
  await page.fill('input[id="search"]', 'Mango vs Zain');
  await page.press('input[id="search"]', 'Enter');
  const searchInputValue = await page.inputValue('input[id="search"]');
  // Assert that the search results contain "mango" and "zain"
  const searchResults = await page.innerText('.style-scope ytd-video-renderer');
  const words = searchResults.toLowerCase().split(/\s+/);
  expect(words.includes('mango') && words.includes('zain')).toBeTruthy();
});