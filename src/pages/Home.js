import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <h1>Добро пожаловать на главную страницу!</h1>
      <p>Это стартовая страница нашего приложения.</p>
      <div className="features">
        <h2>Наши возможности:</h2>
        <ul>
          <li>Навигация между страницами</li>
          <li>Динамическая загрузка контента</li>
          <li>Быстрая работа без перезагрузки</li>
          <li><Link to="/technologies">Список технологий</Link></li>
          <li><Link to="/statistics">Статистика прогресса</Link></li>
          <li><Link to="/settings">Настройки</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Home;