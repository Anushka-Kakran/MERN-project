const puppeteer = require('puppeteer');

async function analyzeAccessibility(targetUrl) {
  console.log(`🔎 Starting accessibility analysis for: ${targetUrl}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    console.log('✅ Puppeteer launched browser successfully.');

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    console.log('✅ Page loaded successfully, running axe-core analysis...');
    
    // Return dummy success data for now to confirm Puppeteer works
    return { message: "Puppeteer launched and page loaded successfully" };

  } catch (err) {
    console.error('❌ Puppeteer error:', err);
    throw new Error('Unable to access or analyze the URL: ' + err.message);
  } finally {
    if (browser) {
      await browser.close();
      console.log('✅ Browser closed.');
    }
  }
}

module.exports = analyzeAccessibility;
