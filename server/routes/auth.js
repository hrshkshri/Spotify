const bcrypt = require("bcrypt");
const router = require("express").Router();
const User = require("../models/User");
const { getToken } = require("../utils/helpers");

// Endpoint for user registration
router.post("/register", async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  // Check if user with given email already exists
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    return res.status(409).json({ message: "Email already registered" });
  }

  // Create new user object

  // Hash the password

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log(hashedPassword);

  const newUser = new User({
    username,
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  // Save user to database
  try {
    await newUser.save();
    // Generate JWT token
    const token = await getToken(email, newUser);

    // return the result to user (ie token and newUser)

    res.json({ ...newUser.toJSON(), token }); // it will return status(200) by default
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint for user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if user with given email exists
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "Email not found" });
  }

  // Compare password
  if (!user.password) {
    return res.status(500).json({ message: "User password not set" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // Generate JWT token
  const token = await getToken(user.email, user);

  // return the result to user (ie token and user)
  res.json({ ...user.toJSON(), token }); // it will return status(200) by default
});

module.exports = router;
