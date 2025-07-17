const { AxePuppeteer } = require('@axe-core/puppeteer');

const isProduction = process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.NODE_ENV === 'production';
let puppeteer, chromium;

if (isProduction) {
  puppeteer = require('puppeteer-core');
  chromium = require('chrome-aws-lambda');
} else {
  puppeteer = require('puppeteer');
}

async function analyzeAccessibility(url) {
  let browser;

  try {
    console.log(`🔎 Analyzing: ${url}`);

    browser = await (isProduction
      ? puppeteer.launch({
          args: chromium.args,
          executablePath: await chromium.executablePath,
          defaultViewport: chromium.defaultViewport,
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
    console.error(`❌ Failed to analyze ${url}:`, error);
    throw new Error(`Unable to analyze ${url}: ${error.message}`);

  } finally {
    if (browser) await browser.close();
  }
}

module.exports = analyzeAccessibility;
