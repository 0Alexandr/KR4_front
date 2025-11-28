import { useState } from 'react';

function TechnologyCard({ technology, onStatusChange, onNotesChange }) {
  const { id, title, description, status, notes = '' } = technology;

  const [localNotes, setLocalNotes] = useState(notes);

  const statusConfig = {
    'not-started': { text: 'Не начато', icon: '❌', color: '#ff6b6b' },
    'in-progress': { text: 'В процессе', icon: '⏳', color: '#f7b731' },
    'completed':   { text: 'Изучено',   icon: '✅', color: '#26de81' }
  };

  const current = statusConfig[status];

  const nextStatus = () => {
    const order = ['not-started', 'in-progress', 'completed'];
    const nextIndex = (order.indexOf(status) + 1) % 3;
    onStatusChange(id, order[nextIndex]);
  };

  const handleNotesChange = (e) => {
    const value = e.target.value;
    setLocalNotes(value);
    onNotesChange(id, value);
  };

  return (
    <div
      className={`technology-card status-${status}`}
      onClick={(e) => {
        if (e.target.tagName !== 'TEXTAREA') {
          nextStatus();
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      <div className="technology-header">
        <h3>{title}</h3>
        <span className="status-badge" style={{ color: current.color }}>
          {current.icon} {current.text}
        </span>
      </div>

      <p className="technology-description">{description}</p>
      <small style={{ color: '#777', display: 'block', margin: '8px 0 12px' }}>
        Клик по карточке — сменить статус
      </small>

      {/* Заметки внутри карточки */}
      <div className="notes-section">
        <h4>Мои заметки:</h4>
        <textarea
          value={localNotes}
          onChange={handleNotesChange}
          onClick={(e) => e.stopPropagation()}
          placeholder="Записывайте сюда важные моменты, ссылки, мысли..."
          rows="4"
        />
        <div className="notes-hint">
          {localNotes.length > 0
            ? `Заметка сохранена (${localNotes.length} симв.)`
            : 'Заметок пока нет'}
        </div>
      </div>
    </div>
  );
}

export default TechnologyCard;