const express = require('express');
const router = express.Router();

const questionController = require('../controllers/controllers');

router.get('/subject/chapter/:subject/:chapter',questionController.getQuestionListBySujectAndChapter);
router.get('/q/b/id/:id',questionController.getQuestionByID);


router.get('/',questionController.getQuestionList);
router.post('/ids',questionController.getQuestionByIds);
router.get('/admin',questionController.getAdminQuestionList);
router.get('/fromStats/:userId/:quizId',questionController.getQuestionsFromStatistics);
//router.get('/:subject',questionController.getQuestionListBySuject);


router.post('/',questionController.createQuestion);
router.put('/:id',questionController.updateQuestion);

router.delete('/:id',questionController.deleteQuestion);


module.exports = router;