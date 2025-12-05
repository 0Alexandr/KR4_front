import { useState } from 'react';

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
      if (!item.title || typeof item.title !== 'string') {
        throw new Error('Каждый элемент должен иметь поле "title" (строка)');
      }
      if (item.title.trim().length === 0) {
        throw new Error('Название технологии не может быть пустым');
      }
      if (item.title.length > 100) {
        throw new Error('Название слишком длинное (макс. 100 символов)');
      }
    }

    return items;
  };

  const processFile = (file) => {
    if (!file.name.toLowerCase().endsWith('.json')) {
      setImportError('Поддерживаются только файлы .json');
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
        alert(`Успешно импортировано ${validData.length} элементов! Страница перезагрузится...`);
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        setImportError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  return (
    <div style={{ margin: '30px 0' }}>
      <h3>Импорт данных</h3>
      <p style={{ color: '#555', fontSize: '0.95em' }}>
        Загрузите ранее сохранённый JSON-файл
      </p>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: isDragging ? '3px dashed #3498db' : '2px dashed #bdc3c7',
          borderRadius: '16px',
          padding: '40px',
          textAlign: 'center',
          background: isDragging ? '#ebf3fd' : '#f8f9fa',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        role="region"
        aria-label="Зона для перетаскивания JSON-файла"
      >
        <p style={{ fontSize: '1.2em', margin: '#2c3e50' }}>
          Перетащите JSON-файл сюда
        </p>
        <p style={{ color: '#7f8c8d' }}>или</p>

        <label
          style={{
            display: 'inline-block',
            padding: '14px 32px',
            background: '#3498db',
            color: 'white',
            borderRadius: '12px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(52, 152, 219, 0.4)',
            transition: 'all 0.3s'
          }}
          onMouseEnter={e => e.target.style.transform = 'translateY(-4px)'}
          onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
        >
          {isLoading ? 'Загрузка...' : 'Выбрать файл'}
          <input
            type="file"
            accept=".json,application/json"
            onChange={(e) => e.target.files[0] && processFile(e.target.files[0])}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {importError && (
        <div
          role="alert"
          style={{
            marginTop: '16px',
            padding: '14px',
            background: '#fdf2f2',
            border: '1px solid #e74c3c',
            borderRadius: '10px',
            color: '#c0392b',
            fontWeight: 'bold'
          }}
        >
          {importError}
        </div>
      )}
    </div>
  );
}

export default DataImporter;