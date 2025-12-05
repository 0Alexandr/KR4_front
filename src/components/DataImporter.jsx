import { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material'; // ДОБАВИЛ Paper
import UploadFileIcon from '@mui/icons-material/UploadFile';

function DataImporter({ onSuccess }) {
  const [isDragging, setIsDragging] = useState(false);
  const [importError, setImportError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateAndImport = (data) => {
    if (!Array.isArray(data) && !data.technologies) {
      throw new Error('Неверный формат: ожидается массив или объект с полем "technologies"');
    }
    const items = Array.isArray(data) ? data : data.technologies;
    for (const item of items) {
      if (!item.title || typeof item.title !== 'string' || item.title.trim().length === 0) {
        throw new Error('Каждый элемент должен иметь валидное поле "title"');
      }
    }
    return items;
  };

  const processFile = (file) => {
    if (!file.name.toLowerCase().endsWith('.json')) {
      setImportError('Только .json файлы!');
      return;
    }
    setIsLoading(true);
    setImportError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);
        const validData = validateAndImport(content);
        localStorage.setItem('techTrackerData', JSON.stringify(validData));
        onSuccess?.();
      } catch (err) {
        setImportError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Импорт данных
      </Typography>

      <Box
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
        }}
        sx={{
          border: '3px dashed',
          borderColor: isDragging ? 'primary.main' : 'grey.600',
          bgcolor: isDragging ? 'grey.800' : 'grey.850',
          color: 'grey.300',
          borderRadius: 3,
          p: 6,
          textAlign: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            bgcolor: 'grey.800',
            borderColor: 'primary.main'
          }
        }}
      >
        <UploadFileIcon sx={{ fontSize: 60, color: 'grey.500', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          Перетащите JSON-файл сюда
        </Typography>
        <Typography variant="body2" color="grey.400">
          или
        </Typography>

        <label>
          <Button
            variant="contained"
            component="span"
            startIcon={<UploadFileIcon />}
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : 'Выбрать файл'}
          </Button>
          <input
            type="file"
            accept=".json"
            hidden
            onChange={(e) => e.target.files[0] && processFile(e.target.files[0])}
          />
        </label>
      </Box>

      {importError && (
        <Paper sx={{ mt: 2, p: 2, bgcolor: 'error.dark', color: 'error.contrastText' }}>
          <Typography>{importError}</Typography>
        </Paper>
      )}
    </Box>
  );
}

export default DataImporter;