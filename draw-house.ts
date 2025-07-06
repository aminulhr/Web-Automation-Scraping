import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 800 });

  await page.goto("https://excalidraw.com/");
  await page.waitForFunction(() => {
    const canvas = document.querySelector("canvas");
    return canvas && canvas.clientHeight > 0;
  });

  await page.keyboard.press("7"); // Activate free draw tool

  // 🏠 House base
  await page.mouse.move(400, 400);
  await page.mouse.down();
  await page.mouse.move(600, 400, { steps: 10 });
  await page.mouse.move(600, 600, { steps: 10 });
  await page.mouse.move(400, 600, { steps: 10 });
  await page.mouse.move(400, 400, { steps: 10 });
  await page.mouse.up();

  // 🔺 Roof
  await page.mouse.move(400, 400);
  await page.mouse.down();
  await page.mouse.move(500, 300, { steps: 10 });
  await page.mouse.move(600, 400, { steps: 10 });
  await page.mouse.move(400, 400, { steps: 10 });
  await page.mouse.up();

  // 🚪 Door
  await page.mouse.move(470, 500);
  await page.mouse.down();
  await page.mouse.move(530, 500, { steps: 5 });
  await page.mouse.move(530, 600, { steps: 5 });
  await page.mouse.move(470, 600, { steps: 5 });
  await page.mouse.move(470, 500, { steps: 5 });
  await page.mouse.up();

  // 🪟 Left Window
  await page.mouse.move(420, 450);
  await page.mouse.down();
  await page.mouse.move(460, 450, { steps: 5 });
  await page.mouse.move(460, 490, { steps: 5 });
  await page.mouse.move(420, 490, { steps: 5 });
  await page.mouse.move(420, 450, { steps: 5 });
  await page.mouse.up();

  // 🪟 Right Window
  await page.mouse.move(540, 450);
  await page.mouse.down();
  await page.mouse.move(580, 450, { steps: 5 });
  await page.mouse.move(580, 490, { steps: 5 });
  await page.mouse.move(540, 490, { steps: 5 });
  await page.mouse.move(540, 450, { steps: 5 });
  await page.mouse.up();

  // 📸 Screenshot
  await page.screenshot({ path: "house.png" });

  // await browser.close();
}

main().catch(console.error);
