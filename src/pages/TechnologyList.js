import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TechnologyCard from '../components/TechnologyCard';
import FilterTabs from '../components/FilterTabs';
import QuickActions from '../components/QuickActions';
import ProgressBar from '../components/ProgressBar';
import { Box, Container, TextField, Typography, Grid, Button, CircularProgress, Alert } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

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
  const [loadingApi, setLoadingApi] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
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
  }, [technologies, filter, searchQuery]);

  const loadRecipesFromApi = async () => {
    setLoadingApi(true);
    setApiError('');

    try {
      const current = JSON.parse(localStorage.getItem('techTrackerData') || '[]');
      const existingIds = new Set(current.map(t => t.id));

      const newRecipes = [];
      let attempts = 0;

      while (newRecipes.length < 10 && attempts < 50) {
        attempts++;
        const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        if (!res.ok) continue;

        const data = await res.json();
        const recipe = data.meals?.[0];
        if (!recipe) continue;

        const recipeId = `recipe-${recipe.idMeal}`;

        if (!existingIds.has(recipeId)) {
          newRecipes.push({
            id: recipeId,
            title: recipe.strMeal,
            // Короткое описание для карточки
            description: recipe.strInstructions.substring(0, 280) + '...',
            // ПОЛНЫЙ РЕЦЕПТ — сохраняем отдельно!
            fullInstructions: recipe.strInstructions,
            status: 'not-started',
            notes: '',
            image: recipe.strMealThumb,
            category: recipe.strCategory,
            area: recipe.strArea
          });
          existingIds.add(recipeId); // чтобы не повторился
        }
        await new Promise(r => setTimeout(r, 300));
      }

      if (newRecipes.length === 0) {
        setApiError('Больше нет новых рецептов!');
        setLoadingApi(false);
        return;
      }

      current.push(...newRecipes);
      localStorage.setItem('techTrackerData', JSON.stringify(current));
      alert(`Добавлено ${newRecipes.length} новых рецептов с полными инструкциями!`);
      window.location.reload();

    } catch (err) {
      setApiError('Ошибка: ' + err.message);
    } finally {
      setLoadingApi(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>Список технологий и рецептов</Typography>
        <ProgressBar progress={progress} label="Общий прогресс изучения/приготовления" />

        {/* Кнопки: Рецепты + Добавить технологию */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', my: 3, alignItems: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<RestaurantMenuIcon />}
            onClick={loadRecipesFromApi}
            disabled={loadingApi}
            sx={{ height: 48, borderRadius: '30px', fontWeight: 600 }}
          >
            {loadingApi ? <CircularProgress size={24} /> : 'Рецепты'}
          </Button>

          <Button
            variant="contained"
            component={Link}
            to="/add-technology"
            sx={{ height: 48, px: 4, borderRadius: '30px', fontWeight: 600 }}
          >
            + Добавить технологию
          </Button>
        </Box>

        {apiError && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {apiError}
          </Alert>
        )}

        <FilterTabs currentFilter={filter} onFilterChange={setFilter} />

        <TextField
          label="Поиск по названию или описанию..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Typography variant="subtitle1" color="text.secondary">
          Найдено: {filteredTechs.length}
        </Typography>

        <QuickActions
          onMarkAllCompleted={markAllCompleted}
          onResetAll={resetAll}
          onRandomNext={randomNext}
        />

        <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
          {filteredTechs.map(item => (
            <Grid item xs={12} sm={6} md={6} key={item.id}> {/* Две в ряд, побольше */}
              <TechnologyCard
                technology={item}
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