const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("./models/User");

const app = express();

mongoose
  .connect(
    "mongodb+srv://spotify:" +
      process.env.MONGO_PASSWORD +
      "@cluster0.ubxitiz.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// passport-jwt setup
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};
 
passport.use(
  new Strategy(options, async (payload, done) => {
    try {
      // Find the user associated with the token
      const user = await User.findById(payload.id);

      // If user not found, return null
      if (!user) {
        return done(null, false);
      }

      // Otherwise, return the user
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
