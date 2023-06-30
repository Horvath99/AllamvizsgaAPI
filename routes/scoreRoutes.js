const express = require('express');
const router = express.Router();

const scoreController = require('../controllers/scoreController');

router.get('/',scoreController.getScoreList);

router.get('/roomId/:roomId',scoreController.getScoreByRoom);

router.get('/playerId/:playerId',scoreController.getScoreById);

router.post('/',scoreController.createScore);

router.put('/score1/score2/roomId/:score1/:score2/:roomId',scoreController.updateScore);

module.exports = router;