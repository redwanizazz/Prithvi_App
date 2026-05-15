
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/admin/analytics', { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }})
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div className="p-10 font-bold text-gray-500">Loading metrics...</div>;

  const MetricCard = ({ title, value, icon, colorClass }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${colorClass}`}>
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} /></svg>
      </div>
      <div>
        <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-black text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Total QRs" value={data.totalQRCodes.toLocaleString()} icon="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" colorClass="bg-blue-50 text-blue-600" />
        <MetricCard title="Activated Scans" value={data.scannedQRCodes.toLocaleString()} icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" colorClass="bg-green-50 text-green-600" />
        <MetricCard title="Active Users (30d)" value={data.activeUsers.toLocaleString()} icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" colorClass="bg-purple-50 text-purple-600" />
        <MetricCard title="Push Sent" value={data.notificationsSent.toLocaleString()} icon="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" colorClass="bg-orange-50 text-orange-600" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Top Scanned Species</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.topSpecies} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
              <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="scans" fill="#1B4332" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
