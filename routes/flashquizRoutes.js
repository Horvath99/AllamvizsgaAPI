const express = require('express');
const router = express.Router();

const flashquizController = require('../controllers/flashQuizController');

router.get('/',flashquizController.getFlashQuizList);

router.get('/id/:id',flashquizController.getFlashQuizById);

router.post('/',flashquizController.createNewFlashQuiz);

router.delete('/',flashquizController.deleteFlashQuiz);

module.exports = router;