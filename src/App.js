// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AddTechnology from './pages/AddTechnology';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import useTechnologies from './hooks/useTechnologies';
import SnackbarNotification from './components/SnackbarNotification';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';

function App() {
  // Сохраняем тему в localStorage
  const [mode, setMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme || 'light'; // по умолчанию светлая
  });

  // При изменении темы — сохраняем в localStorage
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const techHook = useTechnologies();

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: '#1976d2' },
      secondary: { main: '#4caf50' },
    },
  });

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navigation toggleTheme={toggleTheme} mode={mode} />
          <div className="container">
            <Routes>
              <Route path="/add-technology" element={<AddTechnology addTechnology={techHook.addTechnology} />} />
              <Route path="/" element={<Home />} />
              <Route path="/technologies" element={<TechnologyList {...techHook} />} />
              <Route path="/technologies/:techId" element={<TechnologyDetail {...techHook} />} />
              <Route path="/statistics" element={<Statistics {...techHook} />} />
              <Route path="/settings" element={<Settings {...techHook} />} />
              <Route path="*" element={<Home />} />
            </Routes>

            {/* Уведомления */}
            <SnackbarNotification
              open={techHook.snackbar.open}
              message={techHook.snackbar.message}
              severity={techHook.snackbar.severity}
              onClose={techHook.handleCloseSnackbar}
            />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;