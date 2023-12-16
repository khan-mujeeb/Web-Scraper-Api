// scraper.js

const puppeteer = require("puppeteer");
console.log("Scraper.js");
async function scrapeData() {
    try {
        console.log("hello");
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://medium.com/@mujeebkhan1831");

        let allFruits = await page.evaluate(() => {
            const fruitsList = document.body.querySelectorAll("h2");
            let fruits = [];
            fruitsList.forEach((value) => {
                console.log(value.innerText);
                fruits.push(value.innerText);
            });
            return fruits;
        });

        let allImgs = await page.evaluate(() => {
            const imgList = document.body.querySelectorAll("img");
            let imgs = [];
            imgList.forEach((value) => {
                console.log(value.src);
                imgs.push(value.src);
            });
            return imgs;
        });

        console.log(allFruits);
        console.log(allImgs);
        await browser.close();
        console.log(allFruits);
        return { allImgs, allFruits };
    } catch (error) {
        console.error(error);
        return { error: "Error occurred during scraping" };
    }
}

module.exports = scrapeData;
