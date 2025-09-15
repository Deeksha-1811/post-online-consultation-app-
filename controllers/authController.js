// controllers/authController.js
const authService = require("../services/authService");

async function login(req, res) {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { login };
