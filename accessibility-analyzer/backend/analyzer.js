const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');

async function analyzeAccessibility(url) {
  let browser;
  try {
    console.log(`🔎 Analyzing: ${url}`);

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

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
