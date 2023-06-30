const express = require('express');

const router = express.Router();

const statController = require('../controllers/statisticController');

router.get('/latestQuiz/:userId/:quizId',statController.getAllStatsByQuizAndUserId);

router.get('/',statController.getAllStats);

//router.get('/:id',statController.getStatByUserId);



router.get('/quizId/:userId',statController.getMaxQuizId);

router.post('/',statController.createStat);

module.exports=router;