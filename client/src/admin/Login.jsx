
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', { email, password });
      localStorage.setItem('adminToken', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-prithvi-green tracking-tighter mb-1">Prithvi Admin</h1>
          <p className="text-gray-500">Sign in to manage the platform</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center font-medium border border-red-100">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border p-3 rounded-lg focus:outline-none focus:border-prithvi-green focus:ring-1 focus:ring-prithvi-green" required />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-3 rounded-lg focus:outline-none focus:border-prithvi-green focus:ring-1 focus:ring-prithvi-green" required />
          </div>
          <button type="submit" className="w-full bg-prithvi-green text-white font-bold py-3 rounded-lg hover:bg-opacity-90 transition-colors shadow-md mt-2">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
