const express = require('express');
const cors = require('cors');
const app = express();

// Configurar CORS para permitir requisições de http://localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Rotas
app.use('/api', require('./routes/api')); // Inclui rotas de login e register
app.use('/schedules', require('./routes/scheduleRoutes'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});