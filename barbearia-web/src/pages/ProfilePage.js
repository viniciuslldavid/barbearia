import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { getUserProfile } from '../services/api';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (error) {
        alert('Erro ao carregar perfil');
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!user) {
    return <div style={{ color: '#fff', textAlign: 'center', padding: 20, backgroundColor: '#1a1a1a' }}>Carregando...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <Card sx={{ maxWidth: 400, padding: 2, backgroundColor: '#2a2a2a' }}>
        <CardContent>
          <Typography variant="h5" color="#FFD700" align="center" gutterBottom>
            Perfil
          </Typography>
          <Typography color="#fff" gutterBottom>Nome: {user.name}</Typography>
          <Typography color="#fff" gutterBottom>Email: {user.email}</Typography>
          <Typography color="#fff" gutterBottom>Telefone: {user.phone}</Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogout}
            sx={{ marginTop: 2, backgroundColor: '#FFD700', color: '#1a1a1a' }}
          >
            Sair
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;