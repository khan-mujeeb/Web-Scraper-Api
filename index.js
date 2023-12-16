// server.js
const express = require("express");
const scrapeData = require("./scrapper");

const app = express();

app.get("/scrape", async (req, res) => {
    console.log("hello");
    try {
        const scrapedData = await scrapeData();
        res.json(scrapedData);
        console.log(scrapedData)
    } catch (error) {
        res.status(500).json({ error: "Failed to scrape data" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export the Express API
module.exports = app;
