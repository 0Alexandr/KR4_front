import { ToggleButton, ToggleButtonGroup } from '@mui/material';

function FilterTabs({ currentFilter, onFilterChange }) {
  return (
    <ToggleButtonGroup
      value={currentFilter}
      exclusive
      onChange={(e, val) => val && onFilterChange(val)}
      sx={{ mt: 3, mb: 2, flexWrap: 'wrap', gap: 1 }}
    >
      {['all', 'not-started', 'in-progress', 'completed'].map(filter => (
        <ToggleButton
          key={filter}
          value={filter}
          sx={{
            minWidth: 140,
            height: 48, // ← одинаковая высота с кнопкой "+ Добавить"
            border: '3px solid #1976d2 !important',
            borderRadius: '40px !important',
            backgroundColor: currentFilter === filter ? '#e3f2fd' : 'transparent',
            color: currentFilter === filter ? '#1976d2' : 'inherit',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#bbdefb'
            }
          }}
        >
          {filter === 'all' && 'Все'}
          {filter === 'not-started' && 'Не начато'}
          {filter === 'in-progress' && 'В процессе'}
          {filter === 'completed' && 'Изучено'}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default FilterTabs;