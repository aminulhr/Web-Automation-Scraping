import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  await page.setViewport({ width: 1200, height: 800 });
  page.on("request", (request) => {
    if (request.url().includes("ads")) {
      request.abort();
    } else {
      request.continue();
    }
  });
  await page.goto("https://www.prothomalo.com/");
  await page.addStyleTag({
    content: `
      body {
        background-color:red !important;
      }
    `,
  });

  //   await browser.close();
}
main().catch(console.error);
