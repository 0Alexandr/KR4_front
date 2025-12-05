import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Switch } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Navigation({ toggleTheme, mode }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Дорожная карта изучения технологий
        </Typography>
        <Button color="inherit" component={Link} to="/">Главная</Button>
        <Button color="inherit" component={Link} to="/technologies">Технологии</Button>
        <Button color="inherit" component={Link} to="/statistics">Статистика</Button>
        <Button color="inherit" component={Link} to="/settings">Настройки</Button>
        <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          icon={<Brightness7Icon />}
          checkedIcon={<Brightness4Icon />}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;