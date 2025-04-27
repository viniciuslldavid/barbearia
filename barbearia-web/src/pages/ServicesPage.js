import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { getServices } from '../services/api';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (error) {
        alert('Erro ao carregar serviços');
      }
    };
    fetchServices();
  }, []);

  return (
    <div style={{ padding: 20, backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
      <Typography variant="h4" color="#FFD700" gutterBottom>
        Serviços
      </Typography>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card
              sx={{ backgroundColor: '#2a2a2a', cursor: 'pointer' }}
              onClick={() => navigate('/schedule', { state: { serviceId: service.id } })}
            >
              <CardContent>
                <Typography variant="h6" color="#FFD700">
                  {service.name}
                </Typography>
                <Typography color="#fff">R$ {service.price}</Typography>
                <Typography color="#fff">{service.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ServicesPage;