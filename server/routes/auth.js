// const jwt = require("jwt");
const bcrypt = require("bcrypt");
const passport = require("passport");
const router = require("express").Router();
const User = require("../models/User");
const { getToken } = require("../utils/helpers");

// Endpoint for user registration
router.post("/register", async (req, res) => {
    //
});
