const express = require('express');
const router = express.Router();

const playerController = require('../controllers/onlinePlayersController');

router.get('/',playerController.getPlayersList);

router.get('/roomId/:id',playerController.getPlayerById);

router.post('/',playerController.createPlayer);

module.exports = router;