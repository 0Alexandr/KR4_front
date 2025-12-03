import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TechnologyDetail({ technologies, updateStatus }) {
  const { techId } = useParams();
  const [technology, setTechnology] = useState(null);

  useEffect(() => {
    const tech = technologies.find(t => t.id === parseInt(techId));
    setTechnology(tech);
  }, [techId, technologies]);

  if (!technology) {
    return (
      <div className="page">
        <h1>Технология не найдена</h1>
        <Link to="/technologies" className="btn">← Назад</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div style={{ marginBottom: '20px' }}>
        <Link to="/technologies" className="back-link">← Назад к списку</Link>
      </div>
      <h1>{technology.title}</h1>
      <p><strong>Описание:</strong> {technology.description}</p>

      <div style={{ margin: '30px 0' }}>
        <h3>Статус изучения</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['not-started', 'in-progress', 'completed'].map(s => (
            <button
              key={s}
              onClick={() => updateStatus(technology.id, s)}
              style={{
                padding: '8px 16px',
                background: technology.status === s ? '#1976d2' : '#eee',
                color: technology.status === s ? 'white' : '#333',
                border: 'none',
                borderRadius: '6px'
              }}
            >
              {s === 'not-started' && 'Не начато'}
              {s === 'in-progress' && 'В процессе'}
              {s === 'completed' && 'Завершено'}
            </button>
          ))}
        </div>
      </div>

      {technology.notes && (
        <div>
          <h3>Мои заметки</h3>
          <p style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>{technology.notes}</p>
        </div>
      )}
    </div>
  );
}

export default TechnologyDetail;