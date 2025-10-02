const PatientDoctor = require('../models/PatientDoctor');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Assign doctor to patient
const assignDoctor = async (req, res) => {
  try {
    const { patientId, doctorId } = req.body;
    if (!patientId || !doctorId) {
      return res.status(400).json({ error: 'Patient ID and Doctor ID are required' });
    }

    // Check if patient belongs to user
    const patient = await Patient.findOne({ where: { id: patientId, userId: req.user.id } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found or not owned by user' });
    }

    // Check if doctor exists
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    // Check if mapping already exists
    const existing = await PatientDoctor.findOne({ where: { patientId, doctorId } });
    if (existing) {
      return res.status(400).json({ error: 'Mapping already exists' });
    }

    const mapping = await PatientDoctor.create({ patientId, doctorId });
    res.status(201).json({ message: 'Doctor assigned to patient successfully', mapping });
  } catch (error) {
    console.error('Assign doctor error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all mappings
const getMappings = async (req, res) => {
  try {
    const patients = await Patient.findAll({ where: { userId: req.user.id }, attributes: ['id'] });
    const patientIds = patients.map(p => p.id);
    if (patientIds.length === 0) {
      return res.json([]);
    }
    const mappings = await PatientDoctor.findAll({
      where: { patientId: patientIds },
      include: [
        { model: Patient, attributes: ['id', 'name'] },
        { model: Doctor, attributes: ['id', 'name', 'specialty'] },
      ],
    });
    res.json(mappings);
  } catch (error) {
    console.error('Get mappings error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get doctors for a specific patient
const getMappingsByPatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({ where: { id: req.params.patientId, userId: req.user.id } });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const mappings = await PatientDoctor.findAll({
      where: { patientId: req.params.patientId },
      include: [{ model: Doctor, attributes: ['id', 'name', 'specialty'] }],
    });
    res.json(mappings);
  } catch (error) {
    console.error('Get mappings by patient error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Remove doctor from patient
const removeMapping = async (req, res) => {
  try {
    const mapping = await PatientDoctor.findByPk(req.params.id);
    if (!mapping) {
      return res.status(404).json({ error: 'Mapping not found' });
    }

    // Check if patient belongs to user
    const patient = await Patient.findOne({ where: { id: mapping.patientId, userId: req.user.id } });
    if (!patient) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await mapping.destroy();
    res.json({ message: 'Mapping removed successfully' });
  } catch (error) {
    console.error('Remove mapping error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { assignDoctor, getMappings, getMappingsByPatient, removeMapping };
