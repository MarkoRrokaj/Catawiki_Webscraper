# Catawiki Web Scraper
## Overview

The Catawiki Web Scraper is a powerful Node.js-based tool designed to scrape auction data from the popular auction platform, Catawiki. The scraper uses Puppeteer for browser automation, making it ideal for collecting auction listings, detailed item descriptions, prices, dates, and other relevant data.

This tool allows users to extract auction data into structured JSON format, which can be used for market research, analytics, or to develop auction-based insights and services.
Features

    Headless Scraping: Uses Puppeteer in headless mode for efficient scraping.
    Auction Data Extraction: Scrapes auction titles, descriptions, prices, dates, and URLs.
    JSON Output: Stores data in JSON format for easy filtering and analysis.
    Customizable: Set custom parameters to scrape specific auction categories or listings.
    Automated Pagination: Handles multiple pages automatically.

## Prerequisites

Before running the project, ensure you have the following installed:

    Node.js (v14.0 or higher)
    npm (v6.0 or higher)

Installing Dependencies

    Clone the repository:

    bash

git clone https://github.com/MarkoRrokaj/Catawiki_Webscraper.git
cd Catawiki_Webscraper

Install the necessary dependencies:

bash

npm install

Install Puppeteer:

bash

    npm install puppeteer

## Configuration

To configure the scraper:

    Open the config.js file located in the src/ directory.
    Customize the following options based on your requirements:
        Start URL: The page where the scraper will begin scraping.
        Pagination: Enable or disable pagination to scrape multiple pages of listings.
        Headless Mode: Enable or disable headless mode for the browser.
        Timeouts: Adjust delays between requests to avoid rate-limiting or blocking.

If needed, set environment variables in the .env file (e.g., for API keys).
Running the Web Scraper

To run the scraper, execute the following command:

bash

node src/scraper.js

The scraper will launch a browser (in headless or visible mode, based on configuration) and start collecting auction data. The scraped data will be saved in the data/ directory in JSON format.
Sample Output

The output JSON format will look like this:

json

[
  {
    "title": "Antique Bronze Statue",
    "description": "A rare bronze statue from the 18th century...",
    "price": "€1200",
    "date": "2023-12-01",
    "url": "https://www.catawiki.com/l/123456-antique-bronze-statue"
  },
  {
    "title": "Vintage Watch",
    "description": "Classic vintage watch from the 1950s...",
    "price": "€800",
    "date": "2023-12-05",
    "url": "https://www.catawiki.com/l/123457-vintage-watch"
  }
]

## Customization

    Additional Fields: Modify scraper.js to scrape additional data fields by adjusting the DOM selectors.
    Specific Categories: Adjust the startURL in config.js to scrape data from specific auction categories (e.g., "Art," "Jewelry").
    Error Handling: The scraper includes basic error handling. You can extend it to handle edge cases like CAPTCHAs or timeouts.

## Known Issues and Limitations

    CAPTCHA Handling: The scraper cannot bypass CAPTCHAs.
    Rate Limiting: To avoid rate-limiting or being blocked, adjust the delay settings in config.js.
    Dynamic Content: Some pages load content dynamically, which Puppeteer handles, though performance may vary.

## Future Enhancements

    CAPTCHA Bypassing: Implement CAPTCHA-solving capabilities.
    Data Export: Add options to export data in CSV or Excel formats.
    Advanced Filtering: Enable filtering by price range, auction end date, or category prior to scraping.
