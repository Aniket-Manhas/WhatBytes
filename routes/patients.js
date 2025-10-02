const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { addPatient, getPatients, getPatientById, updatePatient, deletePatient } = require('../controllers/patientController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', addPatient);
router.get('/', getPatients);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);

module.exports = router;
