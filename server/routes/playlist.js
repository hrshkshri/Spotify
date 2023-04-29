const router = require("express").Router();
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const Song = require("../models/Song");
const passport = require("passport");

// Endpoint for creating a new playlist
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;
      const { name, imgUrl, songs } = req.body;
      if (!name || !imgUrl || !songs) {
        return res.status(301).json({ err: "Insufficient data" });
      }
      const playlistData = {
        name,
        imgUrl,
        songs,
        creator: currentUser._id,
        collaborators: [],
      };
      const playlist = await Playlist.create(playlistData);
      return res.status(200).json(playlist);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Endpoint for getting all playlists
router.get("/", async (req, res) => {
  try {
    // Find all playlists in the database
    const playlists = await Playlist.find();

    // Return the playlists to the client
    res.json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint for getting a single playlist by ID
router.get(
  "/playlist/:playlistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const playlistId = req.params.playlistId;
      const playlist = await Playlist.findOne({ _id: playlistId });
      if (!playlist) {
        return res.status(301).json({ err: "Invalid ID" });
      }
      return res.status(200).json(playlist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Endpoint for getting playlists of artist
router.get(
  "/artist/:artistId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const artistId = req.params.artistId;

      const artist = await User.findOne({ _id: artistId });
      if (!artist) {
        return res.status(304).json({ err: "Invalid Artist ID" });
      }

      const playlists = await Playlist.find({ creator: artistId });
      return res.status(200).json({ data: playlists });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Endpoint to add song to the playlist
router.post(
  "/add/song",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;
      const { playlistId, songId } = req.body;
      // Step 0: Get the playlist if valid
      const playlist = await Playlist.findOne({ _id: playlistId });
      if (!playlist) {
        return res.status(304).json({ err: "Playlist does not exist" });
      }

      // Step 1: Check if currentUser owns the playlist or is a collaborator
      if (
        !playlist.creator.equals(currentUser._id) &&
        !playlist.collaborators.includes(currentUser._id)
      ) {
        return res.status(400).json({ err: "Not allowed" });
      }
      // Step 2: Check if the song is a valid song
      const song = await Song.findOne({ _id: songId });
      if (!song) {
        return res.status(304).json({ err: "Song does not exist" });
      }

      // Step 3: We can now simply add the song to the playlist
      playlist.songs.push(songId);
      await playlist.save();

      return res.status(200).json(playlist);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ err: "Internal Server Error" });
    }
  }
);

// DELETE route for deleting a playlist
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const playlistId = req.params.id;
      const playlist = await Playlist.findById(playlistId);

      if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
      }

      // Check if the currently authenticated user is the owner of the playlist
      if (playlist.user.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this playlist" });
      }

      await playlist.remove();

      res.json({ message: "Playlist deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
