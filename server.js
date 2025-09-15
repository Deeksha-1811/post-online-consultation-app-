const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const app = express();

//  Built-in middleware to parse JSON
app.use(express.json());

//  Security headers
app.use(helmet());

//  Enable CORS only for your frontend
app.use(cors({ origin: "http://localhost:3000" })); // change to your frontend URL

//  Logging HTTP requests
app.use(morgan("dev"));

//  Routes
app.use("/api/auth", require("./routes/auth"));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Central error handler (must be after routes)
app.use((err, req, res, next) => {
  console.error(" Error:", err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const start = async () => {
  try {
    await connectDB(); // Wait until DB connects before starting server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(" Failed to start server:", err.message);
    process.exit(1);
  }
};

start();
