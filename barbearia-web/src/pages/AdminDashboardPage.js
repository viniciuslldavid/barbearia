import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { AuthContext } from '../context/AuthContext';
import { getAllSchedules } from '../services/api';

const AdminDashboardPage = () => {
  const { user } = useContext(AuthContext);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await getAllSchedules();
        console.log('Agendamentos recebidos:', response.data);
        setSchedules(response.data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };
    fetchSchedules();
  }, []);

  const formatDateTime = (date, time) => {
    console.log('Formatando data/hora:', { date, time, typeOfDate: typeof date, typeOfTime: typeof time });

    if (!date || !time || typeof date !== 'string' || typeof time !== 'string') {
      console.log('Valores inválidos:', { date, time });
      return 'Data/Hora Inválida';
    }

    try {
      // Extrair apenas a parte da data (YYYY-MM-DD) do formato ISO
      const cleanDate = date.split('T')[0]; // Pega apenas "YYYY-MM-DD" de "YYYY-MM-DDTHH:mm:ss.SSSZ"
      const cleanTime = time.trim();

      console.log('Após limpeza:', { cleanDate, cleanTime });

      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      const timeRegex = /^\d{2}:\d{2}(:\d{2})?$/;

      if (!dateRegex.test(cleanDate)) {
        console.log('Formato de data inválido:', cleanDate);
        return 'Data/Hora Inválida';
      }

      let formattedTime = cleanTime;
      if (!timeRegex.test(cleanTime)) {
        console.log('Formato de hora inválido:', cleanTime);
        return 'Data/Hora Inválida';
      }

      if (cleanTime.split(':').length === 2) {
        formattedTime = `${cleanTime}:00`;
      }

      // Criar a data manualmente
      const [year, month, day] = cleanDate.split('-').map(Number);
      const [hour, minute] = formattedTime.split(':').slice(0, 2).map(Number);
      const dateTime = new Date(year, month - 1, day, hour, minute);

      if (isNaN(dateTime.getTime())) {
        console.log('Data criada inválida:', dateTime);
        return 'Data/Hora Inválida';
      }

      const formatted = format(dateTime, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
      console.log('Data formatada:', formatted);
      return formatted;
    } catch (error) {
      console.error('Erro ao formatar data/hora:', { date, time, error });
      return 'Data/Hora Inválida';
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <Box sx={{ p: 4, backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
        <Typography variant="h4" color="#FFD700">
          Acesso negado
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: '#1a1a1a', minHeight: '100vh', mt: 8 }}>
      <Typography variant="h4" color="#FFD700" gutterBottom>
        Tabela de Agendamentos
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: '#2a2a2a' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#FFD700' }}>Cliente</TableCell>
              <TableCell sx={{ color: '#FFD700' }}>Telefone</TableCell>
              <TableCell sx={{ color: '#FFD700' }}>Serviço</TableCell>
              <TableCell sx={{ color: '#FFD700' }}>Barbeiro</TableCell>
              <TableCell sx={{ color: '#FFD700' }}>Data e Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedules.map((schedule) => (
              <TableRow key={schedule.id}>
                <TableCell sx={{ color: '#FFFFFF' }}>{schedule.user_name}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{schedule.user_phone || 'N/A'}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{schedule.service_name}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>{schedule.barber_name}</TableCell>
                <TableCell sx={{ color: '#FFFFFF' }}>
                  {formatDateTime(schedule.schedule_date, schedule.schedule_time)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboardPage;