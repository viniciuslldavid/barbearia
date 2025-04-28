import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#1a1a1a' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#FFD700' }}>
          Barbearia do Vinícius
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/" sx={{ color: '#FFD700' }}>
            Início
          </Button>
          <Button color="inherit" component={Link} to="/services" sx={{ color: '#FFD700' }}>
            Serviços
          </Button>
          <Button color="inherit" component={Link} to="/schedule" sx={{ color: '#FFD700' }}>
            Agendar
          </Button>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/profile" sx={{ color: '#FFD700' }}>
                Perfil
              </Button>
              <Button color="inherit" component={Link} to="/my-schedules" sx={{ color: '#FFD700' }}>
                Meus Agendamentos
              </Button>
              {user.role === 'admin' && (
                <Button color="inherit" component={Link} to="/admin/dashboard" sx={{ color: '#FFD700' }}>
                  Dashboard Admin
                </Button>
              )}
              <Button color="inherit" onClick={handleLogout} sx={{ color: '#FFD700' }}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ color: '#FFD700' }}>
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register" sx={{ color: '#FFD700' }}>
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