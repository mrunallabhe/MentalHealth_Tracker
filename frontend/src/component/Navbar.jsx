import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav className="bg-gray-100 dark:bg-slate-900 dark:text-white p-4 shadow-md fixed top-0 w-full z-50 flex items-center justify-between">
      <div className="text-2xl font-bold">GrowMind</div>
      <div className="space-x-6 hidden md:flex">
        <Link to="/" className="text-xl hover:shadow-lg transition-all duration-300 dark:hover:text-blue-400">Home</Link>
        <Link to="/contact" className="text-xl hover:shadow-lg transition-all duration-300 dark:hover:text-blue-400">Contact</Link>
        <Link to="/about" className="text-xl hover:shadow-lg transition-all duration-300 dark:hover:text-blue-400">About</Link>

        {/* Conditionally render Login/Signup or Profile/Logout based on isLoggedIn */}
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:shadow-lg transition-all duration-300"
            >
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 hover:shadow-lg transition-all duration-300"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button className="text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
