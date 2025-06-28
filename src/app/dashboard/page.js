'use client'
import { useAuth } from '../../context/AuthContext'
import { useQuiz } from '../../context/QuizContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import LearningPath from '../../components/LearningPath'
import TopicCard from '../../components/TopicCard'
import ProgressTracker from '../../components/ProgressTracker'
import '../../styles/dashboard.css'
import '../../styles/quiz.css'

export default function Dashboard() {
  const { user, loading, logout } = useAuth()
  const { results } = useQuiz()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user) {
    return <div className="loading">Loading...</div>
  }

  const topics = [
    { id: 'math', title: 'Mathematics', progress: 65 },
    { id: 'science', title: 'Science', progress: 40 },
    { id: 'history', title: 'History', progress: 20 },
    { id: 'programming', title: 'Programming', progress: 85 },
  ]

  // Get recent quiz results
  const recentResults = results.slice(0, 2).map(result => ({
    topic: result.topic,
    score: result.percentage,
    timestamp: new Date(result.timestamp).toLocaleTimeString()
  }))

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user.email}</h1>
          <p className="welcome-message">Continue your learning journey</p>
        </div>
        <button onClick={logout} className="btn btn-secondary">
          Logout
        </button>
      </div>
      
      <div className="dashboard-content">
        <div className="left-panel">
          <div className="learning-progress">
            <h2>Your Learning Progress</h2>
            <LearningPath progress={65} />
          </div>
          
          <div className="progress-tracker-container">
            <ProgressTracker />
          </div>
        </div>
        
        <div className="right-panel">
          <div className="topics-section">
            <h2>Recommended Topics</h2>
            <div className="topics-grid">
              {topics.map(topic => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
          
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentResults.length > 0 ? (
                recentResults.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <span>Completed {activity.topic} Quiz</span>
                    <span className="activity-score">{activity.score}%</span>
                  </div>
                ))
              ) : (
                <p>No recent activity</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}