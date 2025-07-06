// index.mjs or index.js with ES Modules

import axios from "axios";
import chalk from "chalk";
import cheerio from "cheerio";
import Table from "cli-table3";

const productName = "Havit KB876L";
const query = encodeURIComponent(productName);
const darazURL = `https://www.daraz.com.bd/catalog/?q=${query}`;

async function scrapeDaraz() {
  try {
    console.log(chalk.yellow("🔍 Searching Daraz..."));

    const { data } = await axios.get(darazURL);
    const $ = cheerio.load(data);

    const results = [];

    $("div[data-qa-locator='product-item']").each((i, el) => {
      const name = $(el)
        .find("div[data-qa-locator='product-item-title']")
        .text()
        .trim();
      const price = $(el)
        .find("div[data-qa-locator='product-item-price']")
        .text()
        .trim();
      const link = $(el).find("a").attr("href");

      if (name && price && link) {
        results.push({
          name,
          price,
          link: "https:" + link,
        });
      }
    });

    const table = new Table({
      head: ["Product", "Price", "Link"],
      colWidths: [40, 15, 60],
      wordWrap: true,
    });

    results.forEach((item) => {
      table.push([item.name, item.price, item.link]);
    });

    console.log(chalk.green("\n📦 Products Found on Daraz:"));
    console.log(table.toString());
  } catch (err) {
    console.error(chalk.red("❌ Error fetching data from Daraz"), err);
  }
}

scrapeDaraz();
