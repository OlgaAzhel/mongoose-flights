const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    new: newTicket,
    create,
    addToFlight
};

function newTicket(req,res) {
    res.render('tickets/new', {
        title: 'Add ticket',
    })
}

function create(req,res) {
    Ticket.create(req.body, function(err, ticket) {
        res.redirect('/tickets/new')
    })
}

function addToFlight(req,res) {
    Flight.findById(req.params.id, function (err, flight) {
        flight.tickets.push(req.body.flightId);
        flight.save(function (err) {
            res.redirect(`/flights/${flight._id}`);
        });
    });
}