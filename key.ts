import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://excalidraw.com/");

  await page.keyboard.press("7"); // Select pencil tool (freehand)

  await page.mouse.move(400, 300, { steps: 20 }); // Start point (top-left)
  await page.mouse.down();

  await page.mouse.move(600, 300, { steps: 20 }); // Move right (top side)
  await page.mouse.move(600, 500, { steps: 20 }); // Move down (right side)
  await page.mouse.move(400, 500, { steps: 20 }); // Move left (bottom side)
  await page.mouse.move(400, 300, { steps: 20 }); // Move up to close the box (left side)

  await page.mouse.up();

  // await browser.close();
}
main().catch(console.error);
