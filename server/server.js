const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 5000;
const auctionUrls = [
  'https://www.catawiki.com/en/c/333-watches?filters=reserve_price%255B%255D%3D0&sort=bidding_end_desc',
  'https://www.catawiki.com/en/c/117-modern-contemporary-art?sort=bidding_end_desc&filters=reserve_price%255B%255D%3D0%26bidding_end_days%255B%255D%3D20240717',
  'https://www.catawiki.com/en/s?q=chanel&filters=l2_categories%255B%255D%3D1345%26free_shipping%255B%255D%3D1&sort=bidding_end_desc',
  'https://www.catawiki.com/en/c/333-watches?sort=bidding_end_desc&filters=909%255B%255D%3D60796%26909%255B%255D%3D61019%26909%255B%255D%3D60922%26909%255B%255D%3D60199%26909%255B%255D%3D60226%26909%255B%255D%3D60210%26909%255B%255D%3D61062%26909%255B%255D%3D61350%26reserve_price%255B%255D%3D0',
  'https://www.catawiki.com/en/c/1117-bags?sort=bidding_end_desc&filters=909%255B%255D%3D60480%26909%255B%255D%3D61407%26909%255B%255D%3D70242%26909%255B%255D%3D60226%26909%255B%255D%3D61240%26909%255B%255D%3D60256%26reserve_price%255B%255D%3D0',
  'https://www.catawiki.com/en/s?q=books&sort=bidding_end_desc&filters=l2_categories%255B%255D%3D535%26bidding_end_days%255B%255D%3D20240717%26reserve_price%255B%255D%3D0',
  'https://www.catawiki.com/en/s?q=books&sort=bidding_end_desc&filters=l2_categories%255B%255D%3D535%26bidding_end_days%255B%255D%3D20240717%26reserve_price%255B%255D%3D0&page=2#filters',
  'https://www.catawiki.com/en/c/437-whisky?filters=reserve_price%255B%255D%3D1&sort=bidding_end_desc',
  'https://www.catawiki.com/en/c/569-archaeology?sort=bidding_end_desc&filters=reserve_price%255B%255D%3D0',
  'https://www.catawiki.com/en/c/55-design-iconic-brands?sort=bidding_end_desc&l2_categories=1045',
  'https://www.catawiki.com/en/c/55-design-iconic-brands?sort=bidding_end_desc&l2_categories=1045%2C1315%2C61&filters=reserve_price%255B%255D%3D0',
  'https://www.catawiki.com/en/c/55-design-iconic-brands?sort=bidding_end_desc&l2_categories=1045%2C1315%2C61&filters=reserve_price%255B%255D%3D0&page=2',
  'https://www.catawiki.com/en/c/717-historical-memorabilia?sort=bidding_end_desc&l2_categories=235%2C1507',
  'https://www.catawiki.com/en/x/687645-the-paris-apartment-collection?sorting=bidding_end&filters=reserve_price%255B%255D%3D0&page=2#filters',
  'https://www.catawiki.com/en/x/684415-design-vintage-no-reserve?filters=reserve_price%255B%255D%3D0'
];

async function scrapeAuctionData(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.waitForSelector('.c-lot-card__title');

    const allAuctionData = await page.evaluate(() => {
      const auctions = document.querySelectorAll('.c-lot-card');
      return Array.from(auctions).map(auction => {
        const title = auction.querySelector('.c-lot-card__title')?.innerText || 'Not Available';
        const price = auction.querySelector('.c-lot-card__price')?.innerText || 'Not Available';
        const timer = auction.querySelector('.c-lot-card__timer')?.innerText || 'Not Available';
        const imageUrl = auction.querySelector('.c-lot-card__image img')?.getAttribute('src') || 'Not Available';

        const anchorElement = auction.closest('a.c-lot-card');
        const href = anchorElement ? anchorElement.getAttribute('href') : '';
        const serialNumberMatch = href.match(/\/l\/(\d{8})-/);
        const serialNumber = serialNumberMatch ? serialNumberMatch[1] : 'Not Available';

        return {
          title,
          price,
          timer,
          serialNumber,
          imageUrl,
          href,
        };
      });
    });

    await browser.close();
    return allAuctionData;
  } catch (error) {
    console.error(`Error scraping URL: ${url}`, error);
    await browser.close();
    throw error;
  }
}

app.get("/api/auctions", async (req, res) => {
  try {
    const dataPromises = auctionUrls.map(scrapeAuctionData);
    const allAuctionData = await Promise.all(dataPromises);
    const flattenedData = [].concat(...allAuctionData); // Flatten nested arrays
    res.json(flattenedData);
  } catch (error) {
    console.error('Error fetching auction data:', error);
    res.status(500).json({ error: 'Error fetching auction data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
