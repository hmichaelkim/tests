import { test, expect } from '@playwright/test';

test('Search for "Mango vs Zain"', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.waitForSelector('input[name="search_query"]');
  await page.click('input[name="search_query"]');
  await page.fill('input[id="search"]', 'Mango vs Zain');
  await page.press('input[id="search"]', 'Enter');
  const searchInputValue = await page.inputValue('input[id="search"]');
  // Assert that the search results contain "mango" and "zain"
  const searchResults = await page.innerText('.style-scope ytd-video-renderer');
  const words = searchResults.toLowerCase().split(/\s+/);
  // Define alternative spellings for "mango"
  const mangoVariations = ["mango", "mang0", "Mang0"];
  expect(
    mangoVariations.some(mango => words.includes(mango.toLowerCase())) &&
    words.includes("zain".toLowerCase())
  ).toBeTruthy();
});