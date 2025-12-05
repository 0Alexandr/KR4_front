import { useState } from 'react';

function DataExporter() {
  const [exportError, setExportError] = useState('');

  const handleExport = () => {
    try {
      const raw = localStorage.getItem('techTrackerData');
      const data = raw ? JSON.parse(raw) : [];

      const exportData = {
        exportedAt: new Date().toLocaleString('ru-RU'),
        total: data.length,
        technologies: data
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `дорожная-карта-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);

      setExportError('');
    } catch (err) {
      setExportError('Ошибка при экспорте данных');
    }
  };

  return (
    <div style={{ margin: '30px 0' }}>
      <h3>Экспорт данных</h3>
      <p style={{ color: '#555', fontSize: '0.95em' }}>
        Скачайте резервную копию всех технологий, статусов и заметок
      </p>

      <button
        onClick={handleExport}
        className="btn-action"
        style={{
          background: '#27ae60',
          padding: '14px 28px',
          fontSize: '1.1em',
          boxShadow: '0 4px 15px rgba(39, 174, 96, 0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={e => e.target.style.transform = 'translateY(-4px)'}
        onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
      >
        Экспорт в JSON
      </button>

      {exportError && (
        <div role="alert" style={{ color: '#e74c3c', marginTop: '12px', fontWeight: 'bold' }}>
          {exportError}
        </div>
      )}
    </div>
  );
}

export default DataExporter;