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

exports.createPublicSchedule = async (req, res) => {
  const { serviceId, barberId, date, time, userName, userPhone } = req.body;

  if (!userName || !userPhone) {
    return res.status(400).json({ message: 'Nome e telefone são obrigatórios para agendamentos sem login' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO schedules (user_id, service_id, barber_id, schedule_date, schedule_time, user_name, user_phone) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [null, serviceId, barberId, date, time, userName, userPhone]
    );
    res.status(201).json({ message: 'Agendamento criado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar agendamento' });
  }
};

exports.getUserSchedules = async (req, res) => {
  console.log('Acessando endpoint /schedules'); // Log para depuração
  const userId = req.user.id;
  try {
    const [schedules] = await pool.query(
      `SELECT s.id, s.schedule_date, s.schedule_time, sv.name as service_name, b.name as barber_name
       FROM schedules s
       JOIN services sv ON s.service_id = sv.id
       JOIN barbers b ON s.barber_id = b.id
       WHERE s.user_id = ? AND s.schedule_date >= CURDATE()`,
      [userId]
    );
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter agendamentos' });
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const [schedules] = await pool.query(
      `SELECT s.id, COALESCE(s.user_name, u.name) as user_name, s.user_phone, sv.name as service_name, b.name as barber_name, s.schedule_date, s.schedule_time
       FROM schedules s
       LEFT JOIN users u ON s.user_id = u.id
       JOIN services sv ON s.service_id = sv.id
       JOIN barbers b ON s.barber_id = b.id`
    );
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter agendamentos' });
  }
};