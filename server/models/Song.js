const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  album: {
    type: String,
  },
  duration: {
    type: Number,
    // required: true,
  },
  genre: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  audioUrl: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
