const express = require('express');
const router = express.Router();

const subjectController = require('../controllers/subjectController');

router.get('/',subjectController.getSubjectList);

router.get('/:id',subjectController.getSubjectByID);

router.post('/',subjectController.createSubject);

router.put('/:id',subjectController.updateSubjectById);

router.delete('/:id',subjectController.deleteSubject);



module.exports = router;