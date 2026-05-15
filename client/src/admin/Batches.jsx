
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Batches() {
  const [batches, setBatches] = useState([]);
  const [species, setSpecies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ batchNumber: '', speciesId: '', notes: '' });

  const fetchBatches = () => {
    axios.get('/api/admin/batches', { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }})
      .then(res => setBatches(res.data));
  };

  useEffect(() => {
    fetchBatches();
    axios.get('/api/admin/species', { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }})
      .then(res => setSpecies(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/batches', form, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }});
      setShowModal(false);
      setForm({ batchNumber: '', speciesId: '', notes: '' });
      fetchBatches();
    } catch (err) {
      alert('Error creating batch');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Seed Batches</h1>
        <button onClick={() => setShowModal(true)} className="bg-prithvi-green text-white px-5 py-2.5 rounded-lg font-bold shadow hover:bg-opacity-90 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Batch
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Batch Number</th>
              <th className="px-6 py-4">Species</th>
              <th className="px-6 py-4">QR Count</th>
              <th className="px-6 py-4">Created Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {batches.map(b => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-bold text-gray-800">{b.batch_number}</td>
                <td className="px-6 py-4">{b.species_name}</td>
                <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full text-xs font-bold">{b.qr_count}</span></td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(b.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/admin/batches/${b.id}/qrcodes`} className="text-prithvi-green font-bold hover:underline text-sm">
                    View QRs &rarr;
                  </Link>
                </td>
              </tr>
            ))}
            {batches.length === 0 && (
              <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No batches created yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Generate New Batch</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Species</label>
                <select required value={form.speciesId} onChange={e => setForm({...form, speciesId: e.target.value})} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-prithvi-green">
                  <option value="">Select a species...</option>
                  {species.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Batch Number (Unique)</label>
                <input required type="text" placeholder="e.g. TMT-2024-A" value={form.batchNumber} onChange={e => setForm({...form, batchNumber: e.target.value})} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-prithvi-green uppercase" />
                <p className="text-xs text-gray-500 mt-1">This will generate 50 QR codes.</p>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Internal Notes</label>
                <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-prithvi-green h-24" placeholder="Optional details..."></textarea>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-100 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-200">Cancel</button>
                <button type="submit" className="flex-1 bg-prithvi-green text-white font-bold py-3 rounded-lg hover:bg-opacity-90">Generate & Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
