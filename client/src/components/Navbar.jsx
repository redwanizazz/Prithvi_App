
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Scan', path: '/scan' },
    { name: 'Education', path: '/education' },
    { name: 'Shop', path: '/shop' },
  ];

  return (
    <nav className="bg-prithvi-cream border-b border-prithvi-green/10 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <svg className="w-8 h-8 text-prithvi-green group-hover:text-prithvi-brown transition-colors" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.48 17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          <span className="text-2xl font-black tracking-tighter text-prithvi-green">Prithvi</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-8 items-center">
          {links.map(l => (
            <Link key={l.path} to={l.path} className={`font-semibold transition-colors ${location.pathname === l.path ? 'text-prithvi-brown' : 'text-prithvi-green hover:text-prithvi-brown'}`}>
              {l.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-prithvi-green" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b absolute w-full left-0 px-6 py-4 shadow-lg flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.path} to={l.path} onClick={() => setIsOpen(false)} className="text-lg font-bold text-prithvi-green border-b pb-2">
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
