// const mongoose = require('mongoose');

// const scoreSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   score: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Score', scoreSchema);


const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  score: { type: Number, required: true },
  timeTaken: { type: Number, required: true }, // Time in seconds
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Score', scoreSchema);
