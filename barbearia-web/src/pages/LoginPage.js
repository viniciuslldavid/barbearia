import React, { useContext } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AuthContext } from '../context/AuthContext';

const schema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
}).required();

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      alert('Login autorizado');
    } catch (error) {
      alert('Erro ao fazer login: ' + (error.response?.data?.message || 'Tente novamente'));
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#1a1a1a', minHeight: '100vh', mt: 8 }}>
      <Typography variant="h4" color="#FFD700" gutterBottom>
        Login
      </Typography>
      <Card sx={{ maxWidth: 400, margin: '0 auto', backgroundColor: '#2a2a2a' }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              type="email"
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
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ mt: 2, backgroundColor: '#FFD700', color: '#1a1a1a' }}
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;