import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import axios from 'axios';

const AdminDashboardPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/admin/schedules', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchedules(response.data);
    } catch (error) {
      alert('Erro ao carregar agendamentos: ' + (error.response?.data?.message || 'Tente novamente'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const formatDateTime = (date, time) => {
    const dateTimeString = `${date}T${time}`;
    const dateTime = new Date(dateTimeString);
    return format(dateTime, "dd/MM/yyyy HH:mm", { locale: ptBR });
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundImage: 'url(https://images.unsplash.com/photo-1585747860715-2ba37e788b70)', // Fundo rústico (parede de tijolos com ferramentas)
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        mt: 8,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" color="#FFD700" gutterBottom>
          Tabela de Agendamentos
        </Typography>
        <Button
          variant="contained"
          onClick={fetchSchedules}
          disabled={loading}
          sx={{ backgroundColor: '#FFD700', color: '#1a1a1a' }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#1a1a1a' }} /> : 'Atualizar'}
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(42, 42, 42, 0.9)', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#FFD700', fontWeight: 'bold' }}>Cliente</TableCell>
              <TableCell sx={{ color: '#FFD700', fontWeight: 'bold' }}>Serviço</TableCell>
              <TableCell sx={{ color: '#FFD700', fontWeight: 'bold' }}>Barbeiro</TableCell>
              <TableCell sx={{ color: '#FFD700', fontWeight: 'bold' }}>Data e Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} sx={{ color: '#fff', textAlign: 'center', py: 3 }}>
                  Nenhum agendamento encontrado
                </TableCell>
              </TableRow>
            ) : (
              schedules.map((schedule) => (
                <TableRow key={schedule.id} sx={{ '&:hover': { backgroundColor: '#3a3a3a' } }}>
                  <TableCell sx={{ color: '#fff' }}>{schedule.user_name}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{schedule.service_name}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>{schedule.barber_name}</TableCell>
                  <TableCell sx={{ color: '#fff' }}>
                    {formatDateTime(schedule.schedule_date, schedule.schedule_time)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboardPage;