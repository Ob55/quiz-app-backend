const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Get all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Get quiz by id
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).send('Quiz not found');
    res.json(quiz);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Add a new quiz
router.post('/', async (req, res) => {
  try {
    const newQuiz = new Quiz(req.body);
    const quiz = await newQuiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).send('Bad request');
  }
});

// Update a quiz by id
router.put('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) return res.status(404).send('Quiz not found');
    res.json(quiz);
  } catch (error) {
    res.status(400).send('Bad request');
  }
});

// Delete a quiz by id
router.delete('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).send('Quiz not found');
    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
