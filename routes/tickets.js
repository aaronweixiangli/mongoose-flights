var express = require('express');
var router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

// Mount to '/'

// GET /flights/:id/tickets/new
router.get('/flights/:id/tickets/new', ticketsCtrl.new);

// POST /flights/:id/tickets
router.post('/flights/:id/tickets', ticketsCtrl.create);

// DELETE /flights/:id/tickets/:ticketId
router.delete('/flights/:id/tickets/:ticketId', ticketsCtrl.delete);

module.exports = router;