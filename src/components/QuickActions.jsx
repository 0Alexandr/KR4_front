import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomNext }) {

  return (
    <div className="quick-actions-container">
      <h3>Быстрые действия</h3>
      <div className="quick-actions-buttons">
        <button onClick={onMarkAllCompleted} className="btn-action btn-success">
          Отметить всё как выполненное
        </button>
        <button onClick={onResetAll} className="btn-action btn-warning">
          Сбросить всё
        </button>
        <button onClick={onRandomNext} className="btn-action btn-random">
          Случайная следующая
        </button>
      </div>
    </div>
  );
}

export default QuickActions;