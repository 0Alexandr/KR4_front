import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCard';
import FilterTabs from '../components/FilterTabs';
import QuickActions from '../components/QuickActions';
import ProgressBar from '../components/ProgressBar';
import Modal from '../components/Modal';

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      let result = technologies;

      if (filter !== 'all') {
        result = result.filter(t => t.status === filter);
      }

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

  const loadRecipesFromApi = async () => {
    setLoadingApi(true);
    setApiError('');

    try {
      const newRecipes = [];

      for (let i = 0; i < 15; i++) {
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        if (!res.ok) continue;

        const data = await res.json();
        const r = data.meals[0];

        newRecipes.push({
          id: `recipe-${r.idMeal}-${Date.now()}-${i}`,
          title: r.strMeal,
          shortDescription: (r.strInstructions || '').substring(0, 180) + '...',
          description: r.strInstructions || 'Инструкция отсутствует.',
          image: r.strMealThumb,
          category: r.strCategory,
          area: r.strArea,
          status: 'not-started',
          notes: ''
        });

        await new Promise(resolve => setTimeout(resolve, 550));
      }

      const current = JSON.parse(localStorage.getItem('techTrackerData') || '[]');
      const existingTitles = new Set(current.map(t => t.title));
      const uniqueNew = newRecipes.filter(r => !existingTitles.has(r.title));

      if (uniqueNew.length === 0) {
        setApiError('Все рецепты уже есть в списке!');
      } else {
        const updated = [...current, ...uniqueNew];
        localStorage.setItem('techTrackerData', JSON.stringify(updated));
        setModalMessage(`Добавлено ${uniqueNew.length} новых рецептов!`);
        setModalOpen(true);
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (err) {
      setApiError('Ошибка загрузки: ' + err.message);
    } finally {
      setLoadingApi(false);
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Сбросить весь прогресс?\nВсе статусы станут «Не начато», заметки очистятся.')) {
      resetAll();
      setModalMessage('Прогресс успешно сброшен!');
      setModalOpen(true);
    }
  };

  return (
    <div className="page">
      <h1>Рецепты и технологии</h1>

      <ProgressBar progress={progress} />

      <div style={{ textAlign: 'center', margin: '40px 0' }}>
        <button
          onClick={loadRecipesFromApi}
          disabled={loadingApi}
          className="btn-action"
          style={{
            padding: '18px 48px',
            fontSize: '1.3em',
            fontWeight: 'bold',
            background: loadingApi ? '#95a5a6' : '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            cursor: loadingApi ? 'not-allowed' : 'pointer',
            boxShadow: '0 8px 25px rgba(231,76,60,0.5)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => !loadingApi && (e.target.style.transform = 'translateY(-6px)')}
          onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
        >
          {loadingApi ? 'Готовим...' : 'Загрузить 15 случайных рецептов'}
        </button>

        {apiError && (
          <p style={{ color: '#e74c3c', marginTop: 15, fontWeight: 'bold' }}>
            {apiError}
          </p>
        )}
      </div>

      <div style={{ margin: '30px 0', textAlign: 'center' }}>
        <Link
          to="/add-technology"
          className="btn-action"
          style={{
            padding: '14px 28px',
            background: '#1976d2',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            display: 'inline-block'
          }}>
          + Добавить технологию
        </Link>
      </div>

      <FilterTabs currentFilter={filter} onFilterChange={setFilter} />

      <div style={{ margin: '20px 0', display: 'flex', gap: 15, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Поиск по названию или описанию..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            padding: '14px 18px',
            border: '2px solid #ddd',
            borderRadius: 12,
            fontSize: '1em',
            flex: 1,
            minWidth: 280
          }}
        />
        <span style={{ fontWeight: 600 }}>
          Найдено: {filteredTechs.length}
        </span>
      </div>

      <QuickActions
        onMarkAllCompleted={markAllCompleted}
        onResetAll={handleResetAll}
        onRandomNext={randomNext}
      />

      <div className="technologies-list">
        {filteredTechs.map(item => (
          <TechnologyCard
            key={item.id}
            technology={item}
            displayDescription={item.shortDescription || item.description}
            onStatusChange={updateStatus}
            onNotesChange={updateNotes}
            onTitleClick={() => navigate(`/technologies/${item.id}`)}
            onDelete={deleteTechnology}
          />
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Готово">
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}

export default TechnologyList;