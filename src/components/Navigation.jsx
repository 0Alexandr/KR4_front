import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Switch, 
  useTheme,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState } from 'react';

function Navigation({ toggleTheme, mode }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: isDark ? '#1e3a8a' : '#7d5d93',
        boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700,
            fontSize: { xs: '1.1rem', sm: '1.4rem' }
          }}
        >
          Дорожная карта
        </Typography>

        {/* Десктоп — горизонтально */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
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
        </Box>

        {/* Мобильное меню — бургер */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
          <IconButton color="inherit" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              paper: {
                sx: {
                  bgcolor: isDark ? '#1e3a8a' : '#7d5d93',
                  color: 'white',
                  mt: 1,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.4)'
                }
              }
            }}
          >
            <MenuItem onClick={handleClose} component={Link} to="/">Главная</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/technologies">Технологии</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/statistics">Статистика</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/settings">Настройки</MenuItem>
            <MenuItem onClick={() => { toggleTheme(); handleClose(); }}>
              <Switch
                checked={mode === 'dark'}
                onChange={toggleTheme}
                icon={<Brightness7Icon />}
                checkedIcon={<Brightness4Icon />}
              />
              {mode === 'dark' ? 'Тёмная тема' : 'Светлая тема'}
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;