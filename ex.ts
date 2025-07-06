import fs from "fs/promises"; // For saving page content
import puppeteer from "puppeteer";

const run = async () => {
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: false, // Set to false for debugging to see the browser
      dumpio: true, // Log browser console output
    });
    const page = await browser.newPage();

    // Navigate to Google
    await page.goto("https://www.google.com", { waitUntil: "networkidle2" });

    // Handle consent screen if present
    const consentButton = await page.$(
      'button[id*="L2AGLb"], button[id*="W0wltc"]'
    ); // Common consent button IDs
    if (consentButton) {
      console.log("Consent screen detected, clicking accept...");
      await consentButton.click();
      await page.waitForNavigation({ waitUntil: "networkidle2" });
    }

    // Debug: Save page content and screenshot
    const html = await page.content();
    await fs.writeFile("google-page.html", html); // Save HTML for inspection
    await page.screenshot({ path: "debug-google.png" }); // Screenshot for debugging
    console.log(
      "Page content saved to google-page.html and screenshot to debug-google.png"
    );

    // Wait for either input or textarea with name="q"
    const searchSelector = 'input[name="q"], textarea[name="q"]';
    await page.waitForSelector(searchSelector, { timeout: 15000 });
    console.log("Search input/textarea found");

    // Type the search query
    await page.type(searchSelector, "Puppeteer");

    // Press Enter
    await page.keyboard.press("Enter");

    // Wait for navigation
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // Take a screenshot of the results
    await page.screenshot({ path: "google-search.png" });
    console.log("Search results screenshot saved to google-search.png");

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error("Error occurred:", error);
    // Keep browser open for debugging if error occurs
    // await browser.close();
    process.exit(1);
  }
};

run();
