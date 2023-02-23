const Ticket = require('../models/ticket');
const Flight = require('../models/flight');

module.exports = {
    addToFlight
};




function addToFlight(req,res) {
    console.log("request body:", req.body)

        Ticket.create(req.body, function (err, ticket) {
            ticket.flight = req.params.id
            ticket.save(function(err) {

            })
            Flight.findById(req.params.id, function (err, flight) {
                // console.log("Tickets for flight:", flight.tickets[0])
                flight.tickets.push(ticket);
                flight.save(function (err) {
                    res.redirect(`/flights/${flight._id}`);
                });
            });

            })

    
        
}