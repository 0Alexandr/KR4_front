// src/components/QuickActions.jsx
import { Box, Button, Stack } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RefreshIcon from '@mui/icons-material/Refresh';
import ShuffleIcon from '@mui/icons-material/Shuffle';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomNext }) {
  return (
    <Box sx={{ my: 4, p: 3, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        <Button
          variant="contained"
          color="success"
          startIcon={<DoneAllIcon />}
          onClick={onMarkAllCompleted}
        >
          Отметить всё как выполненное
        </Button>
        <Button
          variant="contained"
          color="warning"
          startIcon={<RefreshIcon />}
          onClick={onResetAll}
        >
          Сбросить всё
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ShuffleIcon />}
          onClick={onRandomNext}
        >
          Случайная следующая
        </Button>
      </Stack>
    </Box>
  );
}

export default QuickActions;