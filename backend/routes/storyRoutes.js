const express = require('express');
const router = express.Router();
const Story = require('../models/story.js');

// Upload or update a scene
router.post('/scene', async (req, res) => {
  const { sceneId, title, dialogue, choices, imageURL } = req.body;
  try {
    const scene = await Story.findOneAndUpdate(
      { sceneId },
      { title, dialogue, choices, imageURL },
      { upsert: true, new: true }
    );
    res.json(scene);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save scene' });
  }
});

// Get scene by ID
router.get('/scene/:id', async (req, res) => {
  try {
    const scene = await Story.findOne({ sceneId: req.params.id });
    res.json(scene);
  } catch (err) {
    res.status(404).json({ error: 'Scene not found' });
  }
});

module.exports = router;