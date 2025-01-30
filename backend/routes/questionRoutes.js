// routes/questionRoutes.js
const express = require('express');
const Question = require('../models/questionModel');

const router = express.Router();

// Get all questions with pagination
router.get('/', async (req, res) => {
  const { page = 1, limit = 15 } = req.query;

  try {
    const questions = await Question.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const totalQuestions = await Question.countDocuments();

    res.json({
      questions,
      totalQuestions,
      totalPages: Math.ceil(totalQuestions / limit),
    });
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
});

// Add a new question
router.post('/', async (req, res) => {
  const { question, options, correctAnswer } = req.body;

  const newQuestion = new Question({ question, options, correctAnswer });
  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a question by ID
router.put('/:id', async (req, res) => {
  const { question, options, correctAnswer } = req.body;

  if (!Array.isArray(options)) {
    return res.status(400).json({ message: "Options must be an array of strings" });
  }

  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      { question, options, correctAnswer },
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a question by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
