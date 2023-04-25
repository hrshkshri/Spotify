const router = require("express").Router();
const Song = require("../models/Song");
const passport = require("passport");

// Endpoint for creating a new song
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
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
  }
);

router.get(
  "/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      // Find all songs created by the currently logged in user
      const songs = await Song.find({ artist: req.user._id });

      // Return the songs to the client
      res.json(songs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);
router.get(
    "/artist/:artistId",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const { artistId } = req.params;
        // Find all songs created by the artist with the given ID
        const songs = await Song.find({ artist: artistId });
  
        // Return the songs to the client
        res.json(songs);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    }
  );
  
  router.get(
    "/title/:title",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        const { title } = req.params;
        // Find all songs with the given title
        const songs = await Song.find({ title: title });
  
        // Return the songs to the client
        res.json(songs);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    }
  );
  
module.exports = router;
