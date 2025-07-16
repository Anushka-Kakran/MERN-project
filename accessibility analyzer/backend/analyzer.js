const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

async function analyzeAccessibility(url) {
  let browser;

  try {
    console.log(`🔎 Starting accessibility analysis for: ${url}`);

    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      executablePath: puppeteer.executablePath()   // ✅ Add this line
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    console.log('✅ Page loaded successfully, running axe-core analysis...');

    const rawResults = await new AxePuppeteer(page).analyze();

    const filteredResults = {
      passes: rawResults.passes,
      violations: rawResults.violations,
      incomplete: rawResults.incomplete,
      inapplicable: rawResults.inapplicable.slice(0, 5)
    };

    console.log('✅ Accessibility analysis completed successfully.');

    return filteredResults;

  } catch (error) {
    console.error(`❌ Failed analyzing URL: ${url}`);
    console.error('❌ Puppeteer error:', error.message);
    console.error('❌ Full error details:', error);
    throw new Error(`Unable to access or analyze the URL: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
      console.log('🛑 Browser instance closed.');
    }
  }
}

module.exports = { analyzeAccessibility };
