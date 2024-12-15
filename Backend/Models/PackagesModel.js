const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        trim: true 
    },
    description: {
        type: String,
        required: true, 
        trim: true
    },
    price: {
        type: Number,
        required: true, 
        min: 0 
    },
    availableDates: {
        type: [Date], 
        required: true 
        },
    image: {
        type: String,
        required: true, 
        trim: true
    }
}, { timestamps: true }); 

// Create the model
const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
