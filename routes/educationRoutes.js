const express = require('express');
const router = express.Router();

const educationController = require('../controllers/educationController');

router.get('/',educationController.getEducationList);
router.get('/id/:id',educationController.getEducation);

module.exports = router;