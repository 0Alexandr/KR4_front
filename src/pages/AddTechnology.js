import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function AddTechnology({ addTechnology }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Заполните название и описание!');
      return;
    }
    addTechnology({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
    navigate('/technologies');
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/technologies')} sx={{ mb: 2 }}>
        Назад к списку
      </Button>
      <Typography variant="h4" gutterBottom>Добавить новую технологию</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Название технологии"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          multiline
          rows={5}
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
          Добавить технологию
        </Button>
      </form>
    </Box>
  );
}

export default AddTechnology;