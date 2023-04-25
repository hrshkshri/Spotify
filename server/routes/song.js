const router = require("express").Router();
const Song = require("../models/Song");
const passport = require("passport");

// Endpoint for creating a new song
router.post("/create", passport.authenticate("user"), async (req, res) => {
  try {
    // Create a new song object from request body
    const { title, imgUrl, audioUrl } = req.body;
    const artist = req.user._id;
    const createdSong = new Song({
      title,
      artist,
      imgUrl,
      audioUrl,
    });

    // Save the new song to the database
    await createdSong.save();

    // Return the new song object to the client
    res.json(createdSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error or insufficient details" });
  }
});

module.exports = router;
