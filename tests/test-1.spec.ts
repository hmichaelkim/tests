import { test, expect } from '@playwright/test';

test('Search for "Mango vs Leffen"', async ({ page }) => {
  await page.goto('https://www.youtube.com/'); 
  await page.waitForSelector('input[name="search_query"]');
  await page.click('input[name="search_query"]');
  await page.fill('input[name="search_query"]', 'Mango vs Leffen');
  await page.press('input[id="search"]', 'Enter');
  const searchInputValue = await page.inputValue('input[id="search"]');
  // Assert that the search results contain "mango" and "leffen"
  const searchResults = await page.innerText('.style-scope ytd-video-renderer');
  const words = searchResults.toLowerCase().split(/\s+/);
  expect(words.includes('mango') && words.includes('leffen')).toBeTruthy();
});