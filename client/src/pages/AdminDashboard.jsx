import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalFarmers: 0, totalScans: 0, topDisease: 'Loading...' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-green-100">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Admin Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">Welcome, {user?.name}. Monitor platform usage and regional disease trends.</p>
      
      {loading ? (
        <p className="text-gray-500">Loading statistics...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-purple-50 rounded-lg border border-purple-100">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Total Farmers</h2>
            <p className="text-3xl font-bold text-gray-800">{stats.totalFarmers}</p>
          </div>
          
          <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-100">
            <h2 className="text-xl font-semibold text-yellow-700 mb-2">Total Scans</h2>
            <p className="text-3xl font-bold text-gray-800">{stats.totalScans}</p>
          </div>
          
          <div className="p-6 bg-red-50 rounded-lg border border-red-100">
            <h2 className="text-xl font-semibold text-red-700 mb-2">Top Disease</h2>
            <p className="text-xl font-bold text-gray-800">{stats.topDisease}</p>
          </div>
        </div>
      )}
      
      <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Data Reports & Insights</h2>
        <p className="text-gray-600 mb-4">
          All data is actively collected from the farmer mobile and web endpoints. 
          Use the <strong>Disease Map</strong> from the navigation bar to visually track geographic hotspots in real-time.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
