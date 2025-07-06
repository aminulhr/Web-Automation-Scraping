import puppeteer from "puppeteer";
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const query = "imice km 900 bd price";
  const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(
    query
  )}`;

  await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

  // ✅ Step 1: Collect top 10 real website URLs
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("li.b_algo h2 a"))
      .map((a) => a.href)
      .filter((href) => href.startsWith("http"))
      .slice(0, 10);
  });

  console.log("\n🔍 Found URLs:\n", links);

  const results = [];

  // ✅ Step 2: Visit each page and try to extract title and price
  for (const url of links) {
    const productPage = await browser.newPage();
    try {
      await productPage.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      const data = await productPage.evaluate(() => {
        const title = document.title;
        const text = document.body.innerText;

        const priceRegex = /(৳|Tk|BDT)[\s]*[0-9,.]+/gi;
        const prices = text.match(priceRegex);

        return {
          title,
          prices: prices ? prices.slice(0, 3) : ["Price not found"],
        };
      });

      results.push({ url, ...data });
    } catch (error) {
      console.error(`❌ Failed to scrape ${url}:`, error.message);
    } finally {
      await productPage.close();
    }
  }

  await browser.close();

  // ✅ Step 3: Display results
  console.log("\n📦 Final Product Data:\n");
  results.forEach((item, index) => {
    console.log(`${index + 1}. 🛍️ ${item.title}`);
    console.log(`   🔗 ${item.url}`);
    item.prices.forEach((price) => console.log(`   💰 ${price}`));
    console.log("--------------------------------");
  });
})();
