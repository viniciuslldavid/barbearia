import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { register as registerUser } from '../services/api';

const schema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
  phone: yup.string().required('Telefone é obrigatório'),
}).required();

const RegisterPage = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password, data.phone);
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao registrar');
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#1a1a1a', minHeight: '100vh', mt: 8 }}>
      <Typography variant="h4" color="#FFD700" gutterBottom>
        Registrar
      </Typography>
      {success ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          Registro criado com sucesso! Faça login para continuar.
        </Alert>
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: '0 auto' }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Nome"
            margin="normal"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
          />
          <TextField
            fullWidth
            label="Senha"
            type="password"
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
          />
          <TextField
            fullWidth
            label="Telefone"
            margin="normal"
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2, backgroundColor: '#FFD700', color: '#1a1a1a' }}
          >
            Registrar
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default RegisterPage;