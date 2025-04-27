const pool = require('../config/database');

exports.getServices = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM services');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar serviços' });
  }
};