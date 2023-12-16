// server.js
const express = require("express");
const puppeteer = require("puppeteer");
console.log("Scraper.js");

async function scrapeData() {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://medium.com/@mujeebkhan1831");

        let allFruits = await page.evaluate(() => {
            const fruitsList = document.body.querySelectorAll("h2");
            let fruits = [];
            fruitsList.forEach((value) => {
                fruits.push(value.innerText);
            });
            return fruits;
        });

        let allImgs = await page.evaluate(() => {
            const imgList = document.body.querySelectorAll("img");
            let imgs = [];
            imgList.forEach((value) => {
                imgs.push(value.src);
            });
            return imgs;
        });

        await browser.close();
        return { allImgs, allFruits };
    } catch (error) {
        console.error(error);
        return { error: "Error occurred during scraping" };
    }
}

const app = express();

app.get("/scrape", async (req, res) => {
    console.log("hello");
    try {
        const scrapedData = await scrapeData(); // Await the scrapeData function here
        res.json(scrapedData);
    } catch (error) {
        res.status(500).json({ error: "Failed to scrape data" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
