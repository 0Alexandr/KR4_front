import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCard';
import FilterTabs from '../components/FilterTabs';
import QuickActions from '../components/QuickActions';
import ProgressBar from '../components/ProgressBar';
import { Box, Container, TextField, Typography, Grid, Button } from '@mui/material';

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
  const [filteredTechs, setFilteredTechs] = useState(technologies);

  useEffect(() => {
    let result = technologies;
    if (filter !== 'all') result = result.filter(t => t.status === filter);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    setFilteredTechs(result);
  }, [technologies, filter, searchQuery]);

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>Список технологий</Typography>
        <ProgressBar progress={progress} />
        <Button variant="contained" component={Link} to="/add-technology" sx={{ mb: 2 }}>
          + Добавить технологию
        </Button>
        <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
        <TextField
          label="Поиск"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Typography>Найдено: {filteredTechs.length}</Typography>
        <QuickActions onMarkAllCompleted={markAllCompleted} onResetAll={resetAll} onRandomNext={randomNext} />
        <Grid container spacing={2}>
          {filteredTechs.map(item => (
            <Grid item xs={12} md={6} key={item.id}>
              <TechnologyCard
                technology={item}
                displayDescription={item.description}
                onStatusChange={updateStatus}
                onNotesChange={updateNotes}
                onTitleClick={() => navigate(`/technologies/${item.id}`)}
                onDelete={deleteTechnology}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default TechnologyList;