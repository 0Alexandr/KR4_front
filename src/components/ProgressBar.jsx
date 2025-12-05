import { LinearProgress, Typography, Box } from '@mui/material';

function ProgressBar({ progress, label = "Прогресс", color = "primary" }) {
  return (
    <Box sx={{ my: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>{label}</Typography>
        <Typography>{progress}%</Typography>
      </Box>
      <LinearProgress variant="determinate" value={progress} color={color} />
    </Box>
  );
}

export default ProgressBar;