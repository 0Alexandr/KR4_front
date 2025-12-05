import { useState } from 'react';
import useLocalStorage from './useLocalStorage';

const defaultTechnologies = [
  { id: 1, title: 'React Components', description: 'Базовые компоненты', status: 'completed', notes: '' },
  { id: 2, title: 'JSX Syntax', description: 'Синтаксис JSX', status: 'completed', notes: '' },
  { id: 3, title: 'Props и состояние', description: 'Передача данных', status: 'in-progress', notes: '' },
  { id: 4, title: 'useState & useEffect', description: 'Хуки', status: 'in-progress', notes: '' },
  { id: 5, title: 'React Router', description: 'Навигация', status: 'not-started', notes: '' },
  { id: 6, title: 'Redux / Zustand', description: 'Глобальное состояние', status: 'not-started', notes: '' },
  { id: 7, title: 'TypeScript', description: 'Типизация', status: 'not-started', notes: '' },
  { id: 8, title: 'Testing (Jest)', description: 'Тестирование', status: 'not-started', notes: '' }
];

function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('techTrackerData', defaultTechnologies);

  // Состояние для Snackbar (уведомлений MUI)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success' | 'error' | 'warning' | 'info'
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  const updateStatus = (id, newStatus) => {
    setTechnologies(prev => prev.map(t =>
      t.id === id ? { ...t, status: newStatus } : t
    ));
    showSnackbar('Статус успешно обновлён!', 'success');
  };

  const updateNotes = (id, newNotes) => {
    setTechnologies(prev => prev.map(t =>
      t.id === id ? { ...t, notes: newNotes } : t
    ));
  };

  const addTechnology = (newTech) => {
    setTechnologies(prev => {
      const maxId = prev.length === 0 ? 0 : Math.max(...prev.map(t => t.id));
      const newTechnology = {
        id: maxId + 1,
        title: newTech.title,
        description: newTech.description,
        status: 'not-started',
        notes: ''
      };
      const updated = [...prev, newTechnology];
      showSnackbar(`Технология "${newTech.title}" добавлена!`, 'success');
      return updated;
    });
  };

  const deleteTechnology = (id) => {
    const techToDelete = technologies.find(t => t.id === id);
    setTechnologies(prev => prev.filter(t => t.id !== id));
    showSnackbar(`Технология "${techToDelete?.title}" удалена`, 'info');
  };

  const markAllCompleted = () => {
    setTechnologies(prev => prev.map(t => ({ ...t, status: 'completed' })));
    showSnackbar('Все технологии отмечены как завершённые!', 'success');
  };

  const resetAll = () => {
    setTechnologies(prev => prev.map(t => ({ ...t, status: 'not-started', notes: '' })));
    showSnackbar('Все статусы сброшены!', 'warning');
  };

  const importTestData = () => {
    setTechnologies(defaultTechnologies);
    showSnackbar('Тестовые данные загружены!', 'success');
  };

  const randomNext = () => {
    const notStarted = technologies.filter(t => t.status === 'not-started');
    if (notStarted.length === 0) {
      showSnackbar('Нет технологий для начала изучения', 'info');
      return;
    }
    const randomTech = notStarted[Math.floor(Math.random() * notStarted.length)];
    updateStatus(randomTech.id, 'in-progress');
    showSnackbar(`Начато изучение: "${randomTech.title}"`, 'success');
  };

  const progress = technologies.length > 0
    ? Math.round(technologies.filter(t => t.status === 'completed').length / technologies.length * 100)
    : 0;

  return {
    technologies,
    setTechnologies,
    updateStatus,
    updateNotes,
    addTechnology,
    deleteTechnology,
    markAllCompleted,
    resetAll,
    importTestData,
    randomNext,
    progress,
    // Для Snackbar
    snackbar,
    handleCloseSnackbar
  };
}

export default useTechnologies;