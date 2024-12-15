const Router=require('express').Router();
const bookingController=require('../Controllers/bookingController')
Router.post('/bookings',bookingController.postBookings)
Router.get('/bookings',bookingController.getallBooking)
Router.get('/bookings/:id',bookingController.getBookings)
module.exports = Router;