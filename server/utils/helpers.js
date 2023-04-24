const jwt = require("jsonwebtoken");

function getToken(userId) {
  const token = jwt.sign({ identifier: userId }, process.env.JWT_SECRET);
  return token;
}

module.exports = {
  getToken,
};
