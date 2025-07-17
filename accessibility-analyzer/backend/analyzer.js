const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

async function analyzeAccessibility(url) {
  let browser;
  try {
    console.log(`🔎 Starting accessibility analysis for: ${url}`);

    const isProduction = process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.NODE_ENV === 'production';

    browser = await (isProduction
      ? require('puppeteer-core').launch({
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
    console.error('❌ Puppeteer error:', error);
    throw new Error(`Unable to access or analyze the URL: ${error.message}`);
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = analyzeAccessibility;
