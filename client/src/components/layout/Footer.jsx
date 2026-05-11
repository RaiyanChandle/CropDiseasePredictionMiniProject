import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-600 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">CropShield</h3>
            <p className="text-green-100 text-sm">
              Empowering farmers with AI-driven early crop disease detection and actionable insights.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-green-100 hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="text-green-100 hover:text-white transition">About Us</Link></li>
              <li><Link to="/login" className="text-green-100 hover:text-white transition">Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-green-100 text-sm">
              Email: support@cropshield.example.com<br/>
              Phone: +1 234 567 8900
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-green-600 text-center">
          <p className="text-sm text-green-200">
            &copy; {new Date().getFullYear()} CropShield. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
