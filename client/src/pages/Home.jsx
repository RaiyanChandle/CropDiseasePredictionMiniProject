import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-5xl font-extrabold text-green-700 dark:text-green-400 mb-6 tracking-tight">
        Crop Disease Predictor
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
        Empowering farmers with AI-driven insights. Upload an image of your crop leaves, and instantly identify potential diseases to protect your harvest.
      </p>
      
      <div className="flex space-x-4">
        <Link 
          to="/signup" 
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
        >
          Get Started
        </Link>
        <Link 
          to="/login" 
          className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg font-semibold hover:bg-green-50 dark:bg-gray-800 dark:text-green-400 transition shadow-lg"
        >
          Login
        </Link>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Farmer First</h3>
          <p className="text-gray-600 dark:text-gray-400">Easily diagnose crops on the go and get actionable insights to save your yield.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Location Insights</h3>
          <p className="text-gray-600 dark:text-gray-400">Track disease spread by saving your farm's location for better regional analysis.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Admin Dashboard</h3>
          <p className="text-gray-600 dark:text-gray-400">Admins can analyze collected data to monitor trends and provide regional support.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
