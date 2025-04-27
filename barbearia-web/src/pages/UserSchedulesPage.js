import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Button } from '@mui/material';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { getUserSchedules } from '../services/api';

const UserSchedulesPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await getUserSchedules();
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
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#1a1a1a', minHeight: '100vh', mt: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" color="#FFD700" gutterBottom>
          Meus Agendamentos Futuros
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
      <TableContainer component={Paper} sx={{ backgroundColor: '#2a2a2a', borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#FFD700', fontWeight: 'bold' }}>Serviço</TableCell>
              <TableCell sx={{ color: '#FFD700', fontWeight: 'bold' }}>Barbeiro</TableCell>
              <TableCell sx={{ color: '#FFD700', fontWeight: 'bold' }}>Data e Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} sx={{ color: '#fff', textAlign: 'center', py: 3 }}>
                  Nenhum agendamento futuro encontrado
                </TableCell>
              </TableRow>
            ) : (
              schedules.map((schedule) => (
                <TableRow key={schedule.id} sx={{ '&:hover': { backgroundColor: '#3a3a3a' } }}>
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

export default UserSchedulesPage;