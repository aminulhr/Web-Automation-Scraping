import puppeteer from "puppeteer";

async function main() {
  console.time("puppeteer connect");
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/opt/google/chrome/google-chrome",
  });

  const page = await browser.newPage();

  await new Promise((resolve) => setTimeout(resolve, 5000));

  await browser.close();
  console.timeEnd("puppeteer connect");
  console.log("Browser closed successfully.");
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
