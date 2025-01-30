// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend URL
//   credentials: true,
// }));
// app.use(express.json());

// // Database Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('MongoDB Connected');
// }).catch(err => {
//   console.error('Error connecting to MongoDB:', err.message);
// });

// // Logging Middleware
// app.use((req, res, next) => {
//   console.log(`Request received at ${req.path}`);
//   next();
// });

// // Routes
// app.use('/api/questions', require('./routes/questionRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/score', require('./routes/scoreRoutes'));

// // Centralized Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error', error: err.message });
// });

// // Starting Server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Logging Middleware
app.use((req, res, next) => {
  console.log(`Request received at ${req.path}`);
  next();
});

// Routes
app.use('/api/questions', require('./routes/questionRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/score', require('./routes/scoreRoutes'));

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Starting Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
