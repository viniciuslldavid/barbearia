import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD700', // Dourado
    },
    secondary: {
      main: '#1a1a1a', // Preto
    },
    background: {
      default: '#1a1a1a',
      paper: '#2a2a2a',
    },
    text: {
      primary: '#fff',
      secondary: '#FFD700',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#FFD700',
            },
            '&:hover fieldset': {
              borderColor: '#FFC107',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFD700',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#FFD700',
          },
          '& .MuiInputBase-input': {
            color: '#fff',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFD700',
          color: '#1a1a1a',
          '&:hover': {
            backgroundColor: '#FFC107',
          },
        },
      },
    },
  },
});

export default theme;