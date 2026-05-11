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
            <Link to="/" className="text-xl font-bold text-green-600 dark:text-green-400">CropShield</Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
            {user?.role === 'admin' && (
              <Link to="/admin-map" className="text-gray-700 dark:text-gray-200 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Disease Map</Link>
            )}
            {user ? (
              <>
                <span className="text-sm text-gray-500 dark:text-gray-400">Hi, {user.name} ({user.role})</span>
                <button onClick={handleLogout} className="text-gray-700 dark:text-gray-200 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/signup" className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md text-sm font-medium transition">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
