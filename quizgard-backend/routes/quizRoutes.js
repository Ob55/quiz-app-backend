const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { getQuestions, addQuestion, deleteQuestion } = require('../controllers/quizController');

// Define routes for quiz management
router.get('/questions', authenticateToken, getQuestions);
router.post('/questions', authenticateToken, addQuestion);
router.delete('/questions/:id', authenticateToken, deleteQuestion);

module.exports = router;
