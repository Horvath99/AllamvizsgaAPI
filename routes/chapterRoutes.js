const express = require('express');
const router = express.Router();

const chapterController = require('../controllers/chapterController');

router.get('/',chapterController.getChapterList);

router.get('/admin',chapterController.getChapterListAdmin);

router.get('/:id',chapterController.getChapterByID);

router.post('/',chapterController.createChapter);

router.put('/:id',chapterController.updateChapterById);

router.delete('/:id',chapterController.deleteChapter);



module.exports = router;