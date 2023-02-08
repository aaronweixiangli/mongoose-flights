const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    delete: deleteFlight
}

function deleteFlight(req, res) {
    // delete the tickets for that flight
    Flight.find({'_id': req.params.id}, function(err, flight) {
        Ticket.deleteMany({'flight': req.params.id}, function(err, flight){});
  });
    // delete flight object with unique id
    Flight.deleteOne({'_id': req.params.id}, function(err, flight) {
        res.redirect('/flights');
  });
}

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight){
        Ticket.find({flight: flight._id}, function(err, tickets) {
            const dt = flight.departs;
            // Format the date for the value attribute of the input
            let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
            departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
            res.render(`flights/show`, {
                title: 'Flight Detail',
                flight,
                airports: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN', 'SEA'],
                departsDate,
                tickets
             });
        });
    });
};


function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const flight = new Flight(req.body);
    flight.save(function(err) {
        if (err) return res.redirect('/flights/new');
        res.redirect('/flights');
    });
}

function newFlight(req, res){
    const newFlight = new Flight();
    // Obtain the default date
    const dt = newFlight.departs;
    // Format the date for the value attribute of the input
    let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1).toString().padStart(2, '0')}`;
    departsDate += `-${dt.getDate().toString().padStart(2, '0')}T${dt.toTimeString().slice(0, 5)}`;
    res.render('flights/new', { title: 'Add Flight', departsDate });
}

function index(req, res) {
    Flight.find({}, function(err, flights) {
        flights = flights.sort((a,b) => a.departs - b.departs);
        res.render('flights/index', {
            title: 'All Flights',
            flights
        });
    });
}