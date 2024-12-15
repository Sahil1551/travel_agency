import React,{useState,useEffect} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Destinations = () => {
  const navigate = useNavigate();
  const handleClick=(_id)=>
  {
    navigate(`/packages/${_id}`)
  }
  const [destinations,setdestinations]=useState([]);
  useEffect(() => {
    const fetchdata=async()=>{
      await axios
      .get('https://travel-agency-six-ashy.vercel.app/api/packages') // Make sure this URL is correct according to your API setup
      .then((response) => {

        setdestinations(response.data.data); // Set the fetched data into state
       
      })
      .catch((err) => {
        console.log(err.message)
      });}
      fetchdata()
  }, []); 

  return (
    <div className="py-16 px-4">
        
      <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>

      {/* Grid Layout: 4 cards per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {destinations.map((destination, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={destination.image}
              alt={destination.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{destination.title}</h3>
              <p className="text-gray-600 text-lg mb-4">{destination.description}</p>
              <button
        onClick={()=>handleClick(destination._id)}
        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-200"
      >
        Explore Now
      </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destinations;
