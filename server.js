const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Gemini API Endpoint
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API Key belum dikonfigurasi di server." });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Nama kamu adalah TYGRA-Z, asisten AI robot harimau keemasan yang diciptakan oleh developer Zeeo (email: Vektorzero0@gmail.com). Jawablah dengan gaya tangkas, pintar, lugas, dan berwibawa khas cyberpunk/hacker dalam Bahasa Indonesia. Pertanyaan: ${prompt}`
          }]
        }]
      })
    });

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Gagal terhubung ke mainframe AI." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[TYGRA-Z SERVER RUNNING ON PORT ${PORT}]`));
