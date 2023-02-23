const mongoose = require('mongoose')
// Shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']},
    arrival: {
        type: Date
    }
})

const flightSchema = new Schema({
    airline: {type: String, 
    enum: ['American', 'Southwest', 'United', 'Spirit']},
    airport: {type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'},
    flightNo: {type: Number,
        required: true,
            min: 10,
            max: 9999,
        },
    departs: {
        type: Date,
        default: function() {
            let dateCreate =  new Date()
            let currentYear = dateCreate.getFullYear()
            let nextYear = currentYear + 1
            dateCreate.setFullYear(nextYear)
            return dateCreate

        }
    },
    destinations: [destinationSchema],
    tickets: {type: Schema.Types.ObjectId,
    ref: 'Ticket'}
    }, {
    timestamps: true
})

module.exports = mongoose.model('Flight', flightSchema)