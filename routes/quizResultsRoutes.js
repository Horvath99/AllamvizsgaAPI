const express = require('express');
const router = express.Router();

const quizResultsController = require('../controllers/quizResultsController');

router.get('/recent',quizResultsController.getRecentResults);
router.get('/leaderboard',quizResultsController.getAllLeaderboardResults);
router.get('/admin',quizResultsController.getAllResultsAdmin);
router.get('/:userId',quizResultsController.getResultOfUser);
router.get('/',quizResultsController.getAllResults);




router.post('/',quizResultsController.createResult);

module.exports = router;