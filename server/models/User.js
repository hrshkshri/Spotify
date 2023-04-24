const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // likedSongs: {
  //   //we will change
  //   default: "",
  // },
  // likedPlaylists: {
  //   //we will change
  //   default: "",
  // },
  // subcribedArtist: {
  //   default: "",
  // },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
