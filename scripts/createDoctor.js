const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

async function createDoctor() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(" MongoDB Connected...");

    const fullname = "Dr. Ramesh";
    const email = "ramesh@hospital.com";
    const password = "doctor123";

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(" Doctor already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await doctor.save();
    console.log(" Doctor created successfully:", doctor);

    process.exit();
  } catch (err) {
    console.error(" Error creating doctor:", err);
    process.exit(1);
  }
}

createDoctor();
