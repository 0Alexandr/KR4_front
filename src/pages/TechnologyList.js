import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCard';
import FilterTabs from '../components/FilterTabs';
import QuickActions from '../components/QuickActions';
import ProgressBar from '../components/ProgressBar';

function TechnologyList({ technologies, updateStatus, updateNotes, markAllCompleted, resetAll, randomNext, progress, addTechnology,
    deleteTechnology }) {
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    const filteredTechs = technologies.filter(tech => {
        if (filter !== 'all' && tech.status !== filter) return false;
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return tech.title.toLowerCase().includes(q) || tech.description.toLowerCase().includes(q);
    });

    const completedCount = technologies.filter(t => t.status === 'completed').length;

    return (
        <div className="page">
            <h1>Список технологий</h1>
            <ProgressBar progress={progress} label="Общий прогресс изучения" color="#4caf50" />
            <div className="stats">
                Изучено: <strong>{completedCount}</strong> из <strong>{technologies.length}</strong>
            </div>

            <FilterTabs currentFilter={filter} onFilterChange={setFilter} />

            <div style={{ margin: '20px 0', display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ padding: '12px 16px', border: '2px solid #ddd', borderRadius: '10px', fontSize: '1em', flex: '1', minWidth: '260px' }}
                />
                <span>Найдено: {filteredTechs.length}</span>
            </div>

            <QuickActions
                onMarkAllCompleted={markAllCompleted}
                onResetAll={resetAll}
                onRandomNext={randomNext}
                technologies={technologies}
            />
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