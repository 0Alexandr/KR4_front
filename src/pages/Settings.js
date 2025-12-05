import { Box, Typography, Button, Paper } from '@mui/material';
import Modal from '../components/Modal';
import DataExporter from '../components/DataExporter';
import DataImporter from '../components/DataImporter';
import { useState } from 'react';

function Settings({ resetAll, importTestData, technologies, setTechnologies }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleDeleteAll = () => {
    if (window.confirm('Удалить ВСЁ? Это нельзя отменить!')) {
      setTechnologies([]);
      localStorage.removeItem('techTrackerData');
      setModalMessage('Все данные удалены');
      setModalOpen(true);
    }
  };

  const handleImportTestData = () => {
    if (window.confirm('Заменить все данные на тестовые?')) {
      importTestData();
      setModalMessage('Тестовые данные загружены!');
      setModalOpen(true);
      setTimeout(() => window.location.reload(), 2000);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Настройки</Typography>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Тестовые данные</Typography>
        <Button variant="contained" color="secondary" onClick={handleImportTestData}>
          Загрузить тестовые данные
        </Button>
      </Paper>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Экспорт / Импорт</Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
          <DataExporter />
          <DataImporter onSuccess={() => {
            setModalMessage('Данные импортированы! Перезагрузка...');
            setModalOpen(true);
            setTimeout(() => window.location.reload(), 1500);
          }} />
        </Box>
      </Paper>

      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom color="error">Опасная зона</Typography>
        <Button variant="contained" color="error" onClick={handleDeleteAll}>
          Удалить все карточки
        </Button>
      </Paper>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Готово">
        <Typography>{modalMessage}</Typography>
      </Modal>
    </Box>
  );
}

export default Settings;