import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-green-800">CropShield</Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link to="/" className="text-gray-900 font-bold hover:text-green-700 px-3 py-2 rounded-md text-sm">Home</Link>
            <Link to="/about" className="text-gray-900 font-bold hover:text-green-700 px-3 py-2 rounded-md text-sm">About</Link>
            {user?.role === 'admin' && (
              <Link to="/admin-map" className="text-gray-900 font-bold hover:text-green-700 px-3 py-2 rounded-md text-sm">Disease Map</Link>
            )}
            {user ? (
              <>
                <span className="text-sm font-semibold text-gray-800">Hi, {user.name} ({user.role})</span>
                <button onClick={handleLogout} className="text-gray-900 font-bold hover:text-red-600 px-3 py-2 rounded-md text-sm">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-900 font-bold hover:text-green-700 px-3 py-2 rounded-md text-sm">Login</Link>
                <Link to="/signup" className="bg-green-700 text-white hover:bg-green-800 px-4 py-2 rounded-md text-sm font-medium transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
