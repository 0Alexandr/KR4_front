// src/components/TechnologyCard.jsx
import { Card, CardContent, CardActions, Typography, Chip, IconButton, TextField, Box, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function TechnologyCard({ technology, onStatusChange, onNotesChange, onTitleClick, onDelete }) {
  const statusIcons = {
    'completed': <CheckCircleIcon color="success" />,
    'in-progress': <AccessTimeIcon color="warning" />,
    'not-started': <RadioButtonUncheckedIcon color="action" />
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: '0.3s',
        '&:hover': { transform: 'translateY(-8px)', boxShadow: 10 },
        maxWidth: 520,
        mx: 'auto',
        minHeight: 480 // Чтобы заметки не "прыгали" при малом контенте
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Заголовок и статус */}
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography
            variant="h5"
            onClick={onTitleClick}
            sx={{
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' },
              fontWeight: 600
            }}
          >
            {technology.title} <ArrowForwardIcon fontSize="small" />
          </Typography>
          {statusIcons[technology.status]}
        </Box>

        {/* Описание */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7, flexGrow: 1 }}>
          {technology.description}
        </Typography>

        {/* Фото (для рецептов) — по центру */}
        {technology.image && (
          <Box sx={{ textAlign: 'center', my: 3, flexShrink: 0 }}>
            <Avatar
              src={technology.image}
              alt={technology.title}
              variant="rounded"
              sx={{
                width: 200,
                height: 200,
                mx: 'auto',
                borderRadius: 3,
                boxShadow: 4
              }}
            />
          </Box>
        )}

        {/* Заметки — всегда внизу */}
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Заметки"
            placeholder="Добавьте свои мысли..."
            value={technology.notes || ''}
            onChange={(e) => onNotesChange(technology.id, e.target.value)}
            variant="outlined"
            size="medium"
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
                borderRadius: 2
              }
            }}
          />
        </Box>
      </CardContent>

      {/* Нижняя панель с чипами */}
      <CardActions sx={{ justifyContent: 'space-between', p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label="Не начато"
            size="small"
            onClick={() => onStatusChange(technology.id, 'not-started')}
            color={technology.status === 'not-started' ? 'primary' : 'default'}
          />
          <Chip
            label="В процессе"
            size="small"
            color="warning"
            onClick={() => onStatusChange(technology.id, 'in-progress')}
            variant={technology.status === 'in-progress' ? 'filled' : 'outlined'}
          />
          <Chip
            label="Изучено"
            size="small"
            color="success"
            onClick={() => onStatusChange(technology.id, 'completed')}
            variant={technology.status === 'completed' ? 'filled' : 'outlined'}
          />
        </Box>
        <IconButton color="error" onClick={() => onDelete(technology.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default TechnologyCard;