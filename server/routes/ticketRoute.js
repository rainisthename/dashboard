const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');


router.route('/')
    .get(ticketController.getAllTickets)
    .post(ticketController.createNewTicket);

router.route('/:ticketId')
    .get(ticketController.getTicketById)
    .delete(ticketController.deleteTicket)
    .put(ticketController.updateTicket);

router.route('/status/:ticketId')
    .put(ticketController.updateTicketStatus);

module.exports = router;
