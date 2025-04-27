import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Serviços', path: '/services' },
    { text: 'Agendamento', path: '/schedule' },
    ...(user ? [{ text: 'Perfil', path: '/profile' }] : []),
    ...(user && user.role !== 'admin' ? [{ text: 'Meus Agendamentos', path: '/my-schedules' }] : []),
    ...(user?.role === 'admin' ? [{ text: 'Tabela de Agendamentos', path: '/admin/dashboard' }] : []),
  ];

  const drawerList = (
    <Box sx={{ width: 250, backgroundColor: '#2a2a2a' }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              '&:hover': { backgroundColor: '#FFD700', '& .MuiListItemText-primary': { color: '#1a1a1a' } },
            }}
          >
            <ListItemText primary={item.text} sx={{ color: '#FFFFFF' }} />
          </ListItem>
        ))}
        {user ? (
          <ListItem
            button
            onClick={logout}
            sx={{
              '&:hover': { backgroundColor: '#FFD700', '& .MuiListItemText-primary': { color: '#1a1a1a' } },
            }}
          >
            <ListItemText primary="Sair" sx={{ color: '#FFFFFF' }} />
          </ListItem>
        ) : (
          <ListItem
            button
            onClick={() => navigate('/login')}
            sx={{
              '&:hover': { backgroundColor: '#FFD700', '& .MuiListItemText-primary': { color: '#1a1a1a' } },
            }}
          >
            <ListItemText primary="Login" sx={{ color: '#FFFFFF' }} />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#141414', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img
              src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJhcmJlcnNob3AlMjBsb2dvfGVufDB8fHx8MTY5NzU2NjY5MA&ixlib=rb-4.0.3&q=80&w=400"
              alt="Barbearia Logo"
              style={{ height: 40, marginRight: 16 }}
            />
            <Typography variant="h6" sx={{ color: '#FFD700', fontWeight: 'bold', letterSpacing: 1 }}>
              Barbearia do João
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 'medium',
                  textTransform: 'none',
                  fontSize: '1rem',
                  padding: '8px 16px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    color: '#FFD700',
                    borderRadius: '4px',
                  },
                }}
              >
                {item.text}
              </Button>
            ))}
            {user ? (
              <>
                <Typography sx={{ color: '#FFFFFF', marginRight: 2, alignSelf: 'center' }}>
                  Olá, {user.name}
                </Typography>
                <Button
                  onClick={logout}
                  sx={{
                    color: '#FFFFFF',
                    fontWeight: 'medium',
                    textTransform: 'none',
                    fontSize: '1rem',
                    padding: '8px 16px',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 215, 0, 0.2)',
                      color: '#FFD700',
                      borderRadius: '4px',
                    },
                  }}
                >
                  Sair
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 'medium',
                  textTransform: 'none',
                  fontSize: '1rem',
                  padding: '8px 16px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 215, 0, 0.2)',
                    color: '#FFD700',
                    borderRadius: '4px',
                  },
                }}
              >
                Login
              </Button>
            )}
          </Box>
          <IconButton
            edge="end"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#FFFFFF' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
      <Toolbar />
    </>
  );
};

export default Navbar;