const express = require('express');
const router = express.Router();

const difficultyController = require('../controllers/difficultyController');

router.get('/',difficultyController.getAllDiff);
router.get('/id/:id',difficultyController.getDiffById);

module.exports = router;