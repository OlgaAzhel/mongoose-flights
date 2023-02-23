const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');
// GET /tickets/new
router.get('/tickets/new', ticketsCtrl.new);
// POST /tickets
router.post('/tickets', ticketsCtrl.create);
// POST /flightss/:id/tickets (assoc flight & ticket)
router.post('/flights/:id/tickets', ticketsCtrl.addToFlight);
module.exports = router;