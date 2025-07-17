const puppeteer = require('puppeteer');

(async () => {
  let browser;
  try {
    console.log('Launching browser...');

    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://example.com', { waitUntil: 'networkidle2' });

    console.log('Page loaded successfully');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed');
    }
  }
})();
