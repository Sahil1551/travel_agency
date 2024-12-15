const Packages=require('../Models/PackagesModel')
const Bookings=require('../Models/BookingModel')
const validator = require('validator'); 

const bookingController={
    getallBooking:async(req,res)=>{
        try {
            const BOOKING = await Bookings.find({});
            res.status(200).json({ message: "Available packages", data: BOOKING });
        } catch (error) {
            console.error("Error fetching Bookings:", error.message);
        }
    },
    getBookings:async(req,res)=>{
        try {
            const {id}=req.params;
            const booking = await Bookings.findById(id);

            if (!booking) {
                return res.status(404).json({ message: "booking not found" });
            }

            res.status(200).json({
                message: "Package retrieved successfully",
                data: booking
            });
        }
        catch (error) {
            console.error("Error fetching specific package:", error.message);

            if (error.kind === "ObjectId") {
                return res.status(400).json({ message: "Invalid package ID format" });
            }

            res.status(500).json({
                message: "Failed to retrieve package",
                error: error.message
            });
        }
    },
    postBookings:async(req,res)=>{
        const { name, email, phoneNumber, numberOfTravelers, specialRequests, package } = req.body;

        if (!name || !email || !phoneNumber || !numberOfTravelers || !specialRequests || !package) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (phoneNumber.length < 10 || phoneNumber.length > 15) {
            return res.status(400).json({ message: "Phone number must be between 10 and 15 characters" });
        }

        if (numberOfTravelers <= 0) {
            return res.status(400).json({ message: "Number of travelers must be greater than 0" });
        }

        if (specialRequests.length > 500) {
            return res.status(400).json({ message: "Special requests should not exceed 500 characters" });
        }

        try {
            const selectedPackage = await Packages.findById(package);
            if (!selectedPackage) {
                return res.status(404).json({ message: "Package not found" });
            }

            const newBooking = new Bookings({
                name,
                email,
                phoneNumber,
                numberOfTravelers,
                specialRequests,
                package
            });

            await newBooking.save();
            res.status(201).json({ message: "Booking created successfully", data: newBooking });
        } catch (error) {
            console.error("Error creating booking:", error.message);
            res.status(500).json({ message: "Error creating booking", error: error.message });
        }
    }
}

module.exports=bookingController;