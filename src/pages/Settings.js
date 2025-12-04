import { useState, useRef } from 'react';
import Modal from '../components/Modal';

function Settings({ resetAll, importTestData, technologies, setTechnologies }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const fileInputRef = useRef(null);

  // === УДАЛЕНИЕ ВСЕХ КАРТОЧЕК ===
  const handleDeleteAll = () => {
    if (window.confirm('Вы уверены, что хотите удалить все карточки?\nЭто действие нельзя отменить!')) {
      setTechnologies([]);
      localStorage.removeItem('techTrackerData');
      setModalMessage('Все карточки успешно удалены!');
      setModalOpen(true);
    }
  };

  // === ИМПОРТ ТЕСТОВЫХ ДАННЫХ ===
  const handleImportTestData = () => {
    if (window.confirm('Загрузить тестовые данные?\n\nТекущие данные будут полностью заменены на 8 примеров технологий.\nЭто действие нельзя отменить!')) {
      importTestData();
      setModalMessage('Тестовые данные успешно загружены! Страница сейчас перезагрузится.');
      setModalOpen(true);
      
      // Перезагружаем, чтобы применились изменения
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  // === ЭКСПОРТ ===
  const handleExport = () => {
    // Получаем актуальные данные из localStorage (на случай, если компонент не перерендерился)
    const rawData = localStorage.getItem('techTrackerData');
    let technologies = [];
    try {
      technologies = rawData ? JSON.parse(rawData) : [];
    } catch (e) {
      alert('Ошибка при чтении данных для экспорта.');
      return;
    }

    const data = {
      exportedAt: new Date().toLocaleString('ru-RU'),
      technologies
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tech-tracker-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setModalMessage('Данные успешно экспортированы!');
    setModalOpen(true);
  };

  // === ИМПОРТ ИЗ JSON ===
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const importedTechs = data.technologies || [];
        
        // Проверяем структуру
        if (!Array.isArray(importedTechs)) throw new Error('Неверный формат данных');

        // Заменяем текущие данные
        localStorage.setItem('techTrackerData', JSON.stringify(importedTechs));
        setModalMessage('Данные успешно импортированы! Страница сейчас перезагрузится.');
        setModalOpen(true);
        
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        setModalMessage('Ошибка импорта: ' + err.message);
        setModalOpen(true);
      }
    };
    reader.readAsText(file);

    // Сбрасываем input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="page">
      <h1>Настройки</h1>

      {/* === ТЕСТОВЫЕ ДАННЫЕ === */}
      <div style={{ marginBottom: '30px' }}>
        <h3>Тестовые данные</h3>

        <button
          onClick={handleImportTestData}
          className="btn-action"
          style={{ background: '#9b59b6', margin: '0 15px 15px 0' }}
        >
          Импорт тестовых данных
        </button>
      </div>

      {/* === РЕЗЕРВНОЕ КОПИРОВАНИЕ === */}
      <div style={{ margin: '30px 0' }}>
        <h3>Резервное копирование</h3>

        <button
          onClick={handleExport}
          className="btn-action"
          style={{ background: '#27ae60', margin: '0 15px 15px 0' }}
        >
          Экспорт данных (JSON)
        </button>

        <label
          className="btn-action"
          style={{ background: '#3498db', cursor: 'pointer', display: 'inline-block' }}
        >
          Импорт из JSON
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* === УПРАВЛЕНИЕ ДАННЫМИ === */}
      <div style={{ marginTop: '40px' }}>
        <h3>Управление данными</h3>

        <button
          onClick={handleDeleteAll}
          className="btn-action"
          style={{ background: '#e74c3c' }}
        >
          Удалить все карточки
        </button>
      </div>

      {/* Универсальная модалка */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Готово">
        <p>{modalMessage || 'Операция завершена.'}</p>
      </Modal>

      <p style={{ marginTop: '40px', color: '#7f8c8d', fontSize: '0.9em', lineHeight: '1.6' }}>
        • <strong>Тестовые данные</strong> — восстанавливает 8 исходных технологий<br />
        • <strong>Экспорт</strong> сохраняет все технологии, статусы, заметки и ID<br />
        • <strong>Импорт</strong> полностью заменяет текущие данные<br />
        • После импорта страница автоматически обновится
      </p>
    </div>
  );
}

export default Settings;