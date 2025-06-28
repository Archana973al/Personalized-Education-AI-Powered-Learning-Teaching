'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import { QuizResult } from '../types/quiz';

interface QuizContextType {
  results: QuizResult[];
  addResult: (result: QuizResult) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

export function QuizProvider({ children }: QuizProviderProps) {
  const [results, setResults] = useState<QuizResult[]>([]);

  const addResult = (result: QuizResult) => {
    setResults(prev => [...prev, result]);
  };

  const resetQuiz = () => {
    setResults([]);
  };

  return (
    <QuizContext.Provider value={{ results, addResult, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}