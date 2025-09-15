const patientService = require("../services/patientService");

// Create patient
exports.createPatient = async (req, res, next) => {
  try {
    if (!req.body.full_name || !req.body.age) {
      return res.status(400).json({ error: "full_name and age are required" });
    }
    const patient = await patientService.createPatient(req.body);
    res.status(201).json(patient);
  } catch (err) {
    next(err);
  }
};

// Get all patients with pagination & search
exports.getPatients = async (req, res, next) => {
  try {
    const result = await patientService.getPatients(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Get patient by ID
exports.getPatientById = async (req, res, next) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

// Update patient by ID
exports.updatePatient = async (req, res, next) => {
  try {
    const patient = await patientService.updatePatient(req.params.id, req.body);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  } catch (err) {
    next(err);
  }
};

// Delete patient by ID
exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await patientService.deletePatient(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    next(err);
  }
};
