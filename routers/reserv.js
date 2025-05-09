const express = require('express');
const router = express.Router();
const { courtController, bookingController } = require('../controllers/reservation');

// Rotas para quadras
router.get('/courts', courtController.getAllCourts);
router.post('/courts', courtController.createCourt);

// Rotas para reservas
router.get('/bookings', bookingController.showAllBookings);
router.post('/bookings', bookingController.createBooking);

module.exports = router;
