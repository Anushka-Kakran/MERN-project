const puppeteer = require('puppeteer');

(async () => {
  try {
    console.log('Launching browser...');

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: puppeteer.executablePath()  // <-- Ensure this path points to the installed Chrome
    });

    const page = await browser.newPage();
    await page.goto('https://example.com', { waitUntil: 'networkidle2' });

    console.log('Page loaded successfully');

    await browser.close();
    console.log('Browser closed');
  } catch (error) {
    console.error('Error:', error);
  }
})();
