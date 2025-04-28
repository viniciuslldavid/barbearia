import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1a1a1a' }}>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: '#FFD700', textDecoration: 'none' }}>
          Barbearia
        </Typography>
        <Box>
          <Button component={Link} to="/services" sx={{ color: '#FFD700' }}>
            Serviços
          </Button>
          <Button component={Link} to="/schedule" sx={{ color: '#FFD700' }}>
            Agendar
          </Button>
          {user ? (
            <>
              <Typography variant="body1" sx={{ display: 'inline', color: '#FFD700', mr: 2 }}>
                Olá, {user.name}
              </Typography>
              <Button component={Link} to="/profile" sx={{ color: '#FFD700' }}>
                Perfil
              </Button>
              {user.role === 'user' && (
                <Button component={Link} to="/my-schedules" sx={{ color: '#FFD700' }}>
                  Meus Agendamentos
                </Button>
              )}
              {user.role === 'admin' && (
                <Button component={Link} to="/admin/dashboard" sx={{ color: '#FFD700' }}>
                  Dashboard
                </Button>
              )}
              <Button onClick={logout} sx={{ color: '#FFD700' }}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" sx={{ color: '#FFD700' }}>
                Login
              </Button>
              <Button component={Link} to="/register" sx={{ color: '#FFD700' }}>
                Registrar
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;