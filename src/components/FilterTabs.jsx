// src/components/FilterTabs.jsx
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

function FilterTabs({ currentFilter, onFilterChange }) {
  const handleChange = (event, newFilter) => {
    if (newFilter !== null) {
      onFilterChange(newFilter);
    }
  };

  return (
    <ToggleButtonGroup
      value={currentFilter}
      exclusive
      onChange={handleChange}
      aria-label="фильтр по статусу"
      sx={{ mt: 3, mb: 2, flexWrap: 'wrap', gap: 1 }}
    >
      <ToggleButton value="all">Все</ToggleButton>
      <ToggleButton value="not-started">Не начато</ToggleButton>
      <ToggleButton value="in-progress">В процессе</ToggleButton>
      <ToggleButton value="completed">Изучено</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default FilterTabs;