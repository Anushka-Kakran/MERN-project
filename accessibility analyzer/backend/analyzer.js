const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

async function analyzeAccessibility(url) {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      timeout: 30000, 
    });

    const page = await browser.newPage();

    // Set a custom user-agent to reduce blocking
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Inject and run axe-core
    const rawResults = await new AxePuppeteer(page).analyze();

    // OPTIONAL: Log inapplicable rules for debugging
    rawResults.inapplicable.forEach(rule => {
      console.log(`Inapplicable Rule: ${rule.id} - ${rule.description}`);
    });

    // Optionally filter or limit inapplicable to top 5
    const filteredResults = {
      passes: rawResults.passes,
      violations: rawResults.violations,
      incomplete: rawResults.incomplete,
      inapplicable: rawResults.inapplicable.slice(0, 5) // Only first 5 inapplicable rules
    };

    return filteredResults;

  } catch (error) {
    console.error('❌ Puppeteer error:', error.message);
    throw new Error('Unable to access or analyze the URL.');
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = { analyzeAccessibility };
