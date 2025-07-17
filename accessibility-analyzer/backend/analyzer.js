const { AxePuppeteer } = require('@axe-core/puppeteer');

const isProduction = process.env.AWS_LAMBDA_FUNCTION_VERSION 
  || process.env.NODE_ENV === 'production' 
  || process.env.PUPPETEER_CACHE_DIR;

let puppeteer, chromium;
if (isProduction) {
  chromium = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
} else {
  puppeteer = require('puppeteer');
}

async function analyzeAccessibility(url) {
  let browser;
  try {
    console.log(`🔎 Starting accessibility analysis for: ${url}`);

    browser = await (isProduction
      ? puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath,
          headless: chromium.headless
        })
      : puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        })
    );

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
    console.error('❌ Puppeteer error:', error && error.stack ? error.stack : error);
    throw new Error(`Unable to access or analyze the URL: ${error.message}`);
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch (closeErr) {
        console.error('❌ Error closing browser:', closeErr);
      }
    }
  }
}

module.exports = { analyzeAccessibility };
