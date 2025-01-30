// const express = require('express');
// const Score = require('../models/Score'); // Import the Score model
// const router = express.Router();

// // Fetch all scores
// router.get('/', async (req, res) => {
//   try {
//     const scores = await Score.find();
//     res.json(scores);
//   } catch (error) {
//     console.error('Error fetching scores:', error);
//     res.status(500).json({ message: 'Failed to retrieve scores' });
//   }
// });

// // Save user score
// router.post('/save', async (req, res) => {
//   const { username, email, score } = req.body;

//   // Validate input
//   if (!username || !email || score === undefined) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     // Save the score in the database
//     const newScore = new Score({ username, email, score });
//     await newScore.save();
//     res.status(201).json({ message: 'Score saved successfully.' });
//   } catch (error) {
//     console.error('Error saving score:', error);
//     res.status(500).json({ message: 'Failed to save score.' });
//   }
// });

// module.exports = router;



const express = require('express');
const Score = require('../models/Score');
const router = express.Router();

// Fetch all scores, sorted by score (desc) and timeTaken (asc)
router.get('/', async (req, res) => {
  try {
    const scores = await Score.find().sort({ score: -1, timeTaken: 1 });
    res.json(scores);
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ message: 'Failed to retrieve scores' });
  }
});

// Save user score
router.post('/save', async (req, res) => {
  const { username, email, score, timeTaken } = req.body;

  if (!username || !email || score === undefined || timeTaken === undefined) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newScore = new Score({ username, email, score, timeTaken });
    await newScore.save();
    res.status(201).json({ message: 'Score saved successfully.' });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ message: 'Failed to save score.' });
  }
});

module.exports = router;
