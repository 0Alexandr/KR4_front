// src/pages/TechnologyDetail.js
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Chip, Button, useTheme, Avatar, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

function TechnologyDetail({ technologies, updateStatus }) {
  const { techId } = useParams();
  const [item, setItem] = useState(null);
  const [fullRecipe, setFullRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    const found = technologies.find(t => t.id.toString() === techId);
    setItem(found);

    // Если это рецепт и у него нет полного текста — подгружаем с API
    if (found && found.id.toString().startsWith('recipe-') && !found.fullInstructions) {
      const mealId = found.id.replace('recipe-', '');
      fetchFullRecipe(mealId);
    }
  }, [techId, technologies]);

  const fetchFullRecipe = async (mealId) => {
    setLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await res.json();
      if (data.meals?.[0]) {
        const full = data.meals[0].strInstructions;
        setFullRecipe(full);

        // Сохраняем полный рецепт в localStorage навсегда!
        const updatedTech = technologies.map(t =>
          t.id === item.id ? { ...t, fullInstructions: full } : t
        );
        localStorage.setItem('techTrackerData', JSON.stringify(updatedTech));
      }
    } catch (err) {
      console.error('Ошибка загрузки полного рецепта:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Не найдено</Typography>
        <Button component={Link} to="/technologies" startIcon={<ArrowBackIcon />}>
          Назад
        </Button>
      </Box>
    );
  }

  const isRecipe = item.id.toString().startsWith('recipe-');
  const displayInstructions = item.fullInstructions || fullRecipe || item.description;

  return (
    <Box sx={{ p: 3 }}>
      <Button component={Link} to="/technologies" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
        Назад к списку
      </Button>

      <Paper elevation={8} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4, bgcolor: isDark ? 'grey.900' : 'background.paper' }}>
        <Box display="flex" alignItems="center" gap={2} mb={4}>
          {isRecipe && <RestaurantMenuIcon sx={{ fontSize: 48, color: 'primary.main' }} />}
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            {item.title}
          </Typography>
        </Box>

        {isRecipe && item.image && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <Avatar
              src={item.image}
              alt={item.title}
              variant="rounded"
              sx={{ width: 380, height: 380, mx: 'auto', borderRadius: 4, boxShadow: 10 }}
            />
          </Box>
        )}

        {isRecipe && (item.category || item.area) && (
          <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {item.category && <Chip label={item.category} color="primary" />}
            {item.area && <Chip label={item.area} color="secondary" />}
          </Box>
        )}

        <Typography variant="h4" sx={{ mt: 5, mb: 3, color: 'primary.main' }}>
          {isRecipe ? 'Полный рецепт' : 'Описание'}
        </Typography>

        <Paper
          sx={{
            p: 4,
            bgcolor: isDark ? 'grey.800' : 'grey.50',
            borderRadius: 3,
            minHeight: 300,
            maxHeight: '65vh',
            overflowY: 'auto',
            fontSize: '1.15rem',
            lineHeight: 2,
            whiteSpace: 'pre-wrap',
            border: `1px solid ${isDark ? '#555' : '#ddd'}`,
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            displayInstructions || 'Рецепт недоступен'
          )}
        </Paper>

        {/* Статус */}
        <Typography variant="h5" sx={{ mt: 5, mb: 3 }}>
          Статус {isRecipe ? 'приготовления' : 'изучения'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {['not-started', 'in-progress', 'completed'].map(s => (
            <Button
              key={s}
              variant={item.status === s ? 'contained' : 'outlined'}
              color={s === 'completed' ? 'success' : s === 'in-progress' ? 'warning' : 'primary'}
              onClick={() => updateStatus(item.id, s)}
            >
              {s === 'not-started' && 'Не начато'}
              {s === 'in-progress' && 'В процессе'}
              {s === 'completed' && (isRecipe ? 'Приготовлено' : 'Изучено')}
            </Button>
          ))}
        </Box>

        {/* Заметки */}
        {item.notes?.trim() && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" sx={{ mb: 3 }}>Мои заметки</Typography>
            <Paper sx={{ p: 4, bgcolor: isDark ? 'grey.800' : 'grey.50', borderRadius: 3 }}>
              <Typography sx={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem' }}>
                {item.notes}
              </Typography>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default TechnologyDetail;