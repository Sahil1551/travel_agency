import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from "jspdf";
const Invoice = () => {
    const generatePDF = () => {
        const doc = new jsPDF();
    
        // Add Title
        doc.setFontSize(20);
        doc.text('Invoice', 14, 20);
    
        // Add Booking Details
        doc.setFontSize(14);
        doc.text(`Booking ID: ${booking.data._id}`, 14, 30);
        doc.text(`Date: ${new Date(booking.data.createdAt).toLocaleDateString()}`, 14, 40);
        doc.text(`Name: ${booking.data.name}`, 14, 50);
        doc.text(`Email: ${booking.data.email}`, 14, 60);
        doc.text(`Phone Number: ${booking.data.phoneNumber}`, 14, 70);
    
        // Add Package Details
        doc.text(`Package: ${packageDetails.data.title}`, 14, 80);
        doc.text(`Price: $${packageDetails.data.price}`, 14, 90);
        doc.text(`Number of Travelers: ${booking.data.numberOfTravelers}`, 14, 100);
        doc.text(`Special Requests: ${booking.data.specialRequests || 'None'}`, 14, 110);
    
        // Add Total Price
        const totalPrice = packageDetails.data.price * booking.data.numberOfTravelers;
        doc.text(`Total Price: $${totalPrice}`, 14, 120);
    
        // Download PDF
        doc.save('invoice.pdf');
      };
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        // Fetch booking details
        const bookingResponse = await axios.get(`https://travel-agency-six-ashy.vercel.app/api/bookings/${id}`);
        setBooking(bookingResponse.data);
        
        // Fetch package details using the package ID
        const packageResponse = await axios.get(`https://travel-agency-six-ashy.vercel.app/api/packages/${bookingResponse.data.data.package}`);
        setPackageDetails(packageResponse.data);
      } catch (error) {
        console.error("Error fetching booking or package details:", error);
      }
    };

    fetchBooking();
  }, [id]);

  if (!booking || !packageDetails) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">Invoice</h1>
      
      <div className="border-b-2 border-gray-300 mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Booking Details</h2>
        <p className="text-lg text-gray-600">Booking ID: {booking.data._id}</p>
        <p className="text-lg text-gray-600">Date: {new Date(booking.data.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700">Customer Information</h3>
        <p className="text-lg text-gray-600">Name: {booking.data.name}</p>
        <p className="text-lg text-gray-600">Email: {booking.data.email}</p>
        <p className="text-lg text-gray-600">Phone Number: {booking.data.phoneNumber}</p>
      </div>

      <div className="border-b-2 border-gray-300 mb-6">
        <h3 className="text-xl font-semibold text-gray-700">Package Details</h3>
        <p className="text-lg text-gray-600">Package: {packageDetails.data.title}</p>
        <p className="text-lg text-gray-600">Price: ${packageDetails.data.price}</p>
        <ul className="text-lg text-gray-600">
          <li>Number of Travelers: {booking.data.numberOfTravelers}</li>
          <li>Special Requests: {booking.data.specialRequests || "None"}</li>
        </ul>
      </div>

      <div className="mt-6 flex justify-between">
        <div className="font-bold text-lg text-gray-800">
          <p>Total Price: ${packageDetails.data.price * booking.data.numberOfTravelers}</p>
        </div>
        <div>
        <button 
            onClick={generatePDF} // Trigger PDF download on click
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
