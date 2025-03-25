// 📁 server/routes/image.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// POST /api/image/generate
// Expects: { prompt: "Your scene prompt here" }
router.post('/generate', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post(
      'https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image',
      {
        text_prompts: [{ text: prompt }],
        cfg_scale: 7,
        height: 512,
        width: 512,
        samples: 1,
        steps: 30,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
        },
      }
    );

    // Process the response (assuming the API returns an "artifacts" array)
    const artifact = response.data.artifacts[0];
    let imageUrl = '';
    if (artifact.base64) {
      // If the image is returned as Base64, embed it directly
      imageUrl = `data:image/png;base64,${artifact.base64}`;
    } else if (artifact.url) {
      imageUrl = artifact.url;
    }
    res.json({ imageUrl });
  } catch (error) {
    console.error('Image generation error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Image generation failed.' });
  }
});

module.exports = router;
