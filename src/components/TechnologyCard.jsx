import { Card, CardContent, CardActions, Typography, Chip, IconButton, TextField, Box } from '@mui/material';
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
        '&:hover': { transform: 'translateY(-8px)', boxShadow: 10 }
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="h6" onClick={onTitleClick} sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}>
              {technology.title} <ArrowForwardIcon fontSize="small" />
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {technology.description}
            </Typography>
          </Box>
          {statusIcons[technology.status]}
        </Box>

        <Box sx={{ mt: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Заметки"
            value={technology.notes || ''}
            onChange={(e) => onNotesChange(technology.id, e.target.value)}
            variant="outlined"
            size="small"
          />
        </Box>
      </CardContent>

      <CardActions>
        <Chip label="Не начато" onClick={() => onStatusChange(technology.id, 'not-started')} />
        <Chip label="В процессе" color="warning" onClick={() => onStatusChange(technology.id, 'in-progress')} />
        <Chip label="Изучено" color="success" onClick={() => onStatusChange(technology.id, 'completed')} />
        <IconButton color="error" onClick={() => onDelete(technology.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default TechnologyCard;