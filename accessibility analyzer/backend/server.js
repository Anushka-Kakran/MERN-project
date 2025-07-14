const express = require('express');
const cors = require('cors');
const { analyzeAccessibility } = require('./analyzer');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('✅ Accessibility Analyzer Backend is Running');
});

app.post('/analyze', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid URL starting with http or https',
    });
  }

  try {
    const results = await analyzeAccessibility(url);

    if (!results || !results.violations) {
      return res.status(500).json({
        success: false,
        message: 'Failed to analyze this site. It might be blocking automated access.',
      });
    }

    res.json({ success: true, results });
  } catch (error) {
    console.error('❌ Analysis error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error: unable to analyze the URL. It may be protected.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
