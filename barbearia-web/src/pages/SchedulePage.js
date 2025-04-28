import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, MenuItem, Select, Button, FormControl, InputLabel } from '@mui/material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getBarbers, getServices, createSchedule, createPublicSchedule, getAvailableTimes } from '../services/api';
import '../styles/fullcalendar.css';

const SchedulePage = ({ user }) => {
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: '',
    barberId: '',
    date: '',
    time: '',
    userName: '',
    userPhone: '',
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [barbersResponse, servicesResponse] = await Promise.all([getBarbers(), getServices()]);
        setBarbers(barbersResponse.data);
        setServices(servicesResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    fetchData();
  }, []);

  const handleDateSelect = async (selectInfo) => {
    const selectedDate = selectInfo.startStr; // Formato: YYYY-MM-DD
    setFormData({ ...formData, date: selectedDate });

    if (formData.barberId) {
      try {
        const response = await getAvailableTimes(selectedDate, formData.barberId);
        setAvailableTimes(response.data);
      } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error);
        setAvailableTimes([]);
      }
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'barberId' && formData.date) {
      try {
        const response = await getAvailableTimes(formData.date, value);
        setAvailableTimes(response.data);
      } catch (error) {
        console.error('Erro ao buscar horários disponíveis:', error);
        setAvailableTimes([]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await createSchedule({
          serviceId: formData.serviceId,
          barberId: formData.barberId,
          date: formData.date,
          time: formData.time,
        });
      } else {
        await createPublicSchedule({
          serviceId: formData.serviceId,
          barberId: formData.barberId,
          date: formData.date,
          time: formData.time,
          userName: formData.userName,
          userPhone: formData.userPhone,
        });
      }
      alert('Agendamento criado com sucesso!');
      navigate(user ? '/my-schedules' : '/');
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      alert('Erro ao criar agendamento.');
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#1a1a1a', minHeight: '100vh', mt: 8 }}>
      <Typography variant="h4" color="#FFD700" gutterBottom>
        Agendamento
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: '#FFD700' }}>Serviço</InputLabel>
          <Select
            name="serviceId"
            value={formData.serviceId}
            onChange={handleChange}
            required
            sx={{ color: '#fff', backgroundColor: '#2a2a2a', '& .MuiSvgIcon-root': { color: '#FFD700' } }}
          >
            {services.map((service) => (
              <MenuItem key={service.id} value={service.id}>
                {service.name} - R${service.price}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel sx={{ color: '#FFD700' }}>Barbeiro</InputLabel>
          <Select
            name="barberId"
            value={formData.barberId}
            onChange={handleChange}
            required
            sx={{ color: '#fff', backgroundColor: '#2a2a2a', '& .MuiSvgIcon-root': { color: '#FFD700' } }}
          >
            {barbers.map((barber) => (
              <MenuItem key={barber.id} value={barber.id}>
                {barber.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" color="#FFD700" gutterBottom>
            Selecione a Data
          </Typography>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            select={handleDateSelect}
            selectConstraint={{
              start: new Date(), // Impede a seleção de datas passadas
            }}
            height="auto"
            locale="pt-br"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: '',
            }}
            buttonText={{
              today: 'Hoje',
            }}
          />
        </Box>

        {formData.date && formData.barberId && (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: '#FFD700' }}>Horário Disponível</InputLabel>
            <Select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              sx={{ color: '#fff', backgroundColor: '#2a2a2a', '& .MuiSvgIcon-root': { color: '#FFD700' } }}
            >
              {availableTimes.length > 0 ? (
                availableTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time.slice(0, 5)} {/* Exibe apenas HH:MM */}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>Nenhum horário disponível</MenuItem>
              )}
            </Select>
          </FormControl>
        )}

        {!user && (
          <>
            <TextField
              label="Seu Nome"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2, backgroundColor: '#2a2a2a', input: { color: '#fff' }, label: { color: '#FFD700' } }}
            />
            <TextField
              label="Seu Telefone"
              name="userPhone"
              value={formData.userPhone}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2, backgroundColor: '#2a2a2a', input: { color: '#fff' }, label: { color: '#FFD700' } }}
            />
          </>
        )}

        <Button type="submit" variant="contained" sx={{ backgroundColor: '#FFD700', color: '#000', '&:hover': { backgroundColor: '#e6c200' } }}>
          Agendar
        </Button>
      </Box>
    </Box>
  );
};

export default SchedulePage;