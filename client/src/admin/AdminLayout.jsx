
import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';

export default function AdminLayout() {
  const token = localStorage.getItem('adminToken');
  const location = useLocation();

  if (!token) return <Navigate to="/admin/login" replace />;

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Batches', path: '/admin/batches', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { name: 'Species', path: '/admin/species', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Schedules', path: '/admin/schedules', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-prithvi-green text-white flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-prithvi-green font-bold">P</div>
          <span className="text-xl font-bold tracking-wider">Prithvi Admin</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(item => (
            <Link key={item.path} to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.startsWith(item.path) ? 'bg-white/20 font-bold' : 'hover:bg-white/10 text-white/80 hover:text-white'}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} /></svg>
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 text-white/80 hover:text-white w-full px-4 py-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-50 p-8">
        <Outlet />
      </div>
    </div>
  );
}
