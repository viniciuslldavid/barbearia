import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
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
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#1a1a1a', minHeight: '100vh', mt: 8 }}>
      <Typography variant="h4" color="#FFD700" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 400, margin: '0 auto' }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
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
        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ mt: 2, backgroundColor: '#FFD700', color: '#1a1a1a' }}
        >
          Entrar
        </Button>
        <Typography sx={{ mt: 2, color: '#FFFFFF', textAlign: 'center' }}>
          Não tem uma conta?{' '}
          <Link component={RouterLink} to="/register" sx={{ color: '#FFD700' }}>
            Registre-se
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;