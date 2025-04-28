import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { getServices } from '../services/api';

const ServicesPage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (error) {
        console.error('Erro ao buscar serviços:', error);
      }
    };
    fetchServices();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#1a1a1a', minHeight: '100vh', color: '#fff', pt: 8 }}>
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" color="#FFD700" gutterBottom>
          Nossos Serviços
        </Typography>
        <Grid container spacing={4}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Box sx={{ backgroundColor: '#3a3a3a', p: 3, borderRadius: 2, textAlign: 'center' }}>
                <Typography variant="h6">{service.name}</Typography>
                <Typography variant="body2">R$ {service.price.toFixed(2)}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesPage;