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
    <nav className="bg-green-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-white">CropShield</Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link to="/" className="text-white font-medium hover:text-green-200 px-3 py-2 rounded-md text-sm">Home</Link>
            <Link to="/about" className="text-white font-medium hover:text-green-200 px-3 py-2 rounded-md text-sm">About</Link>
            {user?.role === 'admin' && (
              <Link to="/admin-map" className="text-white font-medium hover:text-green-200 px-3 py-2 rounded-md text-sm">Disease Map</Link>
            )}
            {user ? (
              <>
                <span className="text-sm font-medium text-green-100">Hi, {user.name} ({user.role})</span>
                <button onClick={handleLogout} className="text-white font-medium hover:text-red-300 px-3 py-2 rounded-md text-sm">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white font-medium hover:text-green-200 px-3 py-2 rounded-md text-sm">Login</Link>
                <Link to="/signup" className="bg-white text-green-800 hover:bg-green-50 px-4 py-2 rounded-md text-sm font-bold transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
