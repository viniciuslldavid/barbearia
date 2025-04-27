import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(https://images.unsplash.com/photo-1513256613656-7c529f3f74b8)', // Placeholder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h2" sx={{ color: '#FFD700', fontWeight: 'bold', mb: 2 }}>
        Bem-vindo à Barbearia
      </Typography>
      <Typography variant="h5" sx={{ color: '#fff', mb: 4 }}>
        Agende seu corte com os melhores barbeiros!
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/services')}
        sx={{ fontSize: '1.2rem', padding: '10px 20px' }}
      >
        Ver Serviços
      </Button>
    </Box>
  );
};

export default HomePage;