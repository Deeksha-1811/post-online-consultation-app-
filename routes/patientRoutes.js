const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

// Routes for /patients
router.post("/", patientController.createPatient);
router.get("/", patientController.getPatients); // supports pagination & search
router.get("/:id", patientController.getPatientById);
router.put("/:id", patientController.updatePatient);
router.delete("/:id", patientController.deletePatient);

module.exports = router;
