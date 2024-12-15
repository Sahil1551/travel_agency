import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Destinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const destinationsPerPage = 9;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://travel-agency-six-ashy.vercel.app/api/packages');
        console.log(response.data.data); // Debugging data
        setDestinations(response.data.data || []);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  const filteredDestinations = destinations.filter((destination) =>
    destination.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDestinations = filteredDestinations.sort((a, b) => {
    if (sortOption === 'name') {
      return a.title?.localeCompare(b.title);
    } else if (sortOption === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  const indexOfLastDestination = currentPage * destinationsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
  const currentDestinations = sortedDestinations.slice(
    indexOfFirstDestination,
    indexOfLastDestination
  );

  const totalPages = Math.ceil(sortedDestinations.length / destinationsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = (id) => {
    navigate(`/packages/${id}`)
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Destinations</h1>

      <div className="flex mb-4 space-x-4">
        <input
          type="text"
          placeholder="Search Destinations"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentDestinations.map((destination) => (
          <div
            key={destination._id}
            className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={destination.image || 'default-image.jpg'}
              alt={destination.title || 'Destination'}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{destination.title}</h3>
              <p className="text-gray-600 text-lg mb-4">{destination.description}</p>
              <p className="text-gray-600 text-lg mb-4">Price: ${destination.price}</p>
              <button
                onClick={() => handleClick(destination._id)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-200"
              >
                Explore Now
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 border rounded bg-gray-200"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-2 border rounded ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 border rounded bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Destinations;
