import { useState, useRef } from 'react';
import Modal from '../components/Modal';

function Settings({ resetAll, importTestData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const fileInputRef = useRef(null);

  // === СБРОС ПРОГРЕССА ===
  const handleReset = () => {
    if (window.confirm('Вы уверены, что хотите сбросить весь прогресс?\nВсе статусы станут «Не начато», заметки очистятся.')) {
      resetAll();
      setModalMessage('Весь прогресс успешно сброшен!');
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

    setModalMessage('Данные успешно экспортированы и скачаны!');
    setModalOpen(true);
  };

  // === ИМПОРТ ===
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);

        if (!data.technologies || !Array.isArray(data.technologies)) {
          alert('Ошибка: файл не содержит массив технологий.');
          return;
        }

        const count = data.technologies.length;

        if (window.confirm(`Загрузить ${count} технологий из файла?\n\nТекущие данные будут полностью заменены!`)) {
          // Сохраняем новые данные напрямую в localStorage
          localStorage.setItem('techTrackerData', JSON.stringify(data.technologies));

          setModalMessage(`Успешно загружено ${count} технологий! Страница сейчас перезагрузится.`);
          setModalOpen(true);

          // Перезагружаем, чтобы useTechnologies подхватил новые данные
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (err) {
        console.error(err);
        alert('Ошибка чтения файла. Убедитесь, что это валидный JSON от экспорта этого приложения.');
      }
    };

    reader.readAsText(file);
    e.target.value = ''; // сбрасываем input
  };

  return (
    <div className="page">
      <h1>Настройки и резервные копии</h1>

      {/* === ТЕСТОВЫЕ ДАННЫЕ === */}
      <div style={{ margin: '30px 0' }}>
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
          onClick={handleReset}
          className="btn-action"
          style={{ background: '#e74c3c' }}
        >
          Сбросить весь прогресс
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