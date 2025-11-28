import { useState } from 'react';
import Modal from './Modal';
import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomNext, technologies }) {
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExport = () => {
    const data = { exportedAt: new Date().toLocaleString('ru-RU'), technologies };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setShowExportModal(true);
  };

  return (
    <div className="quick-actions-container">
      <h3>Быстрые действия</h3>
      <div className="quick-actions-buttons">
        <button onClick={onMarkAllCompleted} className="btn-success">
          Отметить всё как выполненное
        </button>
        <button onClick={onResetAll} className="btn-warning">
          Сбросить всё
        </button>
        <button onClick={onRandomNext} className="btn-random">
          Случайная следующая
        </button>
        <button onClick={handleExport} className="btn-export">
          Экспорт данных
        </button>
      </div>

      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)} title="Экспорт завершён">
        <p>Данные скопированы в буфер обмена!</p>
      </Modal>
    </div>
  );
}

export default QuickActions;