// This is an example test in which an input is searched into Youtube.com, then the search is validated.

import { test, expect } from '@playwright/test';

test('Search for "Mango vs Leffen"', async ({ page }) => {
  await page.goto('https://www.youtube.com/'); 
  await page.waitForSelector('input[name="search_query"]');
  await page.click('input[name="search_query"]');
  await page.fill('input[name="search_query"]', 'Mango vs Leffen');
  await page.press('input[name="search_query"]', 'Enter'); 
  const searchInputValue = await page.inputValue('input[id="search"]');
  const searchResults = await page.innerText('.style-scope ytd-video-renderer');
  // Convert to lowercase
  const words = searchResults.toLowerCase().split(/\s+/);
  // Assert that the search results contain "mango" and "leffen"
  expect(words.includes('mango') && words.includes('leffen')).toBeTruthy();
});