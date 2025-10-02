const Patient = require('../models/Patient');

// Add new patient
const addPatient = async (req, res) => {
  try {
    const { name, age, gender, address, phone } = req.body;
    if (!name || !age || !gender) {
      return res.status(400).json({ error: 'Name, age, and gender are required' });
    }

    const patient = await Patient.create({
      name,
      age,
      gender,
      address,
      phone,
      userId: req.user.id,
    });

    res.status(201).json({ message: 'Patient added successfully', patient });
  } catch (error) {
    console.error('Add patient error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all patients for the authenticated user
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({ where: { userId: req.user.id } });
    res.json(patients);
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get patient by ID
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    console.error('Get patient by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update patient
const updatePatient = async (req, res) => {
  try {
    const { name, age, gender, address, phone } = req.body;
    const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    await patient.update({ name, age, gender, address, phone });
    res.json({ message: 'Patient updated successfully', patient });
  } catch (error) {
    console.error('Update patient error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete patient
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    await patient.destroy();
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Delete patient error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addPatient, getPatients, getPatientById, updatePatient, deletePatient };
