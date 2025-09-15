require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const patientRoutes = require("./routes/patientRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet()); // security headers
app.use(cors());   // allow all origins; can restrict in production
app.use(morgan("combined")); // logging
app.use(express.json());     // parse JSON

// Routes
app.use("/patients", patientRoutes);

// Root route
app.get("/", (req, res) => res.send("Server is running!"));

// Error middleware
app.use(errorHandler);

app.all(/.*/, (req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
