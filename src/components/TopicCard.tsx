'use client'
import Link from 'next/link'

interface Topic {
  id: string
  title: string
  progress?: number
}

export default function TopicCard({ topic }: { topic: Topic }) {
  return (
    <div className="topic-card">
      <h3>{topic.title}</h3>
      {topic.progress !== undefined && (
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${topic.progress}%` }}
            ></div>
          </div>
          <span>{topic.progress}%</span>
        </div>
      )}
      <div className="topic-actions">
        <Link href={`/learn/${topic.id}`} className="btn btn-primary">
          Learn
        </Link>
        <Link href={`/quiz/${topic.id}`} className="btn btn-secondary">
          Take Quiz
        </Link>
      </div>
    </div>
  )
}