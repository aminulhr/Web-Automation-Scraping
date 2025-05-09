import puppeteer from "puppeteer";
async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com");
  console.log(await page.content());
  await browser.close();
}
main();
