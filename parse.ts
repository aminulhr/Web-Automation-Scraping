import fs from "fs";
const exists = fs.promises
  .access("example.curl.html", fs.constants.F_ok)
  .then(() => true)
  .catch(() => false);
let data;
if (exists) {
  data = fs.promises.writeFile("example.curl.html", "utf-8");
} else {
  data = await fetch("https://www.example.com/").then((response) =>
    response.text()
  );
  fs.promises.writeFile("example.puppeteer.html", data);
}
// *****read data with jsdom*********
import { JSDOM } from "jsdom";
const dom = new JSDOM(data);
const document = dom.window.document;
const link = document.querySelector("a");
if (link) {
  console.log(link.href);
} else {
  console.log("No <a> element found");
}

//****read data with puppeteer*****
import puppeteer from "puppeteer";
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(data);
await page.pdf({ path: "example.pdf" });
console.log(await page.evaluate(() => document.querySelector("h1").innerText));
await page.close();
await browser.close();
