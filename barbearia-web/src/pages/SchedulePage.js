import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, MenuItem, Button, Card, CardContent, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { getServices, getBarbers, createSchedule, createPublicSchedule } from '../services/api';

const schema = yup.object({
  serviceId: yup.number().required('Selecione um serviço'),
  barberId: yup.number().required('Selecione um barbeiro'),
  date: yup.string().required('Selecione uma data'),
  time: yup.string().required('Selecione um horário'),
  userName: yup.string().when('$isLoggedIn', {
    is: false,
    then: yup.string().required('Nome é obrigatório quando não está logado'),
    otherwise: yup.string().notRequired(),
  }),
  userPhone: yup.string().when('$isLoggedIn', {
    is: false,
    then: yup.string().required('Telefone é obrigatório quando não está logado'),
    otherwise: yup.string().notRequired(),
  }),
}).required();

const SchedulePage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
    context: { isLoggedIn },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await getServices();
        setServices(servicesResponse.data);
        const barbersResponse = await getBarbers();
        setBarbers(barbersResponse.data);
      } catch (error) {
        alert('Erro ao carregar dados: ' + (error.response?.data?.message || 'Tente novamente'));
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (isLoggedIn) {
        await createSchedule(data.serviceId, data.barberId, data.date, data.time);
      } else {
        await createPublicSchedule(data.serviceId, data.barberId, data.date, data.time, data.userName, data.userPhone);
      }
      alert('Agendamento realizado com sucesso!');
      navigate('/');
    } catch (error) {
      alert('Erro ao criar agendamento: ' + (error.response?.data?.message || 'Tente novamente'));
    }
  };

  const times = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#1a1a1a', minHeight: '100vh', mt: 8 }}>
      <Typography variant="h4" color="#FFD700" gutterBottom>
        Agendamento
      </Typography>
      <Alert severity="info" sx={{ mb: 3 }}>
        Você pode agendar sem fazer login. No entanto, para ver seus agendamentos futuros, é necessário registrar-se e fazer login.
      </Alert>
      <Card sx={{ maxWidth: 600, margin: '0 auto', backgroundColor: '#2a2a2a' }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              select
              fullWidth
              label="Serviço"
              margin="normal"
              {...register('serviceId')}
              error={!!errors.serviceId}
              helperText={errors.serviceId?.message}
              sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
            >
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.name} - R${(parseFloat(service.price) || 0).toFixed(2)}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              fullWidth
              label="Barbeiro"
              margin="normal"
              {...register('barberId')}
              error={!!errors.barberId}
              helperText={errors.barberId?.message}
              sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
            >
              {barbers.map((barber) => (
                <MenuItem key={barber.id} value={barber.id}>
                  {barber.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Data"
              type="date"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...register('date')}
              error={!!errors.date}
              helperText={errors.date?.message}
              sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
            />

            <TextField
              select
              fullWidth
              label="Horário"
              margin="normal"
              {...register('time')}
              error={!!errors.time}
              helperText={errors.time?.message}
              sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
            >
              {times.map((time) => (
                <MenuItem key={time} value={time}>
                  {time}
                </MenuItem>
              ))}
            </TextField>

            {!isLoggedIn && (
              <>
                <TextField
                  fullWidth
                  label="Seu Nome"
                  margin="normal"
                  {...register('userName')}
                  error={!!errors.userName}
                  helperText={errors.userName?.message}
                  sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
                />
                <TextField
                  fullWidth
                  label="Seu Telefone"
                  margin="normal"
                  {...register('userPhone')}
                  error={!!errors.userPhone}
                  helperText={errors.userPhone?.message}
                  sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
                />
              </>
            )}

            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 2, backgroundColor: '#FFD700', color: '#1a1a1a' }}
            >
              Agendar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SchedulePage;