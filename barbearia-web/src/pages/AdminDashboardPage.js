import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Alert } from '@mui/material';
import { getAllSchedules, updateScheduleStatus, createBarber, createService } from '../services/api';

const AdminDashboardPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [barberName, setBarberName] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await getAllSchedules();
        setSchedules(response.data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };
    fetchSchedules();
  }, []);

  const handleStatusUpdate = async (scheduleId, status) => {
    try {
      await updateScheduleStatus(scheduleId, status);
      setSchedules(schedules.map(schedule =>
        schedule.id === scheduleId ? { ...schedule, status } : schedule
      ));
    } catch (error) {
      console.error('Erro ao atualizar status do agendamento:', error);
    }
  };

  const handleCreateBarber = async () => {
    try {
      await createBarber(barberName);
      setSuccessMessage('Barbeiro cadastrado com sucesso!');
      setBarberName('');
    } catch (error) {
      console.error('Erro ao cadastrar barbeiro:', error);
    }
  };

  const handleCreateService = async () => {
    try {
      await createService(serviceName, parseFloat(servicePrice));
      setSuccessMessage('Serviço cadastrado com sucesso!');
      setServiceName('');
      setServicePrice('');
    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#1a1a1a', minHeight: '100vh', mt: 8 }}>
      <Typography variant="h4" color="#FFD700" gutterBottom>
        Dashboard do Administrador
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* Cadastro de Barbeiros */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" color="#FFD700" gutterBottom>
          Cadastrar Barbeiro
        </Typography>
        <TextField
          label="Nome do Barbeiro"
          value={barberName}
          onChange={(e) => setBarberName(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
        />
        <Button
          variant="contained"
          onClick={handleCreateBarber}
          sx={{ mt: 1, backgroundColor: '#FFD700', color: '#1a1a1a' }}
        >
          Cadastrar
        </Button>
      </Box>

      {/* Cadastro de Serviços */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" color="#FFD700" gutterBottom>
          Cadastrar Serviço
        </Typography>
        <TextField
          label="Nome do Serviço"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
        />
        <TextField
          label="Preço (R$)"
          type="number"
          value={servicePrice}
          onChange={(e) => setServicePrice(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
        />
        <Button
          variant="contained"
          onClick={handleCreateService}
          sx={{ mt: 1, backgroundColor: '#FFD700', color: '#1a1a1a' }}
        >
          Cadastrar
        </Button>
      </Box>

      {/* Lista de Agendamentos */}
      <Typography variant="h6" color="#FFD700" gutterBottom>
        Agendamentos
      </Typography>
      <Table sx={{ backgroundColor: '#2a2a2a' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#FFD700' }}>Cliente</TableCell>
            <TableCell sx={{ color: '#FFD700' }}>Telefone</TableCell>
            <TableCell sx={{ color: '#FFD700' }}>Serviço</TableCell>
            <TableCell sx={{ color: '#FFD700' }}>Barbeiro</TableCell>
            <TableCell sx={{ color: '#FFD700' }}>Data</TableCell>
            <TableCell sx={{ color: '#FFD700' }}>Horário</TableCell>
            <TableCell sx={{ color: '#FFD700' }}>Status</TableCell>
            <TableCell sx={{ color: '#FFD700' }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell sx={{ color: '#fff' }}>{schedule.user_name || 'N/A'}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{schedule.user_phone || 'N/A'}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{schedule.service_name || 'N/A'}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{schedule.barber_name || 'N/A'}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{schedule.schedule_date || 'Data Inválida'}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{schedule.schedule_time || 'Horário Inválido'}</TableCell>
              <TableCell sx={{ color: '#fff' }}>{schedule.status || 'Pendente'}</TableCell>
              <TableCell>
                {schedule.status === 'pending' && (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleStatusUpdate(schedule.id, 'approved')}
                      sx={{ mr: 1 }}
                    >
                      Aprovar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleStatusUpdate(schedule.id, 'rejected')}
                    >
                      Recusar
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default AdminDashboardPage;