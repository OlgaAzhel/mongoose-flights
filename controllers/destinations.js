const Flight = require('../models/flight');

module.exports = {
    create
};

function create(req, res) {
    Flight.findById(req.params.id, function (err, flight) {
        // We push an object with the data for the
        // review subdoc into Mongoose arrays
        flight.destinations.push(req.body);
        flight.save(function (err) {
            // Step 5
            res.redirect(`/flights/${flight._id}`);
        });
    });
}