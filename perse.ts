import fs from "fs";
import { JSDOM } from "jsdom";
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
// read data with jsdom
const dom = new JSDOM(data);
const document = dom.window.document;
console.log(document.querySelector("a").href);

//read data with puppeteer
