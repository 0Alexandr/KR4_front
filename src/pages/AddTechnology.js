import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTechnology({ addTechnology }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Заполните название и описание!');
      return;
    }

    addTechnology({
      title: title.trim(),
      description: description.trim(),
    });

    // Очищаем форму и возвращаемся в список
    setTitle('');
    setDescription('');
    navigate('/technologies');
  };

  return (
    <div className="page">
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => navigate('/technologies')}
          className="back-link"
          style={{ background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', fontSize: '1em' }}
        >
          ← Назад к списку
        </button>
      </div>

      <h1>Добавить новую технологию</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Название технологии
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Например: GraphQL"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '1em',
              border: '2px solid #ddd',
              borderRadius: '10px',
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
            Описание
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Краткое описание, зачем изучать..."
            rows="5"
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '1em',
              border: '2px solid #ddd',
              borderRadius: '10px',
              resize: 'vertical',
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: '14px 32px',
            background: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1.1em',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Добавить технологию
        </button>
      </form>
    </div>
  );
}

export default AddTechnology;