import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function TechnologyDetail({ technologies, updateStatus }) {
  const { techId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const found = technologies.find(t => t.id.toString() === techId);
    setItem(found);
  }, [techId, technologies]);

  if (!item) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Технология не найдена</Typography>
        <Button component={Link} to="/technologies" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Назад к списку
        </Button>
      </Box>
    );
  }

  const isRecipe = item.id.toString().startsWith('recipe-');

  return (
    <Box sx={{ p: 3 }}>
      <Button component={Link} to="/technologies" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
        Назад к списку
      </Button>

      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          bgcolor: 'grey.900',           // ТЁМНЫЙ ФОН
          color: 'grey.100',             // СВЕТЛЫЙ ТЕКСТ
          minHeight: '70vh',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ color: 'primary.light' }}>
          {item.title}
        </Typography>

        {isRecipe && item.image && (
          <Box sx={{ textAlign: 'center', my: 4 }}>
            <img
              src={item.image}
              alt={item.title}
              style={{
                maxWidth: '100%',
                width: '600px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                border: '4px solid #333'
              }}
            />
          </Box>
        )}

        {isRecipe && (item.category || item.area) && (
          <Box sx={{ mb: 3 }}>
            {item.category && <Chip label={`Категория: ${item.category}`} color="primary" sx={{ mr: 1 }} />}
            {item.area && <Chip label={`Кухня: ${item.area}`} color="secondary" />}
          </Box>
        )}

        <Typography variant="h5" sx={{ mt: 5, mb: 2, color: 'grey.300' }}>
          {isRecipe ? 'Полный рецепт' : 'Подробное описание'}
        </Typography>
        <Paper
          sx={{
            p: 3,
            bgcolor: 'grey.800',
            borderRadius: 2,
            whiteSpace: 'pre-wrap',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            color: 'grey.200',
            maxHeight: '500px',
            overflowY: 'auto',
            border: '1px solid #444'
          }}
        >
          {item.description || 'Описание отсутствует.'}
        </Paper>

        <Typography variant="h5" sx={{ mt: 5, mb: 2, color: 'grey.300' }}>
          Статус {isRecipe ? 'приготовления' : 'изучения'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
          {['not-started', 'in-progress', 'completed'].map(s => (
            <Button
              key={s}
              variant={item.status === s ? 'contained' : 'outlined'}
              color={s === 'completed' ? 'success' : s === 'in-progress' ? 'warning' : 'inherit'}
              onClick={() => updateStatus(item.id, s)}
            >
              {s === 'not-started' && 'Не начато'}
              {s === 'in-progress' && 'В процессе'}
              {s === 'completed' && (isRecipe ? 'Приготовлено' : 'Изучено')}
            </Button>
          ))}
        </Box>

        {item.notes && item.notes.trim() && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" sx={{ mb: 2, color: 'grey.300' }}>
              Мои заметки
            </Typography>
            <Paper
              sx={{
                p: 3,
                bgcolor: 'success.dark',
                color: 'success.contrastText',
                borderRadius: 2,
                borderLeft: '6px solid',
                borderColor: 'success.main',
                whiteSpace: 'pre-wrap',
                fontSize: '1.05rem'
              }}
            >
              {item.notes}
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default TechnologyDetail;