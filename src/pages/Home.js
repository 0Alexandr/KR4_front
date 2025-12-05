import { Box, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Paper sx={{ p: 6, borderRadius: 4, boxShadow: 6 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          Добро пожаловать!
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Ваш личный трекер изучения технологий
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" component={Link} to="/technologies">
            Перейти к технологиям
          </Button>
          <Button variant="outlined" size="large" component={Link} to="/statistics">
            Статистика
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Home;