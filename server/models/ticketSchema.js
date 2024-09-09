const mongoose = require('mongoose')
const ticketSchema = new mongoose.Schema({}, {
    strict: false,
    timestamps: true 
});


module.exports = mongoose.model('Ticket', ticketSchema)