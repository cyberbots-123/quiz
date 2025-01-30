// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import './QuizPage.css';

// const QuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showScore, setShowScore] = useState(false);
//   const [score, setScore] = useState(0);
//   const [timer, setTimer] = useState(0);
//   const [startTime, setStartTime] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const username = new URLSearchParams(location.search).get('username');
//   const email = new URLSearchParams(location.search).get('email');

//   useEffect(() => {
//     if (!username || !email) {
//       navigate('/'); // Redirect if username or email is not provided
//       return;
//     }

//     const fetchQuestions = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('/api/questions'); // Replace with your backend API endpoint
//         if (!response.ok) {
//           throw new Error('Failed to fetch questions');
//         }
//         const data = await response.json();
//         setQuestions(data.questions); // Assuming the backend sends an array of questions in a `questions` key
//         setLoading(false);
//         setStartTime(Date.now()); // Start the timer
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [username, email, navigate]);

//   useEffect(() => {
//     let interval;
//     if (startTime) {
//       interval = setInterval(() => {
//         setTimer(Math.floor((Date.now() - startTime) / 1000)); // Timer in seconds
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [startTime]);

//   const handleOptionChange = (option) => {
//     setSelectedAnswers({
//       ...selectedAnswers,
//       [currentPage]: option,
//     });
//   };

//   const nextQuestion = () => {
//     if (currentPage < questions.length - 1) {
//       setCurrentPage(currentPage + 1);
//     } else {
//       calculateScore();
//     }
//   };

//   const calculateScore = async () => {
//     let calculatedScore = 0;
//     questions.forEach((q, index) => {
//       if (selectedAnswers[index] === q.correctAnswer) {
//         calculatedScore++;
//       }
//     });
//     setScore(calculatedScore);
//     setShowScore(true);

//     // Save the score and time to the database
//     await saveScore(calculatedScore, timer);
//   };

//   const saveScore = async (calculatedScore, timeTaken) => {
//     try {
//       const response = await fetch('/api/score/save', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username,
//           email,
//           score: calculatedScore,
//           timeTaken, // Time in seconds
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Failed to save score:', errorData.message);
//         alert('Error saving score. Please try again later.');
//       } else {
//         console.log('Score saved successfully!');
//       }
//     } catch (err) {
//       console.error('Error while saving score:', err);
//       alert('An error occurred while saving your score. Please try again.');
//     }
//   };

//   if (loading) {
//     return <div>Loading questions...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (showScore) {
//     return (
//       <div className="scorecard-container">
//         <h1>Quiz Results</h1>
//         <div className="score-details">
//           <p>
//             Well done, <strong>{username}!</strong>
//           </p>
//           <p>
//             You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>.
//           </p>
//           {/* <p>
//             Time Taken: <strong>{timer} seconds</strong>
//           </p> */}
//         </div>
//         <button onClick={() => navigate('/')}>Go to Homepage</button>
//       </div>
//     );
//   }

//   return (
//     <div className="quiz-container">
//       <header>
//         <div className="profile-info">
//           <span>{username}</span>
//           <div className="profile-icon">
//             {username ? username.charAt(0).toUpperCase() : 'P'}
//           </div>
//         </div>
//       </header>
//       <h1>Quiz</h1>
//       {questions.length > 0 && (
//         <div className="question">
//           <h3>{questions[currentPage].question}</h3>
//           <div className="options">
//             {questions[currentPage].options.map((option, optionIndex) => (
//               <label key={optionIndex}>
//                 <span>{option}</span>
//                 <input
//                   type="radio"
//                   name={`question-${currentPage}`}
//                   value={option}
//                   onChange={() => handleOptionChange(option)}
//                   checked={selectedAnswers[currentPage] === option}
//                 />
//               </label>
//             ))}
//           </div>
//         </div>
//       )}
//       <button onClick={nextQuestion}>
//         {currentPage < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
//       </button>
//     </div>
//   );
// };

// export default QuizPage;






import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './QuizPage.css';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [questionTimer, setQuestionTimer] = useState(15); // 15 sec per question

  const navigate = useNavigate();
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');
  const email = new URLSearchParams(location.search).get('email');

  useEffect(() => {
    if (!username || !email) {
      navigate('/');
      return;
    }

    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/questions'); // Backend API
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data.questions);
        setLoading(false);
        setStartTime(Date.now());
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [username, email, navigate]);

  // Global timer
  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        setTimer(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);

  // Timer for each question
  useEffect(() => {
    if (questionTimer === 0) {
      nextQuestion();
    }

    const questionInterval = setInterval(() => {
      setQuestionTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(questionInterval);
  }, [questionTimer]);

  const handleOptionChange = (option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentPage]: option,
    });
  };

  const nextQuestion = () => {
    if (currentPage < questions.length - 1) {
      setCurrentPage(currentPage + 1);
      setQuestionTimer(15); // Reset timer for the next question
    } else {
      calculateScore();
    }
  };

  const calculateScore = async () => {
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowScore(true);

    await saveScore(calculatedScore, timer);
  };

  const saveScore = async (calculatedScore, timeTaken) => {
    try {
      const response = await fetch('/api/score/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          score: calculatedScore,
          timeTaken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to save score:', errorData.message);
        alert('Error saving score. Please try again later.');
      } else {
        console.log('Score saved successfully!');
      }
    } catch (err) {
      console.error('Error while saving score:', err);
      alert('An error occurred while saving your score. Please try again.');
    }
  };

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error: {error}</div>;

  if (showScore) {
    return (
      <div className="scorecard-container">
        <h1>Quiz Results</h1>
        <div className="score-details">
          <p>Well done, <strong>{username}!</strong></p>
          <p>You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>.</p>
        </div>
        <button onClick={() => navigate('/')}>Go to Homepage</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <header>
        <div className="profile-info">
          <span>{username}</span>
          <div className="profile-icon">
            {username ? username.charAt(0).toUpperCase() : 'P'}
          </div>
        </div>
      </header>
      <h1>Quiz</h1>
      <div className="timer">Time Left: {questionTimer} sec</div>

      {questions.length > 0 && (
        <div className="question">
          <h3>{questions[currentPage].question}</h3>
          <div className="options">
            {questions[currentPage].options.map((option, index) => (
              <label key={index}>
                <span>{option}</span>
                <input
                  type="radio"
                  name={`question-${currentPage}`}
                  value={option}
                  onChange={() => handleOptionChange(option)}
                  checked={selectedAnswers[currentPage] === option}
                />
              </label>
            ))}
          </div>
        </div>
      )}

      <button onClick={nextQuestion}>
        {currentPage < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
      </button>
    </div>
  );
};

export default QuizPage;
