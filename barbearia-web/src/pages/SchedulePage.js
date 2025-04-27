import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { getServices, getBarbers, createSchedule } from '../services/api';
import { ptBR } from 'date-fns/locale';

const SchedulePage = () => {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [barberId, setBarberId] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await getServices();
        const barbersResponse = await getBarbers();
        setServices(servicesResponse.data);
        setBarbers(barbersResponse.data);
      } catch (error) {
        alert('Erro ao carregar dados: ' + (error.response?.data?.message || 'Tente novamente'));
      }
    };
    fetchData();
  }, []);

  const handleSchedule = async () => {
    if (!serviceId || !barberId || !date || !time) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    try {
      const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const formattedTime = time.toTimeString().split(' ')[0]; // HH:MM:SS
      await createSchedule(serviceId, barberId, formattedDate, formattedTime);
      alert('Agendamento realizado com sucesso!');
    } catch (error) {
      alert('Erro ao agendar: ' + (error.response?.data?.message || 'Tente novamente'));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a1a' }}>
        <Card sx={{ maxWidth: 400, padding: 2, backgroundColor: '#2a2a2a' }}>
          <CardContent>
            <Typography variant="h5" color="#FFD700" align="center" gutterBottom>
              Agendamento
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel sx={{ color: '#FFD700' }}>Serviço</InputLabel>
              <Select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                sx={{ color: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' } }}
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name} - R${service.price}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel sx={{ color: '#FFD700' }}>Barbeiro</InputLabel>
              <Select
                value={barberId}
                onChange={(e) => setBarberId(e.target.value)}
                sx={{ color: '#fff', '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD700' } }}
              >
                {barbers.map((barber) => (
                  <MenuItem key={barber.id} value={barber.id}>
                    {barber.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <DatePicker
              label="Data"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              slotProps={{ textField: { fullWidth: true, margin: 'normal', sx: { input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } } } }}
            />
            <TimePicker
              label="Hora"
              value={time}
              onChange={(newValue) => setTime(newValue)}
              slotProps={{ textField: { fullWidth: true, margin: 'normal', sx: { input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } } } }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleSchedule}
              sx={{ marginTop: 2, backgroundColor: '#FFD700', color: '#1a1a1a' }}
            >
              Agendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </LocalizationProvider>
  );
};

export default SchedulePage;