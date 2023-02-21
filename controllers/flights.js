const Flight = require('../models/flight')

function index(req, res) {
    Flight.find({}, function (err, flights) {
        let sortedFlights = flights.sort((a,b)  => {
            return a.departs - b.departs
        })
        res.render('flights/', { sortedFlights })
    })
}

function newFlight(req,res) {
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { departsDate });

}

function create(req,res) {
    // remove extra white space from the cast string
    req.body.airline = req.body.airline.trim()
    if (req.body.airline) req.body.airline = req.body.airline.split(/\s*,\s*/)
    req.body.airport = req.body.airport.trim()
    req.body.airport = req.body.airport.toUpperCase()
    if (req.body.airport) req.body.airport = req.body.airport.split(/\s*,\s*/)
    for (let key in req.body) {
        if (req.body[key] === '') {
            delete req.body[key]
        }
    }

    console.log("flight creating running", req.body)
    const flight = new Flight(req.body)
    let airlineArr = req.body.airline
    let airportArr = req.body.airport
    flight.airport = airportArr[0]
    flight.airline = airlineArr[0]
    flight.save(function (err) {
        if (err) {
            console.log("ERROR!!", err)
            return res.redirect('/flights/new')
        }
        console.log(flight)
        res.redirect('/flights')
    })
}

function show(req,res) {
    Flight.findById(req.params.id, function (err, flight) {
        res.render('flights/show', { title: 'Flight Details', flight });
    });
}




module.exports = {
    index,
    new: newFlight,
    create,
    show
}


