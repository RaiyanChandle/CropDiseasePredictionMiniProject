import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'farmer' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const getLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) return resolve(null);
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, location })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      
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
    <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 p-8 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Create an Account</h2>
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="mt-1 w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="mt-1 w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="mt-1 w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
          <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="mt-1 w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="farmer">Farmer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">We will request your device location upon signup.</p>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-lg font-semibold hover:bg-green-700">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
