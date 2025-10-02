const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { addDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctorController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', addDoctor);
router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);

module.exports = router;
