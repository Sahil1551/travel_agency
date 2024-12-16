import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    availableDates: [],
    image: "",
  });
  const [newDate, setNewDate] = useState("");
  const [imageFile, setImageFile] = useState(null); 

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const packageResponse = await axios.get("https://travel-agency-six-ashy.vercel.app/api/packages");
        const bookingResponse = await axios.get("https://travel-agency-six-ashy.vercel.app/api/bookings");
        setPackages(packageResponse.data.data);
        setBookings(bookingResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addDate = () => {
    if (newDate && !formData.availableDates.includes(newDate)) {
      setFormData((prev) => ({
        ...prev,
        availableDates: [...prev.availableDates, newDate],
      }));
      setNewDate("");
    }
  };

  const removeDate = (dateToRemove) => {
    setFormData((prev) => ({
      ...prev,
      availableDates: prev.availableDates.filter((date) => date !== dateToRemove),
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;
  
      if (imageFile) {
        const imageData = new FormData();
        imageData.append("file", imageFile);
        imageData.append("upload_preset", "booking");
  
        const imageResponse = await axios.post("https://travel-agency-six-ashy.vercel.app/api/upload", imageData);
        imageUrl = imageResponse.data.url; 
      }
  
      const payload = { ...formData, image: imageUrl };
  
      if (formData._id) {
        
        const response = await axios.put(
          `https://travel-agency-six-ashy.vercel.app/admin/packages/${formData._id}`,
          payload
        );
setPackages((prev) =>
prev.map((pkg) => (pkg._id === formData._id ? response.data : pkg))
);

      } else {
        const response = await axios.post("https://travel-agency-six-ashy.vercel.app/admin/packages", payload);
        setPackages((prev) => [...prev, response.data.data]);
      }
  
      setFormData({
        title: "",
        description: "",
        price: "",
        availableDates: [],
        image: "",
      });
      setImageFile(null); 
    } catch (error) {
      console.error("Error saving package:", error);
    }
  };
  

  const handleEdit = (pkg) => {
    setFormData(pkg);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://travel-agency-six-ashy.vercel.app/admin/packages/${id}`);
      
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id)); 
    } catch (error) {
      console.error("Error deleting package:", error);
    }
  };
  
  const getPackageName = (packageId) => {
    const matchedPackage = packages.find((pkg) => pkg.id === packageId);
    return matchedPackage ? matchedPackage.title : "N/A";
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
  
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <h2 className="text-xl font-bold">Add/Update Package</h2>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Package Name"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
  
        <div>
          <label className="block mb-2">Available Dates:</label>
          <div className="flex flex-wrap space-x-2 items-center mb-2">
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="p-2 border rounded"
            />
            <button
              type="button"
              onClick={addDate}
              className="bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700"
            >
              Add Date
            </button>
          </div>
          <ul className="list-disc pl-6">
            {formData.availableDates.map((date, index) => (
              <li key={index} className="flex justify-between items-center">
                {new Date(date).toLocaleDateString()}
                <button
                  type="button"
                  onClick={() => removeDate(date)}
                  className="text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label className="block mb-2">Image:</label>
          <input type="file" onChange={handleImageChange} className="block" />
          {formData.image && <img src={formData.image} alt="Preview" className="mt-2 h-20" />}
        </div>
  
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {formData._id ? "Update Package" : "Add Package"}
        </button>
      </form>
  
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Tour Packages</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Price</th>
                <th className="border px-4 py-2">Available Dates</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg) => (
                <tr key={pkg._id}>
                  <td className="border px-4 py-2">{pkg.title}</td>
                  <td className="border px-4 py-2">${pkg.price}</td>
                  <td className="border px-4 py-2">
                    {pkg.availableDates.map((date) => (
                      <div key={date}>{new Date(date).toLocaleDateString()}</div>
                    ))}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="bg-yellow-600 text-white py-1 px-2 rounded hover:bg-yellow-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg._id)}
                      className="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  
      <div>
        <h2 className="text-xl font-bold mb-4">Submitted Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Selected Package</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="border px-4 py-2">{booking.name}</td>
                  <td className="border px-4 py-2">{booking.email}</td>
                  <td className="border px-4 py-2">{booking.phoneNumber}</td>
                  <td className="border px-4 py-2">{getPackageName(booking.packageId)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  };

export default Admin;
