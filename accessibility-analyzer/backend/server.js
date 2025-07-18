process.env.PUPPETEER_CACHE_DIR = "/opt/render/.cache/puppeteer";

const express = require('express');
const cors = require('cors');
const analyzeAccessibility = require('./analyzer');

const app = express();
const PORT = process.env.PORT || 8000;

// CORS Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Accessibility Analyzer Backend is Running');
});

// Analyze route
app.post('/analyze', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ success: false, message: 'Please provide a valid URL starting with http/https.' });
  }

  try {
    const results = await analyzeAccessibility(url);
    res.json({ success: true, results });
  } catch (error) {
    console.error('Error in /analyze:', error);
    res.status(500).json({ success: false, message: 'Failed to analyze URL.', error: error.message });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
