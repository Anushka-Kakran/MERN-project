const express = require('express');
const cors = require('cors');
const analyzeAccessibility = require('./analyzer');

const app = express();
const PORT = process.env.PORT || 8000;

// CORS Configuration
app.use(cors({
  origin: '*', // for development, allows all origins
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.send('✅ Accessibility Analyzer Backend is Running');
});

// Analyze route
app.post('/analyze', async (req, res) => {
  const { url } = req.body;
  if (!url || !url.startsWith('http')) {
    return res.status(400).json({ success: false, message: 'Please enter a valid URL' });
  }

  try {
    const results = await analyzeAccessibility(url);
    res.json({ success: true, results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to analyze URL.' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
