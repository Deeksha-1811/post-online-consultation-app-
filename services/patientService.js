const Patient = require("../models/Patient");

// Create patient
exports.createPatient = async (data) => {
  try {
    const lastPatient = await Patient.findOne().sort({ id: -1 });
    data.id = lastPatient ? lastPatient.id + 1 : 1;
    return await Patient.create(data);
  } catch (err) {
    throw new Error("Failed to create patient: " + err.message);
  }
};

// Get all patients with pagination & search
exports.getPatients = async (query) => {
  try {
    let { page = 1, limit = 10, search = "" } = query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = search
      ? { full_name: { $regex: search, $options: "i" } }
      : {};

    const patients = await Patient.find(filter)
      .sort({ id: 1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Patient.countDocuments(filter);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      patients,
    };
  } catch (err) {
    throw new Error("Failed to fetch patients: " + err.message);
  }
};

// Get patient by ID
exports.getPatientById = async (id) => {
  try {
    return await Patient.findOne({ id });
  } catch (err) {
    throw new Error(`Failed to fetch patient with id ${id}: ` + err.message);
  }
};

// Update patient by ID
exports.updatePatient = async (id, data) => {
  try {
    return await Patient.findOneAndUpdate({ id }, data, { new: true });
  } catch (err) {
    throw new Error(`Failed to update patient with id ${id}: ` + err.message);
  }
};

// Delete patient by ID
exports.deletePatient = async (id) => {
  try {
    return await Patient.findOneAndDelete({ id });
  } catch (err) {
    throw new Error(`Failed to delete patient with id ${id}: ` + err.message);
  }
};
