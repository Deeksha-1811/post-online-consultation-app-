const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey123";

async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  //  sanitize user object (remove password before sending response)
  const userObj = user.toObject();
  delete userObj.password;

  return { message: "Login successful", token, user: userObj };
}

module.exports = { loginUser };
