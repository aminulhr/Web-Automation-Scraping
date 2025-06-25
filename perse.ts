import fs from "fs";
import { JSDOM } from "jsdom";
const data = await fs.promises.readFile("example.curl.html", "utf-8");
// console.log(data);
const dom = new JSDOM(data);
const document = dom.window.document;
console.log(document.querySelector("a").href);
