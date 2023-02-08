const Ticket = require('../models/ticket');

module.exports = {
    new: newTicket,
    create,
    delete: deleteTicket
};

function deleteTicket(req, res) {
    // delete object with unique id
    Ticket.deleteOne({'_id': req.params.ticketId}, function(err, ticket) {
        res.redirect(`/flights/${req.params.id}`);
  });
}

function newTicket(req, res) {
    res.render('tickets/new', {
        title: 'Add Ticket',
        id: req.params.id
    });
}

function create(req, res) {
    req.body.flight = req.params.id;
    Ticket.create(req.body, function(err, ticket) {
        if (err) return res.redirect(`/flights/${req.params.id}/tickets/new`);
        res.redirect(`/flights/${req.params.id}`);
    })
}
