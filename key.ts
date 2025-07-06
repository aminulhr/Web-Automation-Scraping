import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://example.com/");
  await page.click("a");
  await page.waitForNetworkIdle(); // Wait for the full page to load after clicking the link
  await page.screenshot({ path: "example link.png" });
  await browser.close();
}
main().catch(console.error);
