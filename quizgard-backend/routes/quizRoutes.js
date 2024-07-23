const express = require('express');
const { getQuestions, addQuestion, deleteQuestion } = require('../controllers/quizController');

const router = express.Router();

router.get('/', getQuestions);
router.post('/', addQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
