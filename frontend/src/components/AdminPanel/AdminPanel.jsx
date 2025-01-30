import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const AdminPanel = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('/api/score');
        setScores(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching scores:', error);
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const sortedScores = scores.sort((a, b) => {
    if (b.score === a.score) {
      return a.timeTaken - b.timeTaken; // Sort by time taken (ascending) if scores are equal
    }
    return b.score - a.score; // Sort by score (descending)
  });

  if (loading) {
    return <div>Loading scores...</div>;
  }

  return (
    <div className="admin-scores-container">
      <h2>User Scores</h2>
      <table className="scores-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Score</th>
            <th>Time Taken (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((score) => (
            <tr key={score._id}>
              <td>{score.username}</td>
              <td>{score.email}</td>
              <td>{score.score}</td>
              <td>{score.timeTaken}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
