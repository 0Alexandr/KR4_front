function FilterTabs({ currentFilter, onFilterChange }) {
  const filters = [
    { key: 'all', label: 'Все' },
    { key: 'not-started', label: 'Не начато' },
    { key: 'in-progress', label: 'В процессе' },
    { key: 'completed', label: 'Изучено' }
  ];

  return (
    <div className="filter-tabs">
      {filters.map(f => (
        <button
          key={f.key}
          className={currentFilter === f.key ? 'active' : ''}
          onClick={() => onFilterChange(f.key)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default FilterTabs;