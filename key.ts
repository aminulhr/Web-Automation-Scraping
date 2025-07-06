import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://excalidraw.com/");
  await page.keyboard.press("7");
  await page.mouse.move(400, 300, { steps: 10 });
  await page.mouse.down();
  await page.mouse.move(400, 600, { steps: 10 });
  await page.mouse.up();
  await browser.close();
}
main().catch(console.error);
