import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { getUserSchedules } from '../services/api';

const UserSchedulesPage = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await getUserSchedules();
        setSchedules(response.data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };
    fetchSchedules();
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#1a1a1a', minHeight: '100vh', mt: 8 }}>
      <Typography variant="h4" color="#FFD700" gutterBottom>
        Meus Agendamentos
      </Typography>
      <Table sx={{ backgroundColor: '#2a2a2a' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#FFD700' }}>Serviço</TableCell>
            <TableCell sx={{ color: '#FFD700' }}>Barbeiro</TableCell>
            <TableCell sx={{ color: '#FFD700' }}>Data</TableCell>
            <TableCell sx={{ color: '#FFD700' }}>Horário</TableCell>
            <TableCell sx={{ color: '#FFD700' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell sx={{ color: '#fff' }}>{schedule.service_name || 'N/A'}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{schedule.barber_name || 'N/A'}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{schedule.schedule_date || 'Data Inválida'}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{schedule.schedule_time || 'Horário Inválido'}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{schedule.status || 'Pendente'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UserSchedulesPage;