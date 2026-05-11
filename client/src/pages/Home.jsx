import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import BlurText from '../components/ui/BlurText';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <BlurText
        text="Crop Disease Predictor"
        delay={100}
        animateBy="words"
        direction="top"
        className="text-5xl font-extrabold text-green-700 mb-6 tracking-tight justify-center"
      />
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Empowering farmers with AI-driven insights. Upload an image of your crop leaves, and instantly identify potential diseases to protect your harvest.
      </p>
      
      <div className="flex space-x-4">
        {user ? (
          <Link 
            to={user.role === 'admin' ? '/admin-dashboard' : '/farmer-dashboard'} 
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link 
              to="/signup" 
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg font-semibold hover:bg-green-50 transition shadow-lg"
            >
              Login
            </Link>
          </>
        )}
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        <div className="p-6 bg-white rounded-xl shadow-md border border-green-100 hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-green-800 mb-2">Farmer First</h3>
          <p className="text-gray-600">Easily diagnose crops on the go and get actionable insights to save your yield.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md border border-green-100 hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-green-800 mb-2">Location Insights</h3>
          <p className="text-gray-600">Track disease spread by saving your farm's location for better regional analysis.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md border border-green-100 hover:shadow-lg transition">
          <h3 className="text-lg font-bold text-green-800 mb-2">Admin Dashboard</h3>
          <p className="text-gray-600">Admins can analyze collected data to monitor trends and provide regional support.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
