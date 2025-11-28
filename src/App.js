import { useState, useEffect } from 'react';
import './App.css';
import TechnologyCard from './components/TechnologyCard';
import ProgressHeader from './components/ProgressHeader';
import QuickActions from './components/QuickActions';
import FilterTabs from './components/FilterTabs';

import './components/TechnologyCard.css';
import './components/ProgressHeader.css';
import './components/QuickActions.css';
import './components/FilterTabs.css';

function App() {
  const [technologies, setTechnologies] = useState(() => {
    // Сразу пытаемся загрузить из localStorage при инициализации состояния
    const saved = localStorage.getItem('techTrackerData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Ошибка парсинга localStorage', e);
      }
    }
    // Если ничего нет — дефолтные данные
    return [
      { id: 1, title: 'React Components', description: 'Базовые компоненты', status: 'completed', notes: '' },
      { id: 2, title: 'JSX Syntax', description: 'Синтаксис JSX', status: 'completed', notes: '' },
      { id: 3, title: 'Props и состояние', description: 'Передача данных', status: 'in-progress', notes: '' },
      { id: 4, title: 'useState & useEffect', description: 'Хуки', status: 'in-progress', notes: '' },
      { id: 5, title: 'React Router', description: 'Навигация', status: 'not-started', notes: '' },
      { id: 6, title: 'Redux / Zustand', description: 'Глобальное состояние', status: 'not-started', notes: '' },
      { id: 7, title: 'TypeScript', description: 'Типизация', status: 'not-started', notes: '' },
      { id: 8, title: 'Testing (Jest)', description: 'Тестирование', status: 'not-started', notes: '' }
    ];
  });

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Сохраняем при каждом изменении
  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies));
  }, [technologies]);

  // Функции обновления
  const updateStatus = (id, newStatus) => {
    setTechnologies(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const updateTechnologyNotes = (id, newNotes) => {
    setTechnologies(prev => prev.map(t => t.id === id ? { ...t, notes: newNotes } : t));
  };

  const markAllCompleted = () => setTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));
  const resetAll = () => setTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started', notes: '' })));

  const randomNext = () => {
    const notStarted = technologies.filter(t => t.status === 'not-started');
    if (!notStarted.length) return;
    const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
    updateStatus(randomTech.id, 'in-progress');
  };

  const filteredTechs = technologies.filter(tech => {
    if (filter !== 'all' && tech.status !== filter) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return tech.title.toLowerCase().includes(q) || tech.description.toLowerCase().includes(q);
  });

  return (
    <div className="App">
      <div className="container">
        <ProgressHeader technologies={technologies} />
        <FilterTabs currentFilter={filter} onFilterChange={setFilter} />

        <div className="search-box">
          <input
            type="text"
            placeholder="Поиск по названию или описанию..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span>Найдено: {filteredTechs.length} из {technologies.length}</span>
        </div>

        <QuickActions onUpdateAll={markAllCompleted} onResetAll={resetAll} onRandomNext={randomNext} />

        <div className="technologies-list">
          {filteredTechs.map(tech => (
            <TechnologyCard
              key={tech.id}
              technology={tech}
              onStatusChange={updateStatus}
              onNotesChange={updateTechnologyNotes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;