import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Button, Divider } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { getServices } from '../services/api';

const HomePage = () => {
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
      {/* Hero Section */}
      <Box sx={{ backgroundColor: '#FFD700', color: '#1a1a1a', py: 6, textAlign: 'center' }}>
        <Container>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Barbearia do Vinícius
          </Typography>
          <Typography variant="h6">
            Seu estilo, nossa paixão. Agende agora e experimente o melhor cuidado!
          </Typography>
        </Container>
      </Box>

      {/* Quem Somos */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" color="#FFD700" gutterBottom>
          Quem Somos
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
          Somos a Barbearia do Vinícius, um espaço dedicado ao cuidado masculino com mais de 5 anos de experiência. 
          Oferecemos serviços de alta qualidade em um ambiente acolhedor e moderno, garantindo que você saia com o visual 
          que sempre sonhou. Nossa equipe de barbeiros é altamente qualificada e está pronta para atender você com o melhor!
        </Typography>
      </Container>

      {/* Serviços Oferecidos e Preços */}
      <Box sx={{ backgroundColor: '#2a2a2a', py: 6 }}>
        <Container>
          <Typography variant="h4" color="#FFD700" gutterBottom>
            Serviços Oferecidos
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

      {/* Contato */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" color="#FFD700" gutterBottom>
          Contato
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            sx={{ backgroundColor: '#25D366', color: '#fff', '&:hover': { backgroundColor: '#1EBE54' } }}
            href="https://wa.me/5511999999999"
            target="_blank"
          >
            Fale pelo WhatsApp
          </Button>
          <Button
            variant="contained"
            startIcon={<LocationOnIcon />}
            sx={{ backgroundColor: '#FFD700', color: '#1a1a1a', '&:hover': { backgroundColor: '#E6C200' } }}
            href="https://maps.google.com/?q=Rua+Exemplo+123+Sao+Paulo"
            target="_blank"
          >
            Ver no Google Maps
          </Button>
        </Box>
      </Container>

      <Divider sx={{ backgroundColor: '#FFD700' }} />
      <Box sx={{ py: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          © 2025 Barbearia do Vinícius. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;