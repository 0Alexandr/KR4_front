import './ProgressBar.css';

function ProgressBar({ progress, label = "Прогресс", color = "#4caf50" }) {
  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar-label">
        <span>{label}</span>
        <span>{progress}%</span>
      </div>
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;