import puppeteer from "puppeteer";

const run = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.google.com");
  await page.type('input[name="q"]', "Puppeteer");
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  await page.screenshot({ path: "google-search.png" });

  await browser.close();
};

run();
