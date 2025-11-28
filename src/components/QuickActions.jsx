function QuickActions({ technologies, onUpdateAll, onResetAll, onRandomNext }) {
  return (
    <div className="quick-actions">
      <button onClick={onUpdateAll}>Отметить всё как выполненное</button>
      <button onClick={onResetAll}>Сбросить всё</button>
      <button onClick={onRandomNext}>Случайная следующая</button>
    </div>
  );
}

export default QuickActions;