import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AddTechnology from './pages/AddTechnology';
import TechnologyList from './pages/TechnologyList';
import ItemDetail from './pages/TechnologyDetail'; // Изменено на ItemDetail
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';
import useTechnologies from './hooks/useTechnologies';
import './App.css';

function App() {
  const techHook = useTechnologies();

  return (
    <Router>
      <div className="App">
        <Navigation />
        <div className="container">
          <Routes>
            <Route path="/add-technology" element={<AddTechnology addTechnology={techHook.addTechnology} />} />

            {/* Пример 1 */}
            <Route path="/" element={<Home />} />

            {/* Пример 2 — параметры */}
            <Route path="/technologies" element={<TechnologyList {...techHook} />} />
            <Route path="/technologies/:techId" element={<ItemDetail {...techHook} />} />

            {/* Самостоятельная работа */}
            <Route path="/statistics" element={<Statistics {...techHook} />} />
            <Route path="/settings" element={<Settings {...techHook} />} />

            {/* 404 */}
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;