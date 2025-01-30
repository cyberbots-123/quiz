import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import QuizPage from './components/QuizPage/QuizPage';
import AdminPanel from './components/AdminPanel/AdminPanel'; // Import the AdminPanel component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/admin" element={<AdminPanel />} /> {/* Add the admin route */}
      </Routes>
    </Router>
  );
};

export default App;
