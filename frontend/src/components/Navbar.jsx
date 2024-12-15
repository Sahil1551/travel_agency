import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white">
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <Link to={'/'} className="hover:opacity-80 transition">
            Travel<span className="text-yellow-300">Go</span>
          </Link>
        </div>

        {/* Links for Desktop */}
        <ul className="hidden md:flex gap-6 font-medium">
          <li>
          <Link to={'/Destinations'} className="hover:text-blue-500 transition">
                Destinations
              </Link>
          </li>
          
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white text-black">
          <ul className="flex flex-col gap-4 text-center py-4">
            <li>
              <Link to={'/Destinations'} className="hover:text-blue-500 transition">
                Destinations
              </Link>
            </li>
            
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
