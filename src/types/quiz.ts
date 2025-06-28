export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  topic: string;
  explanation: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
  topic: string;
  timestamp: Date;
}

// Define a type for the questions object
export type QuestionsByTopic = {
  [topic: string]: Question[];
};

// Sample questions data
export const QUESTIONS: QuestionsByTopic = {
  math: [
    {
      id: '1',
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      topic: 'math',
      explanation: 'Basic addition'
    },
    // Add more math questions...
  ],
  english: [
    {
      id: '1',
      question: 'Which is a noun?',
      options: ['Run', 'Beautiful', 'Dog', 'Quickly'],
      correctAnswer: 2,
      topic: 'english',
      explanation: 'Dog is a person, place or thing'
    },
    // Add more english questions...
  ]
  // Add other topics...
};