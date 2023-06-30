const express = require('express');
const router = express.Router();

const genderController = require('../controllers/genderController');

router.get('/',genderController.getGenders);
router.get('/id/:id',genderController.getGenderByID);

module.exports = router;