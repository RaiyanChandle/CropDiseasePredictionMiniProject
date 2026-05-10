import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">Page not found</p>
      <Link to="/" className="text-blue-500 hover:underline">Go back home</Link>
    </div>
  );
};

export default NotFound;
