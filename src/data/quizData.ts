import { Question } from '../types/quiz'

export const QUESTIONS: Record<string, Question[]> = {
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
  science: [
    {
      id: '1',
      question: 'What is the chemical symbol for water?',
      options: ['H2O', 'CO2', 'NaCl', 'O2'],
      correctAnswer: 0,
      topic: 'science',
      explanation: 'Water is composed of two hydrogen atoms and one oxygen atom'
    },
    // Add more science questions...
  ]
}