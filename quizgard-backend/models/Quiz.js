const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
  answer: { type: String, required: true },
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
