import ProgressBar from '../components/ProgressBar';

function Statistics({ technologies, progress }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;

  // Округляем точно так же, как в useTechnologies.js
  const percentCompleted = total > 0 ? Math.round((completed / total) * 100) : 0;
  const percentInProgress = total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const percentNotStarted = total > 0 ? Math.round((notStarted / total) * 100) : 0;

  return (
    <div className="page">
      <h1>Статистика прогресса</h1>

      {/* Главный прогресс — как и везде */}
      <ProgressBar progress={progress} label="Общий прогресс" color="#4caf50" />

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Распределение по статусам</h2>

        <ProgressBar
          progress={percentCompleted}
          label={`Изучено (${completed})`}
          color="#26de81"
        />
        <ProgressBar
          progress={percentInProgress}
          label={`В процессе (${inProgress})`}
          color="#f7b731"
        />
        <ProgressBar
          progress={percentNotStarted}
          label={`Не начато (${notStarted})`}
          color="#ff6b6b"
        />
      </div>

      <p style={{
        marginTop: '30px',
        fontSize: '1.2em',
        color: '#555',
        textAlign: 'center'
      }}>
        Всего технологий: <strong>{total}</strong>
      </p>
    </div>
  );
}

export default Statistics;