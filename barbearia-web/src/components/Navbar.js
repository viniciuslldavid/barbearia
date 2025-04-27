import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await getUserProfile();
          setUser(response.data);
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Serviços', path: '/services' },
    { text: 'Agendamento', path: '/schedule', protected: true },
    { text: 'Perfil', path: '/profile', protected: true },
    ...(user?.role === 'admin' ? [{ text: 'Dashboard Admin', path: '/admin/dashboard' }] : []),
  ];

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)} disabled={item.protected && !user}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {user ? (
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Sair" />
          </ListItem>
        ) : (
          <ListItem button onClick={() => navigate('/login')}>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#1a1a1a' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#FFD700' }}>
            Barbearia
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                onClick={() => navigate(item.path)}
                disabled={item.protected && !user}
                sx={{ color: '#FFD700' }}
              >
                {item.text}
              </Button>
            ))}
            {user ? (
              <>
                <Typography sx={{ color: '#FFD700', marginRight: 2 }}>
                  Olá, {user.name}
                </Typography>
                <Button color="inherit" onClick={handleLogout} sx={{ color: '#FFD700' }}>
                  Sair
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate('/login')} sx={{ color: '#FFD700' }}>
                Login
              </Button>
            )}
          </Box>
          <IconButton
            color="inherit"
            edge="end"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#FFD700' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
      <Toolbar /> {/* Espaço para evitar sobreposição */}
    </>
  );
};

export default Navbar;