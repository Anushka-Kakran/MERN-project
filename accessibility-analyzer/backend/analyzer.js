const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');

async function analyzeAccessibility(url) {
  let browser;
  try {
    console.log(`🔎 Analyzing: ${url}`);

    // Set the path to the Chrome executable if needed
    const browserOptions = {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: process.env.CHROME_BIN || '/usr/bin/google-chrome', // Explicitly set executable path
      ignoreDefaultArgs: ['--disable-extensions'] // Often needed in server environments
    };

    // Optionally specify the executable path
    if (process.env.PUPPETEER_EXECUTABLE_PATH) {
      browserOptions.executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
    }

    browser = await puppeteer.launch(browserOptions);
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    const results = await new AxePuppeteer(page).analyze();
    return {
      passes: results.passes,
      violations: results.violations,
      incomplete: results.incomplete,
      inapplicable: results.inapplicable.slice(0, 5)
    };
  } catch (error) {
    console.error(`❌ Failed to analyze ${url}:`, error);
    throw new Error(`Unable to analyze ${url}: ${error.message}`);
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = analyzeAccessibility;
