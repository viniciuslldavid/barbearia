import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import { register } from '../services/api';

// Esquema de validação com yup
const schema = yup.object({
  name: yup.string().required('Nome é obrigatório').min(2, 'Mínimo de 2 caracteres'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatória').min(6, 'Mínimo de 6 caracteres'),
  phone: yup.string().required('Telefone é obrigatório').matches(/^\d{8,}$/, 'Telefone inválido'),
}).required();

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register: formRegister, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await register(data.name, data.email, data.password, data.phone);
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      alert('Erro ao cadastrar: ' + (error.response?.data?.message || 'Tente novamente'));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1a1a1a' }}>
      <Card sx={{ maxWidth: 400, padding: 2, backgroundColor: '#2a2a2a' }}>
        <CardContent>
          <Typography variant="h5" color="#FFD700" align="center" gutterBottom>
            Cadastro
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Nome"
              margin="normal"
              variant="outlined"
              {...formRegister('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              {...formRegister('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
            />
            <TextField
              fullWidth
              label="Senha"
              type="password"
              margin="normal"
              variant="outlined"
              {...formRegister('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
            />
            <TextField
              fullWidth
              label="Telefone"
              margin="normal"
              variant="outlined"
              {...formRegister('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              sx={{ input: { color: '#fff' }, label: { color: '#FFD700' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#FFD700' } } }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ marginTop: 2, backgroundColor: '#FFD700', color: '#1a1a1a' }}
            >
              Cadastrar
            </Button>
          </form>
          <Typography
            align="center"
            sx={{ marginTop: 2, color: '#FFD700', cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Já tem conta? Faça login
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;