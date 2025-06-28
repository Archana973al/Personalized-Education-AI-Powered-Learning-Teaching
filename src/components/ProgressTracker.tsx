'use client'
import { useQuiz } from '../context/QuizContext';

export default function ProgressTracker() {
  const { results } = useQuiz();

  const getTopicProgress = (topic: string) => {
    const topicResults = results.filter(r => r.topic === topic);
    if (topicResults.length === 0) return 0;
    const avgScore = topicResults.reduce((sum, result) => sum + result.percentage, 0) / topicResults.length;
    return Math.round(avgScore);
  };

  return (
    <div className="progress-tracker">
      <h3>Your Learning Progress</h3>
      <div className="topics-progress">
        <div className="topic-progress">
          <span>Mathematics</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${getTopicProgress('math')}%` }}
            ></div>
          </div>
          <span>{getTopicProgress('math')}%</span>
        </div>
        {/* Add other topics similarly */}
      </div>
    </div>
  );
}