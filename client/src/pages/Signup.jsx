import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin'
        ? '/admin-dashboard'
        : '/farmer-dashboard');
    }
  }, [user, navigate]);

  const getLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) return resolve(null);

      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }),
        () => resolve(null)
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const location = await getLocation();

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...formData, location })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      login(data.user, data.token);

      if (data.user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/farmer-dashboard');
      }

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-xl shadow-lg">

      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create an Account
      </h2>

      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>

          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
            }
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value
              })
            }
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>

          <div className="relative mt-1">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value
                })
              }
              className="w-full p-2 pr-10 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Role Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Role
          </label>

          <div className="flex gap-3">

            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  role: 'farmer'
                })
              }
              className={`flex-1 p-2 rounded-lg border font-medium transition
                ${formData.role === 'farmer'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300'
                }`}
            >
              Farmer
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  role: 'admin'
                })
              }
              className={`flex-1 p-2 rounded-lg border font-medium transition
                ${formData.role === 'admin'
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-700 border-gray-300'
                }`}
            >
              Admin
            </button>

          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2 text-center">
          We will request your device location upon signup.
        </p>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Sign Up
        </button>

      </form>
    </div>
  );
};

export default Signup;