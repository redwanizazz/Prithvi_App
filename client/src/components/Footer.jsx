
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-prithvi-green text-prithvi-cream/70 py-12 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <Link to="/" className="text-2xl font-black tracking-tighter text-white mb-4 block">Prithvi</Link>
          <p className="mb-6 max-w-sm">Grow with precision. Combining smart tech with deep agricultural roots tailored for Bangladesh.</p>
          <p className="text-sm">© {new Date().getFullYear()} Prithvi App. All rights reserved.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Platform</h4>
          <ul className="space-y-2">
            <li><Link to="/scan" className="hover:text-white transition-colors">Scan Seed Packet</Link></li>
            <li><Link to="/education" className="hover:text-white transition-colors">Education Hub</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">Shop</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
