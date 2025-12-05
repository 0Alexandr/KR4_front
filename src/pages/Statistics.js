import { Box, Typography, Paper } from '@mui/material';
import ProgressBar from '../components/ProgressBar';

function Statistics({ technologies, progress }) {
  const total = technologies.length;
  const completed = technologies.filter(t => t.status === 'completed').length;
  const inProgress = technologies.filter(t => t.status === 'in-progress').length;
  const notStarted = technologies.filter(t => t.status === 'not-started').length;

  const percent = (count) => total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Статистика прогресса</Typography>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, mb: 4 }}>
        <ProgressBar progress={progress} label="Общий прогресс" />
      </Paper>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>Распределение по статусам</Typography>
        <Box sx={{ mt: 3, spaceY: 3 }}>
          <ProgressBar progress={percent(completed)} label={`Изучено (${completed})`} color="success" />
          <ProgressBar progress={percent(inProgress)} label={`В процессе (${inProgress})`} color="warning" />
          <ProgressBar progress={percent(notStarted)} label={`Не начато (${notStarted})`} color="error" />
        </Box>
      </Paper>

      <Typography variant="h6" align="center" sx={{ mt: 4, color: 'text.secondary' }}>
        Всего технологий: <strong>{total}</strong>
      </Typography>
    </Box>
  );
}

export default Statistics;