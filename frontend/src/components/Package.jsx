import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Package = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility
  const navigate = useNavigate();
  const { id } = useParams();
  // Form data states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    numberOfTravelers: 1,
    specialRequests: '',
    package: id
  });

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Declare the postBooking function inside handleSubmit
    const postBooking = async () => {
      try {
        const response = await axios.post('https://travel-agency-six-ashy.vercel.app/api/bookings', formData);
        
        console.log('Booking successful:', response.data);
        navigate(`/invoice/${response.data.data._id}`);
        // Optionally handle success (e.g., show a success message, reset form, etc.)
      } catch (error) {
        console.error('There was an error:', error);
        // Optionally handle error (e.g., show an error message)
      }
    };
  
    // Call the postBooking function
    postBooking();
  };

  // Disable scrolling when the modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'auto'; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const [packageDetails, setPackageDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://travel-agency-six-ashy.vercel.app/api/packages/${id}`);
        setPackageDetails(response.data.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [id]);

  if (!packageDetails) {
    return <div>Loading...</div>; // Show loading while fetching
  }

  return (
    <div className="py-16 px-4 bg-gray-200">
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg w-[90vw] md:w-[60vw] lg:w-[40vw] p-8 relative">
            <h2 className="text-2xl font-bold mb-6">Book Your Adventure</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  pattern="\d{10}"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="numberOfTravelers" className="block text-gray-700">Number of Travelers</label>
                <input
                  type="number"
                  id="numberOfTravelers"
                  value={formData.numberOfTravelers}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  min="1"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="specialRequests" className="block text-gray-700">Special Requests</label>
                <textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            >
              X
            </button>
          </div>
        </div>
      )}
      <div className="max-w-4xl  mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative m-10">
          <img
            src={packageDetails.image}
            alt={packageDetails.title}
            className="w-full h-96 object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800">{packageDetails.title}</h2>
          <p className="text-lg text-gray-600 mt-4">{packageDetails.description}</p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Price: ${packageDetails.price}</h3>
            <p className="text-md text-gray-600 mt-2">Available Dates:</p>
            <ul className="list-none pl-0 space-y-2">
              {packageDetails.availableDates.map((date, index) => (
                <li key={index} className="text-sm text-gray-500">
                  {new Date(date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={openModal}
              className="bg-red-600 text-white py-3 px-6 rounded-full hover:bg-red-700 transition-all duration-200"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Package;
