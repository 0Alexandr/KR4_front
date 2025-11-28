import React, { useState } from 'react';
import useTechnologies from './hooks/useTechnologies';
import ProgressBar from './components/ProgressBar';
import QuickActions from './components/QuickActions';
import TechnologyCard from './components/TechnologyCard';
import FilterTabs from './components/FilterTabs';

import './App.css';                          // глобальные стили
import './components/Header.css';            // фиолетовая шапка
import './components/ProgressBar.css';       // прогресс-бар
import './components/QuickActions.css';      // быстрые действия
import './components/Modal.css';             // модалка
import './components/TechnologyCard.css';    // ← САМОЕ ГЛАВНОЕ! Карточки
import './components/FilterTabs.css';        // ← Кнопки фильтров (Все / Не начато и т.д.)

function App() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    markAllCompleted,
    resetAll,
    randomNext,
    progress
  } = useTechnologies();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTechs = technologies.filter(tech => {
    if (filter !== 'all' && tech.status !== filter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return tech.title.toLowerCase().includes(q) || tech.description.toLowerCase().includes(q);
  });

  const completedCount = technologies.filter(t => t.status === 'completed').length;

  return (
    <div className="App">
      {/* Фиолетовая шапка */}
      <div className="tech-header">
        <h1>Дорожная карта изучения технологий</h1>
        <div className="progress-wrapper">
          <ProgressBar progress={progress} label="Общий прогресс изучения" color="#4caf50" />
        </div>
        <div className="stats">
          Изучено: <strong>{completedCount}</strong> из <strong>{technologies.length}</strong>
        </div>
      </div>

      <div className="container">
        <FilterTabs currentFilter={filter} onFilterChange={setFilter} />

        <div style={{ margin: '20px 0', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '12px 16px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '1em', flex: '1', minWidth: '260px' }}
          />
          <span style={{ color: '#555', fontWeight: '600' }}>
            Найдено: {filteredTechs.length} из {technologies.length}
          </span>
        </div>

        <QuickActions
          onMarkAllCompleted={markAllCompleted}
          onResetAll={resetAll}
          onRandomNext={randomNext}
          technologies={technologies}
        />

        <div className="technologies-list">
          {filteredTechs.map(tech => (
            <TechnologyCard
              key={tech.id}
              technology={tech}
              onStatusChange={updateStatus}
              onNotesChange={updateNotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;