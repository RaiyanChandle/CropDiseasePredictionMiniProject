import React, { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';

const FarmerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/predict/history', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError('');
    }
  };

  const getLocation = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) return resolve(null);
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => resolve(null)
      );
    });
  };

  const handleUpload = async () => {
    if (!file) return setError('Please select an image first.');
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const location = await getLocation();
      
      const formData = new FormData();
      formData.append('image', file);
      if (location) {
        formData.append('location', JSON.stringify(location));
      }

      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Prediction failed');
      
      setResult(data);
      fetchHistory(); // Refresh history
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Farmer Dashboard</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">Welcome back, {user?.name}. Here you can upload crop images and view your prediction history.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 bg-green-50 dark:bg-gray-700 rounded-lg border border-green-100 dark:border-gray-600 flex flex-col items-start">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">New Prediction</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Upload an image of a crop leaf to identify potential diseases.</p>
          
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
          />
          
          <div className="flex space-x-3 w-full">
            <button 
              onClick={() => fileInputRef.current.click()} 
              className="px-4 py-2 bg-white text-green-600 border border-green-600 rounded-md hover:bg-green-50 dark:bg-gray-800 transition"
              disabled={loading}
            >
              Choose Image
            </button>
            
            {file && (
              <button 
                onClick={handleUpload} 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center min-w-[120px]"
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  'Analyze Crop'
                )}
              </button>
            )}
          </div>

          {error && <p className="mt-3 text-red-500 text-sm">{error}</p>}
          
          {preview && !result && (
             <div className="mt-4 w-full">
               <img src={preview} alt="Preview" className="max-h-48 rounded-lg shadow-sm border border-gray-200" />
             </div>
          )}

          {result && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800 w-full">
              <h3 className="font-bold text-gray-800 dark:text-white">Analysis Complete!</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Disease: <span className="font-semibold text-red-500">{result.prediction}</span>
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Confidence: <span className="font-semibold">{result.confidence}%</span>
              </p>
            </div>
          )}
        </div>
        
        <div className="p-6 bg-blue-50 dark:bg-gray-700 rounded-lg border border-blue-100 dark:border-gray-600 flex flex-col items-start">
          <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">Platform Stats</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Your contributions to the community map.</p>
          <div className="space-y-2 mt-auto">
            <p className="text-gray-800 dark:text-gray-200 font-medium">Total Scans: <span className="font-bold text-blue-600 dark:text-blue-400">{history.length}</span></p>
            <p className="text-gray-800 dark:text-gray-200 font-medium">Location Tracking: <span className="font-bold text-green-500">Active</span></p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">My History</h2>
        {history.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No predictions made yet. Upload an image to get started.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <div key={item._id} className="bg-white dark:bg-gray-700 rounded-lg shadow border border-gray-200 dark:border-gray-600 overflow-hidden">
                <img src={item.imageUrl} alt="Crop" className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-1">{item.prediction}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Confidence: {item.confidence}%</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerDashboard;
