// src/components/TechnologyCard.jsx
import { useState } from 'react';
import './TechnologyCard.css';

function TechnologyCard({
  technology,
  displayDescription, // ← новое пропс
  onStatusChange,
  onNotesChange,
  onTitleClick,
  onDelete
}) {
  const { id, title, description, status, notes = '' } = technology;
  const [localNotes, setLocalNotes] = useState(notes);

  const statusConfig = {
    'not-started': { text: 'Не начато', icon: 'Pending', color: '#ff6b6b' },
    'in-progress': { text: 'В процессе', icon: 'In progress', color: '#f7b731' },
    'completed': { text: 'Готово', icon: 'Completed', color: '#26de81' }
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

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (window.confirm(`Удалить "${title}"?`)) {
      onDelete(id);
    }
  };

  // Используем переданное отображение описания, если есть
  const descToShow = displayDescription || description;

  return (
    <div
      className={`technology-card status-${status}`}
      onClick={(e) => {
        if (e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'BUTTON') {
          nextStatus();
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      <div className="technology-top-row">
        <span className="status-badge" style={{ color: current.color }}>
          {current.icon} {current.text}
        </span>
        <button onClick={handleDeleteClick} className="delete-btn">
          Удалить
        </button>
      </div>

      <h3 onClick={onTitleClick} className="technology-title">
        {title} →
      </h3>

      <p className="technology-description">{descToShow}</p>

      <small style={{ color: '#777', display: 'block', margin: '10px 0' }}>
        Клик по карточке — сменить статус · Клик по названию — детали
      </small>

      <div className="notes-section">
        <h4>Мои заметки:</h4>
        <textarea
          value={localNotes}
          onChange={handleNotesChange}
          onClick={(e) => e.stopPropagation()}
          placeholder="Записывайте сюда важные моменты..."
          rows="4"
        />
        <div className="notes-hint">
          {localNotes ? `Заметка сохранена (${localNotes.length} симв.)` : 'Заметок пока нет'}
        </div>
      </div>
    </div>
  );
}

export default TechnologyCard;