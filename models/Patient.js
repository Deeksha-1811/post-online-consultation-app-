const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },           // Auto-increment handled in service
  user_id: { type: String, required: true, trim: true },        // Trim spaces
  full_name: { type: String, required: true, trim: true },      // Trim spaces
  gender: { type: String, enum: ["M", "F", "Other"], required: true },
  age: { type: Number, required: true },
  phone_number: { 
    type: String, 
    required: true, 
    trim: true, 
    match: /^[0-9]{10}$/ // Validates 10-digit numbers
  },
  address: { type: String, required: true, trim: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Patient", patientSchema);
