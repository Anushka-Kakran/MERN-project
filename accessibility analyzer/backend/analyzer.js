const puppeteer = require('puppeteer');

async function analyzeAccessibility(targetUrl) {
  console.log(`🔎 Starting accessibility analysis for: ${targetUrl}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    console.log('✅ Page loaded successfully, running axe-core analysis...');
    // your axe-core analysis code

  } catch (err) {
    console.error('❌ Puppeteer error:', err);
    throw new Error('Unable to access or analyze the URL: ' + err.message);
  } finally {
    await browser.close();
  }
}

module.exports = analyzeAccessibility;
