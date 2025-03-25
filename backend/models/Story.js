const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  sceneId: String,
  title: String,
  dialogue: [
    {
      character: String,
      text: String
    }
  ],
  choices: [
    {
      label: String,
      nextSceneId: String
    }
  ],
  imageURL: String
});

module.exports = mongoose.model('Story', StorySchema);
