import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Adminlogin from './components/Adminlogin';
import Home from './components/Home';
import Package from './components/Package';
import Footer from './components/Footer';
import Invoice from './components/Invoice';
import Dest from './components/dest';
import Admin from './components/Admin';

// Exporting AuthContext
export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default is not logged in

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
<div className="flex flex-col min-h-screen">
  <Navbar />
  <div className="flex-grow">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/Destinations' element={<Dest />} />
      <Route path="/admin-logined" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/admin" element={<Adminlogin />} />
      <Route path="/packages/:id" element={<Package />} />
      <Route path='/invoice/:id' element={<Invoice />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </div>
  <Footer />
</div>
</Router>

    </AuthContext.Provider>
  );
}
// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/admin" />;
  }

  return children;
}

export default App;
