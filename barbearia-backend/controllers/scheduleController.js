const pool = require('../config/database');

exports.createSchedule = async (req, res) => {
  const { serviceId, barberId, date, time } = req.body;
  const userId = req.user.id;
  try {
    const [result] = await pool.query(
      'INSERT INTO schedules (user_id, service_id, barber_id, schedule_date, schedule_time) VALUES (?, ?, ?, ?, ?)',
      [userId, serviceId, barberId, date, time]
    );
    res.status(201).json({ message: 'Agendamento criado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar agendamento' });
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT s.id, u.name AS user_name, sv.name AS service_name, b.name AS barber_name, s.schedule_date, s.schedule_time
      FROM schedules s
      JOIN users u ON s.user_id = u.id
      JOIN services sv ON s.service_id = sv.id
      JOIN barbers b ON s.barber_id = b.id
      ORDER BY s.schedule_date, s.schedule_time
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar agendamentos' });
  }
};