import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Helper function to create custom colored icons based on disease
const getCustomIcon = (prediction) => {
  let hue = 120; // Default green (healthy)
  if (prediction.toLowerCase().includes('blight') || prediction.toLowerCase().includes('rot')) hue = 0; // Red
  else if (prediction.toLowerCase().includes('rust') || prediction.toLowerCase().includes('spot')) hue = 30; // Orange
  else if (prediction.toLowerCase().includes('virus') || prediction.toLowerCase().includes('mosaic')) hue = 60; // Yellow

  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: hsl(${hue}, 80%, 50%); width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const AdminMap = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistoryLocations();
  }, []);

  const fetchHistoryLocations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/admin/history', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLocations(data);
      }
    } catch (err) {
      console.error('Failed to fetch map data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-20 text-gray-600">Loading map data...</div>;

  return (
    <div className="max-w-7xl mx-auto mt-6 p-4">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Disease Spread Map</h1>
      <div className="bg-white p-4 rounded-xl shadow-lg border border-green-100 h-[70vh]">
        <MapContainer 
          center={[20.5937, 78.9629]} // Default center (India roughly)
          zoom={5} 
          style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((item) => (
            <Marker 
              key={item._id} 
              position={[item.location.latitude, item.location.longitude]}
              icon={getCustomIcon(item.prediction)}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-bold text-gray-800">{item.prediction}</p>
                  <p className="text-gray-600">Farmer: {item.user?.name}</p>
                  <p className="text-gray-600">Confidence: {item.confidence}%</p>
                  <p className="text-gray-400 text-xs mt-1">{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default AdminMap;
