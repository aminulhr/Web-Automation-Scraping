import puppeteer from "puppeteer";
import fs from "fs";
async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com");
  fs.promises.writeFile("example.puppeteer.html", await page.content());
  await browser.close();
}
main();
