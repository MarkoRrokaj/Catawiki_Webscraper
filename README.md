Catawiki Web Scraper
Overview

The Catawiki Web Scraper is a powerful Node.js-based tool designed to scrape auction data from the popular auction platform, Catawiki. The web scraper uses Puppeteer for browser automation, making it ideal for collecting auction listings, detailed item descriptions, prices, dates, and other relevant data.

This project allows users to extract auction data from Catawiki into structured JSON format. This data can be used for various purposes, such as market research, analytics, or developing auction-based services and insights.
Features

    Headless Scraping: Uses Puppeteer in headless mode for efficient scraping.
    Extract Auction Listings: Collects information from multiple auctions, including titles, descriptions, dates, and prices.
    Filter and Sort Data: Data is stored in JSON format, allowing easy filtering and sorting using other tools or scripts.
    Automated Browsing: The scraper mimics user interactions to load dynamic content (e.g., pagination and lazy-loaded items).
    Customizable: Set custom parameters to target specific auction categories or listing pages.


    Prerequisites

Before running the project, ensure that you have the following installed:

    Node.js (v14.0 or higher)
    npm (v6.0 or higher)

You’ll also need to install the required dependencies using npm.


Installing Dependencies

    Clone the repository:

    bash

git clone https://github.com/MarkoRrokaj/Catawiki_Webscraper.git
cd Catawiki_Webscraper

Install the dependencies:

bash

npm install

Install Puppeteer:

Puppeteer is a Node.js library that provides a high-level API for controlling Chrome or Chromium over the DevTools Protocol.

bash

    npm install puppeteer

Configuration

    Open the config.js file located in the src/ directory to configure the scraper according to your needs. You can set options such as:
        Start URL: The page from where the scraper will begin.
        Pagination: Enable or disable pagination to scrape multiple pages of auction listings.
        Headless Mode: Enable or disable headless mode (set to true for silent scraping).
        Timeouts and Delays: Adjust the time delays between page loads to avoid rate-limiting or blocking by the website.

    If required, you can set environment variables in the .env file for API keys or specific settings.

Running the Web Scraper

To start the scraping process, simply run:

bash

node src/scraper.js

The scraper will launch a headless browser (or a visible browser if configured) and navigate through the auction pages, collecting relevant data.
Output

The scraped data will be stored in the data/ directory as a .json file. Each auction listing will be saved with details such as:

    Auction title
    Item description
    Price (if available)
    Auction end date
    URL of the listing

Sample Output

A typical output format will look like this:

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

Customization

The web scraper can be easily customized for specific use cases:

    Scraping Additional Data: If you need to scrape additional fields, modify the DOM selectors in scraper.js to target other HTML elements on the auction page.
    Targeting Specific Categories: Modify the startURL in the configuration to scrape data from a particular auction category (e.g., "Art," "Jewelry," "Antiques").
    Error Handling: The scraper comes with basic error handling. You can extend this by adding retry logic or handling edge cases, such as CAPTCHAs.

Known Issues and Limitations

    CAPTCHA Handling: If Catawiki detects too many requests, you might encounter CAPTCHAs. The current version does not bypass CAPTCHAs.
    Rate Limiting: To avoid being blocked, adjust timeouts and delays in the configuration file.
    Dynamic Content: Some pages may load content dynamically (e.g., after scrolling). This is handled by Puppeteer, but performance may vary.

Future Enhancements

Some potential future improvements for the Catawiki Web Scraper include:

    CAPTCHA Bypassing: Implement a CAPTCHA-solving service.
    Data Export: Add functionality to export scraped data in CSV or Excel format.
    Advanced Filtering: Include options to filter listings by price range, auction end date, etc., before scraping.

Contribution Guidelines

If you would like to contribute to this project, please feel free to submit issues or pull requests. Contributions are welcome, and any feedback will be greatly appreciated.

    Fork the repository.
    Create your feature branch (git checkout -b feature-branch).
    Commit your changes (git commit -m 'Add some feature').
    Push to the branch (git push origin feature-branch).
    Open a pull request.
