import fs from "fs";
const exist = await fs.promises
  .access("example.html", fs.constants.F_OK)
  .then(() => true)
  .catch(() => false);
let data;
if (exist) {
  data = await fs.promises.readFile("example.html", "utf-8");
} else {
  data = await fetch("https://example.com").then((res) => res.text());
  fs.promises.writeFile("example.html", data);
}

import { JSDOM } from "jsdom";
const dom = new JSDOM(data);
const document = dom.window.document;
console.log(document.querySelector("a").href);

import puppeteer from "puppeteer";
const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.pdf({ path: "example.pdf" });

console.log(await page.evaluate(() => document.querySelector("h1")?.innerText));
await page.close();
await browser.close();
