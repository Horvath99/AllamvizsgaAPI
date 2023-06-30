const express = require('express');
const router = express.Router();

const roomController = require('../controllers/roomController');

router.get('/',roomController.getRoomList);

router.get('/id/:id',roomController.getRoomByID);

router.post('/',roomController.createRoom);

router.put('/',roomController.updateQuestion);

module.exports = router;