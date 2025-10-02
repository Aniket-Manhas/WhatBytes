const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { assignDoctor, getMappings, getMappingsByPatient, removeMapping } = require('../controllers/mappingController');

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', assignDoctor);
router.get('/', getMappings);
router.get('/:patientId', getMappingsByPatient);
router.delete('/:id', removeMapping);

module.exports = router;
