import { useState, useRef } from 'react';
import Modal from '../components/Modal';
import DataExporter from '../components/DataExporter';
import DataImporter from '../components/DataImporter';

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

  // === ОБНОВЛЕНИЕ ДАННЫХ ПОСЛЕ УСПЕШНОГО ИМПОРТА ===
  const handleImportSuccess = () => {
    setModalMessage('Данные успешно импортированы! Страница перезагрузится...');
    setModalOpen(true);
    
    setTimeout(() => {
      window.location.reload();
    }, 1500);
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

      {/* === ПОДКЛЮЧЕННЫЕ КОМПОНЕНТЫ ИМПОРТА/ЭКСПОРТА === */}
      <DataExporter />
      <DataImporter onSuccess={handleImportSuccess} />

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