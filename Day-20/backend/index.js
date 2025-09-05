const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Replace YOUR_OPENWEATHERMAP_API_KEY with your actual key or set OPENWEATHERMAP_API_KEY env var
const API_KEY = process.env.OPENWEATHERMAP_API_KEY || 'YOUR_OPENWEATHERMAP_API_KEY';

app.get('/api/weather/city', async (req, res) => {
  const city = req.query.q;
  if (!city) return res.status(400).json({ error: 'Missing city parameter ?q=cityname' });
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

app.get('/api/weather/coords', async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'Missing lat or lon parameters' });
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const r = await fetch(url);
    const data = await r.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather' });
  }
});

app.listen(PORT, () => console.log(`Weather backend running on port ${PORT}`));
