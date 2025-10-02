const Doctor = require('../models/Doctor');

// Add new doctor
const addDoctor = async (req, res) => {
  try {
    const { name, specialty, phone, email } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const doctor = await Doctor.create({ name, specialty, phone, email });
    res.status(201).json({ message: 'Doctor added successfully', doctor });
  } catch (error) {
    console.error('Add doctor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    console.error('Get doctor by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update doctor
const updateDoctor = async (req, res) => {
  try {
    const { name, specialty, phone, email } = req.body;
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    await doctor.update({ name, specialty, phone, email });
    res.json({ message: 'Doctor updated successfully', doctor });
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete doctor
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    await doctor.destroy();
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor };
