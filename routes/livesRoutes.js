const express = require('express');
const router = express.Router();

const livesController = require('../controllers/livesController');

router.get('/',livesController.getAllLives);

router.get('/:id',livesController.getUserLives);


router.put('/:id',livesController.increaseWithOneUserLife);

router.put('/:id/:lives',livesController.updateLivesOfUser);



module.exports = router;