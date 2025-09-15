// routes/auth.js
const express = require("express");
const { check } = require("express-validator");
const { validate } = require("../middleware/validate");
const authController = require("../controllers/authController");

const router = express.Router();

module.exports = router;
