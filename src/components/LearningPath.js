export default function LearningPath({ progress }) {
  return (
    <div className="learning-path">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="progress-text">{progress}% completed</p>
    </div>
  )
}