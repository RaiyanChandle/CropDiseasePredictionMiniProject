import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Blog = () => {
  const { user } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Admin form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [region, setRegion] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/announcements', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAnnouncements(data);
      } else {
        throw new Error('Failed to load announcements');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert('Title and Content are required');
    
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content, region })
      });

      if (res.ok) {
        const newAnnouncement = await res.json();
        setAnnouncements([newAnnouncement, ...announcements]);
        setTitle('');
        setContent('');
        setRegion('');
      } else {
        alert('Error posting announcement');
      }
    } catch (err) {
      console.error(err);
      alert('Error posting announcement');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/announcements/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setAnnouncements(announcements.filter((a) => a._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-4xl font-extrabold text-green-800 mb-2">Blog & Crop Alerts</h1>
      <p className="text-gray-600 mb-8 text-lg">Stay updated with the latest farming tips, remedies, and regional disease alerts.</p>

      {user?.role === 'admin' && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200 mb-10">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Post an Alert/Remedy</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Warning: Late Blight in North Region"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Region</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g., North, South, or leave blank for All Regions"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Content / Remedies</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[120px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Provide detailed information and remedies..."
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-md font-bold hover:bg-green-700 transition w-full sm:w-auto"
              disabled={submitting}
            >
              {submitting ? 'Posting...' : 'Publish Alert'}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 text-center text-lg">Loading latest alerts...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : announcements.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-xl border border-green-100 shadow-sm">
          <p className="text-gray-500 text-lg">No alerts or remedies have been posted yet. Check back later!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {announcements.map((post) => (
            <div key={post._id} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500 hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold text-gray-800">{post.title}</h3>
                {user?.role === 'admin' && (
                  <button 
                    onClick={() => handleDelete(post._id)}
                    className="text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="flex space-x-4 text-sm text-green-700 font-semibold mb-4 bg-green-50 w-max px-3 py-1 rounded-full">
                <span>📍 Region: {post.region}</span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</p>
              <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-400 flex justify-between">
                <span>Posted by {post.author?.name || 'Admin'}</span>
                <span>{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
