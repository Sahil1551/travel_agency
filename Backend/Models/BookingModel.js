const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        trim: true
    },
    email: {
        type: String,
        required: true, 
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'] 
    },
    phoneNumber: {
        type: String,
        required: true, 
        trim: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'] 
    },
    numberOfTravelers: {
        type: Number,
        required: true, 
        min: 1 
    },
    specialRequests: {
        type: String, 
        trim: true,
        default: "" 
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true 
    }
}, { timestamps: true }); 

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
