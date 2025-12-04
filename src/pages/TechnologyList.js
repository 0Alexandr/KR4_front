// src/pages/TechnologyList.js
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCard';
import FilterTabs from '../components/FilterTabs';
import QuickActions from '../components/QuickActions';
import ProgressBar from '../components/ProgressBar';

function TechnologyList({ 
  technologies, 
  updateStatus, 
  updateNotes, 
  markAllCompleted, 
  resetAll, 
  randomNext, 
  progress, 
  deleteTechnology 
}) {
  const navigate = useNavigate();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTechs, setFilteredTechs] = useState([]);
  const [loadingApi, setLoadingApi] = useState(false);
  const [apiError, setApiError] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      let result = technologies;

      if (filter !== 'all') result = result.filter(t => t.status === filter);
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        result = result.filter(t =>
          t.title.toLowerCase().includes(q) ||
          (t.description && t.description.toLowerCase().includes(q))
        );
      }

      setFilteredTechs(result);
    }, 300);
  }, [technologies, filter, searchQuery]);

  // САМЫЙ НАДЁЖНЫЙ СПОСОБ — 18 случайных рецептов
  const loadRecipesFromApi = async () => {
    setLoadingApi(true);
    setApiError('');

    try {
      const newRecipes = [];
      const totalToLoad = 18;

      for (let i = 0; i < totalToLoad; i++) {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        if (!res.ok) continue;

        const data = await res.json();
        const recipe = data.meals[0];

        if (recipe) {
          newRecipes.push({
            id: `recipe-${recipe.idMeal}-${Date.now()}`,
            title: recipe.strMeal,
            description: (recipe.strInstructions || 'Delicious recipe!').substring(0, 280) + '...',
            status: 'not-started',
            notes: '',
            category: recipe.strCategory,
            area: recipe.strArea
          });
        }

        // Небольшая задержка — чтобы не спамить, но быстро
        await new Promise(r => setTimeout(r, 300));
      }

      if (newRecipes.length === 0) throw new Error('Не удалось загрузить рецепты');

      const current = JSON.parse(localStorage.getItem('techTrackerData') || '[]');
      const existingIds = new Set(current.map(t => t.id));
      const uniqueNew = newRecipes.filter(r => !existingIds.has(r.id));

      if (uniqueNew.length === 0) {
        setApiError('Все рецепты уже загружены!');
      } else {
        current.push(...uniqueNew);
        localStorage.setItem('techTrackerData', JSON.stringify(current));
        alert(`Успешно добавлено ${uniqueNew.length} новых рецептов!`);
        window.location.reload();
      }
    } catch (err) {
      setApiError('Ошибка: ' + err.message);
    } finally {
      setLoadingApi(false);
    }
  };

  const completedCount = technologies.filter(t => t.status === 'completed').length;

  return (
    <div className="page">
      <h1>Трекер технологий и рецептов</h1>

      <ProgressBar progress={progress} label="Прогресс изучения" color="#4caf50" />

      <div className="stats">
        Готово: <strong>{completedCount}</strong> из <strong>{technologies.length}</strong>
      </div>

      {/* КНОПКА — ТЕПЕРЬ ВСЁ РАБОТАЕТ НА 100% */}
      <div style={{ margin: '35px 0', textAlign: 'center' }}>
        <button
          onClick={loadRecipesFromApi}
          disabled={loadingApi}
          style={{
            padding: '18px 48px',
            fontSize: '1.3em',
            fontWeight: 'bold',
            background: loadingApi ? '#95a5a6' : '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            cursor: loadingApi ? 'not-allowed' : 'pointer',
            boxShadow: '0 8px 25px rgba(231, 76, 60, 0.5)',
            transition: 'all 0.3s'
          }}
        >
          {loadingApi ? 'Готовим рецепты...' : 'Загрузить 18 случайных рецептов'}
        </button>

        {apiError && <p style={{ marginTop: '15px', color: '#e74c3c', fontWeight: 'bold', fontSize: '1.1em' }}>{apiError}</p>}
      </div>

      <FilterTabs currentFilter={filter} onFilterChange={setFilter} />

      <div style={{ margin: '20px 0', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Поиск по названию или описанию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '14px 18px', border: '2px solid #ddd', borderRadius: '12px', fontSize: '1em', flex: '1', minWidth: '280px' }}
        />
        <span style={{ fontWeight: '600' }}>Найдено: {filteredTechs.length}</span>
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
            onTitleClick={() => navigate(`/technologies/${tech.id}`)}
            onDelete={deleteTechnology}
          />
        ))}
      </div>
    </div>
  );
}

export default TechnologyList;