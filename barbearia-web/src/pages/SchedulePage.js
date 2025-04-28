import React, { useState, useEffect, useContext } from 'react';
import { Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../context/AuthContext';
import { getServices, getBarbers, createSchedule, createPublicSchedule } from '../services/api';
import { addYears, format } from 'date-fns';

const getSchema = (isLoggedIn) => yup.object({
  serviceId: yup.number().required('Serviço é obrigatório'),
  barberId: yup.number().required('Barbeiro é obrigatório'),
  date: yup
    .string()
    .required('Data é obrigatória')
    .test('is-future-date', 'A data deve ser entre hoje e 1 ano no futuro', (value) => {
      const selectedDate = new Date(value);
      const today = new Date();
      const maxDate = addYears(today, 1);
      return selectedDate >= today && selectedDate <= maxDate;
    }),
  time: yup.string().required('Horário é obrigatório'),
  userName: yup.string().when([], {
    is: () => !isLoggedIn,
    then: (schema) => schema.required('Nome é obrigatório para agendamentos sem login'),
    otherwise: (schema) => schema.notRequired(),
  }),
  userPhone: yup.string().when([], {
    is: () => !isLoggedIn,
    then: (schema) => schema.required('Telefone é obrigatório para agendamentos sem login'),
    otherwise: (schema) => schema.notRequired(),
  }),
}).required();

const SchedulePage = () => {
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(getSchema(isLoggedIn)),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesResponse, barbersResponse] = await Promise.all([
          getServices(),
          getBarbers(),
        ]);
        setServices(servicesResponse.data);
        setBarbers(barbersResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const formattedTime = data.time.includes(':') && data.time.split(':').length === 2 ? `${data.time}:00` : data.time;

      if (isLoggedIn) {
        await createSchedule(data.serviceId, data.barberId, data.date, formattedTime);
      } else {
        await createPublicSchedule(data.serviceId, data.barberId, data.date, formattedTime, data.userName, data.userPhone);
      }
      setSuccess(true);
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
    }
  };

  const today = format(new Date(), 'yyyy-MM-dd');
  const maxDate = format(addYears(new Date(), 1), 'yyyy-MM-dd');

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#1a1a1a', minHeight: '100vh', mt: 8 }}>
      <Typography variant="h4" color="#FFD700" gutterBottom>
        Agendamento
      </Typography>
      {success ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          Agendamento criado com sucesso!
        </Alert>
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, margin: '0 auto' }}>
          <FormControl fullWidth margin="normal" error={!!errors.serviceId}>
            <InputLabel sx={{ color: '#FFD700' }}>Serviço</InputLabel>
            <Select
              {...register('serviceId')}
              defaultValue=""
              sx={{ color: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' } }}
            >
              <MenuItem value="">Selecione um serviço</MenuItem>
              {services.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
            {errors.serviceId && <Typography color="error">{errors.serviceId.message}</Typography>}
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.barberId}>
            <InputLabel sx={{ color: '#FFD700' }}>Barbeiro</InputLabel>
            <Select
              {...register('barberId')}
              defaultValue=""
              sx={{ color: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' } }}
            >
              <MenuItem value="">Selecione um barbeiro</MenuItem>
              {barbers.map((barber) => (
                <MenuItem key={barber.id} value={barber.id}>
                  {barber.name}
                </MenuItem>
              ))}
            </Select>
            {errors.barberId && <Typography color="error">{errors.barberId.message}</Typography>}
          </FormControl>

          <TextField
            fullWidth
            label="Data"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true, style: { color: '#FFD700' } }}
            InputProps={{ style: { color: '#fff' }, min: today, max: maxDate }}
            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
            {...register('date')}
            error={!!errors.date}
            helperText={errors.date?.message}
          />

          <TextField
            fullWidth
            label="Horário"
            type="time"
            margin="normal"
            InputLabelProps={{ shrink: true, style: { color: '#FFD700' } }}
            InputProps={{ style: { color: '#fff' } }}
            sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
            {...register('time')}
            error={!!errors.time}
            helperText={errors.time?.message}
          />

          {!isLoggedIn && (
            <>
              <TextField
                fullWidth
                label="Nome"
                margin="normal"
                {...register('userName')}
                error={!!errors.userName}
                helperText={errors.userName?.message}
                sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
              />
              <TextField
                fullWidth
                label="Telefone"
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
        </Box>
      )}
    </Box>
  );
};

export default SchedulePage;