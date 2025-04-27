const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const serviceController = require('../controllers/serviceController');
const barberController = require('../controllers/barberController');
const scheduleController = require('../controllers/scheduleController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users/profile', authMiddleware, userController.getProfile);
router.get('/services', serviceController.getServices);
router.get('/barbers', barberController.getBarbers);
router.post('/schedules', authMiddleware, scheduleController.createSchedule);
router.get('/admin/schedules', adminMiddleware, scheduleController.getAllSchedules);

module.exports = router;