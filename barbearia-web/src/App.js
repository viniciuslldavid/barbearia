import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

const AdminDashboardPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedules = async () => {
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
    fetchSchedules();
  }, []);

  return (
    <Box sx={{ p: 4, backgroundColor: '#1a1a1a', minHeight: '100vh', mt: 8 }}>
      <Typography variant="h4" color="#FFD700" gutterBottom>
        Dashboard do Administrador
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress sx={{ color: '#FFD700' }} />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: '#2a2a2a' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#FFD700' }}>Cliente</TableCell>
                <TableCell sx={{ color: '#FFD700' }}>Serviço</TableCell>
                <TableCell sx={{ color: '#FFD700' }}>Barbeiro</TableCell>
                <TableCell sx={{ color: '#FFD700' }}>Data</TableCell>
                <TableCell sx={{ color: '#FFD700' }}>Hora</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ color: '#fff', textAlign: 'center' }}>
                    Nenhum agendamento encontrado
                  </TableCell>
                </TableRow>
              ) : (
                schedules.map((schedule) => (
                  <TableRow key={schedule.id}>
                    <TableCell sx={{ color: '#fff' }}>{schedule.user_name}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{schedule.service_name}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{schedule.barber_name}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{schedule.schedule_date}</TableCell>
                    <TableCell sx={{ color: '#fff' }}>{schedule.schedule_time}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AdminDashboardPage;