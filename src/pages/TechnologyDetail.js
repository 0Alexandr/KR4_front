import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TechnologyDetail({ technologies, updateStatus }) {
  const { techId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const found = technologies.find(t => t.id.toString() === techId);
    setItem(found);
  }, [techId, technologies]);

  if (!item) {
    return (
      <div className="page">
        <h1>Не найдено</h1>
        <Link to="/technologies" className="btn">← Назад</Link>
      </div>
    );
  }

  const isRecipe = item.id.toString().startsWith('recipe-');

  return (
    <div className="page">
      <div style={{ marginBottom: '20px' }}>
        <Link to="/technologies" className="back-link">← Назад к списку</Link>
      </div>

      <h1>{item.title}</h1>

      {isRecipe && item.image && (
        <div style={{ textAlign: 'center', margin: '25px 0' }}>
          <img 
            src={item.image} 
            alt={item.title}
            style={{
              maxWidth: '100%',
              width: '520px',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
              border: '4px solid white'
            }}
          />
        </div>
      )}

      {isRecipe && (item.category || item.area) && (
        <p style={{ fontSize: '1.1em', color: '#555', margin: '15px 0' }}>
          {item.category && <><strong>Категория:</strong> {item.category} </>}
          {item.area && <>| <strong>Кухня:</strong> {item.area}</>}
        </p>
      )}

      <h3 style={{ marginTop: '40px' }}>
        {isRecipe ? 'Полный рецепт' : 'Описание'}
      </h3>
      <div style={{
        background: '#f8f9fa',
        padding: '24px',
        borderRadius: '12px',
        lineHeight: '1.8',
        fontSize: '1.05em',
        border: '1px solid #eee',
        whiteSpace: 'pre-wrap',
        maxHeight: '600px',
        overflowY: 'auto'
      }}>
        {item.description || 'Описание отсутствует.'}
      </div>

      <div style={{ margin: '40px 0' }}>
        <h3>Статус {isRecipe ? 'приготовления' : 'изучения'}</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
          {['not-started', 'in-progress', 'completed'].map(s => (
            <button
              key={s}
              onClick={() => updateStatus(item.id, s)}
              style={{
                padding: '10px 20px',
                background: item.status === s ? '#1976d2' : '#f0f0f0',
                color: item.status === s ? 'white' : '#333',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              {s === 'not-started' && 'Не начато'}
              {s === 'in-progress' && 'В процессе'}
              {s === 'completed' && (isRecipe ? 'Приготовлено' : 'Изучено')}
            </button>
          ))}
        </div>
      </div>

      {item.notes && item.notes.trim() && (
        <div style={{ marginTop: '40px' }}>
          <h3>Мои заметки</h3>
          <div style={{
            background: '#e8f5e9',
            padding: '16px',
            borderRadius: '10px',
            whiteSpace: 'pre-wrap',
            borderLeft: '4px solid #4caf50'
          }}>
            {item.notes}
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnologyDetail;