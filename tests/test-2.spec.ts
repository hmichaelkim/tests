// This is an example test in which an input is searched into Youtube.com, then the search is validated.
// This example includes extra code which takes into account variations of the name 'Mango'.

import { test, expect } from '@playwright/test';

test('Search for "Mango vs Zain"', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.waitForSelector('input[name="search_query"]');
  await page.click('input[name="search_query"]');
  await page.fill('input[name="search_query"]', 'Mango vs Zain');
  await page.press('input[name="search_query"]', 'Enter'); 
  const searchInputValue = await page.inputValue('input[id="search"]');
  const searchResults = await page.innerText('.style-scope ytd-video-renderer');
  // Convert to lowercase
  const words = searchResults.toLowerCase().split(/\s+/);
  // Define alternative spellings for "mango"
  const mangoVariations = ["mango", "mang0", "Mang0"];
  // Assert that the search results contain "mango" and "zain"
  expect(
    mangoVariations.some(mango => words.includes(mango.toLowerCase())) &&
    words.includes("zain".toLowerCase())
  ).toBeTruthy();
});