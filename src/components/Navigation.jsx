import { Link } from 'react-router-dom';
import './Header.css'; // используем фиолетовую шапку

function Navigation() {
  return (
    <nav className="tech-header">
      <h1>Дорожная карта изучения технологий</h1>
      <ul style={{ listStyle: 'none', display: 'flex', gap: '40px', justifyContent: 'center', padding: 0, margin: '20px 0 0' }}>
        <li><Link to="/" className="nav-link">Главная</Link></li>
        <li><Link to="/technologies" className="nav-link">Технологии</Link></li>
        <li><Link to="/statistics" className="nav-link">Статистика</Link></li>
        <li><Link to="/settings" className="nav-link">Настройки</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;