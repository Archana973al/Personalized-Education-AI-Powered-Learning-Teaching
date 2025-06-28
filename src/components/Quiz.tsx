'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '../context/QuizContext';
import { Question, QuizResult } from '../types/quiz';

interface QuizProps {
  questions: Question[];
  topic: string;
}

export default function Quiz({ questions, topic }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { addResult } = useQuiz();
  const router = useRouter();

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;

    if (currentQuestionIndex < questions.length - 1) {
      setScore(newScore);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      const result: QuizResult = {
        score: newScore,
        totalQuestions: questions.length,
        correctAnswers: newScore,
        wrongAnswers: questions.length - newScore,
        percentage: Math.round((newScore / questions.length) * 100),
        topic,
        timestamp: new Date()
      };
      addResult(result);
      setShowResult(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <p>No questions available for this quiz.</p>
        <button 
          onClick={() => router.push(`/learn/${topic}`)} 
          className="btn btn-primary"
        >
          Back to Learning
        </button>
      </div>
    );
  }

  if (showResult) {
    const finalScore = selectedOption === currentQuestion.correctAnswer ? score + 1 : score;
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <div className="quiz-result">
        <h2>Quiz Results</h2>
        <p>Score: {finalScore}/{questions.length}</p>
        <p>Percentage: {percentage}%</p>
        <button 
          onClick={() => router.push(`/learn/${topic}`)} 
          className="btn btn-primary"
        >
          Back to Learning
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>{currentQuestion.question}</h2>
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <div 
            key={index}
            className={`option ${selectedOption === index ? 'selected' : ''}`}
            onClick={() => setSelectedOption(index)}
          >
            {option}
          </div>
        ))}
      </div>
      <button 
        onClick={handleNext} 
        className="btn btn-primary"
        disabled={selectedOption === null}
      >
        {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
      </button>
    </div>
  );
}