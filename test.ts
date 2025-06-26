import { puppeteer } from "puppeteer";
async function test() {
  console.time("puppeteer launch");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.example.com/");
  await browser.close();
  console.timeEnd("puppeteer launch");
}
test().catch(() => {
  console.error("Error");
});
