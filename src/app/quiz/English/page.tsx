'use client'
import { notFound } from 'next/navigation'
import { useParams } from 'next/navigation'
import Quiz from '../../../components/Quiz'
import { QUESTIONS } from '../../../data/quizData'

export default function QuizPage() {
  const params = useParams()
  const topic = params.topic as string
  
  // Validate topic exists
  if (!QUESTIONS[topic]) {
    notFound() // This will show your 404 page
  }

  const questions = QUESTIONS[topic]

  return (
    <div className="quiz-page">
      <div className="quiz-header">
        <h1>{topic.charAt(0).toUpperCase() + topic.slice(1)} Quiz</h1>
        <p>Test your knowledge with these {questions.length} questions</p>
      </div>
      <Quiz questions={questions} topic={topic} />
    </div>
  )
}