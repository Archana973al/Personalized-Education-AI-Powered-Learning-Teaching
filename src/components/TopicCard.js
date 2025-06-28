import Link from 'next/link'

export default function TopicCard({ topic }) {
  return (
    <Link href={`/learn/${topic.id}`} className="topic-card">
      <h3>{topic.title}</h3>
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${topic.progress}%` }}
          ></div>
        </div>
        <span>{topic.progress}%</span>
      </div>
    </Link>
  )
}