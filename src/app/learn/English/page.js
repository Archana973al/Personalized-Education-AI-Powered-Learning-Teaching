'use client'
import { useParams } from 'next/navigation'
import ChatInterface from '../../../components/ChatInterface'
import './styles/learn.css'

export default function LearnTopic() {
  const params = useParams()
  const topic = params.topic

  const topicData = {
    math: {
      title: 'Mathematics',
      description: 'Learn mathematical concepts from basic arithmetic to advanced calculus.',
    },
    science: {
      title: 'Science',
      description: 'Explore physics, chemistry, biology and more.',
    },
    history: {
      title: 'History',
      description: 'Discover world history and important historical events.',
    },
    programming: {
      title: 'Programming',
      description: 'Master coding skills in various programming languages.',
    }
  }

  return (
    <div className="learn-container">
      <h1>{topicData[topic]?.title || 'Topic'}</h1>
      <p>{topicData[topic]?.description || 'Learn about this topic with our AI assistant.'}</p>
      
      <div className="learning-content">
        <div className="content-section">
          <h2>Interactive Learning</h2>
          <p>Ask our AI assistant anything about {topicData[topic]?.title || 'this topic'}.</p>
          <ChatInterface topic={topic} />
        </div>
      </div>
    </div>
  )
}