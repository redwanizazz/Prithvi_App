
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SEASONS = ['pre-monsoon', 'monsoon', 'post-monsoon', 'dry-winter'];
const ACTIONS = ['water', 'weed', 'fertilise', 'germination', 'harvest'];

export default function Schedules() {
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [newRow, setNewRow] = useState({ season: 'pre-monsoon', day_offset: 0, action_type: 'water', message_title: '', message_body: '' });

  useEffect(() => {
    axios.get('/api/admin/species', { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }})
      .then(res => setSpeciesList(res.data));
  }, []);

  useEffect(() => {
    if (selectedSpecies) {
      axios.get(`/api/admin/schedules/${selectedSpecies}`, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }})
        .then(res => setSchedules(res.data));
    }
  }, [selectedSpecies]);

  const handleDelete = async (id) => {
    await axios.delete(`/api/admin/schedules/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }});
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const handleAddRow = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/admin/schedules', { ...newRow, species_id: selectedSpecies }, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }});
    setSchedules([...schedules, { id: res.data.id, ...newRow, species_id: selectedSpecies }].sort((a,b) => a.day_offset - b.day_offset));
    setNewRow({ ...newRow, message_title: '', message_body: '', day_offset: parseInt(newRow.day_offset) + 5 });
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Left Panel - Species Selector */}
      <div className="w-1/4 bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto">
        <div className="p-4 border-b bg-gray-50 font-bold text-gray-700 sticky top-0">Select Species</div>
        <div className="p-2 space-y-1">
          {speciesList.map(s => (
            <button key={s.id} onClick={() => setSelectedSpecies(s.id)} className={`w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${selectedSpecies === s.id ? 'bg-prithvi-green text-white' : 'hover:bg-gray-100 text-gray-700'}`}>
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Schedule Editor */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
        {!selectedSpecies ? (
          <div className="flex-1 flex items-center justify-center text-gray-400 font-medium">Select a species to edit care schedules.</div>
        ) : (
          <>
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
              <h2 className="font-bold text-gray-800 text-lg">
                Care Schedule: {speciesList.find(s => s.id === selectedSpecies)?.name}
              </h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {SEASONS.map(season => {
                const seasonSchedules = schedules.filter(s => s.season === season).sort((a,b) => a.day_offset - b.day_offset);
                return (
                  <div key={season} className="border rounded-xl overflow-hidden">
                    <div className="bg-gray-100 p-3 font-bold text-gray-700 uppercase text-xs tracking-wider border-b flex justify-between items-center">
                      {season.replace('-', ' ')}
                      <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">{seasonSchedules.length} events</span>
                    </div>
                    {seasonSchedules.length > 0 ? (
                      <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs">
                          <tr><th className="p-3 w-16">Day</th><th className="p-3 w-32">Action</th><th className="p-3">Title</th><th className="p-3">Body</th><th className="p-3 w-16"></th></tr>
                        </thead>
                        <tbody className="divide-y">
                          {seasonSchedules.map(sch => (
                            <tr key={sch.id} className="hover:bg-gray-50">
                              <td className="p-3 font-bold">+{sch.day_offset}</td>
                              <td className="p-3 capitalize text-prithvi-green font-semibold">{sch.action_type}</td>
                              <td className="p-3 font-medium">{sch.message_title}</td>
                              <td className="p-3 text-gray-500 truncate max-w-xs">{sch.message_body}</td>
                              <td className="p-3 text-right">
                                <button onClick={() => handleDelete(sch.id)} className="text-red-500 hover:text-red-700"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-4 text-center text-sm text-gray-400">No events defined for this season.</div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Add New Row Form */}
            <div className="p-4 border-t bg-gray-50">
              <form onSubmit={handleAddRow} className="flex gap-2 items-end">
                <div className="w-32">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Season</label>
                  <select value={newRow.season} onChange={e=>setNewRow({...newRow, season: e.target.value})} className="w-full border p-2 rounded text-sm"><option value="pre-monsoon">Pre-Monsoon</option><option value="monsoon">Monsoon</option><option value="post-monsoon">Post-Monsoon</option><option value="dry-winter">Dry Winter</option></select>
                </div>
                <div className="w-20">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Day</label>
                  <input type="number" required min="0" value={newRow.day_offset} onChange={e=>setNewRow({...newRow, day_offset: e.target.value})} className="w-full border p-2 rounded text-sm" />
                </div>
                <div className="w-32">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Action</label>
                  <select value={newRow.action_type} onChange={e=>setNewRow({...newRow, action_type: e.target.value})} className="w-full border p-2 rounded text-sm capitalize">{ACTIONS.map(a => <option key={a} value={a}>{a}</option>)}</select>
                </div>
                <div className="w-1/4">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Title</label>
                  <input type="text" required value={newRow.message_title} onChange={e=>setNewRow({...newRow, message_title: e.target.value})} className="w-full border p-2 rounded text-sm" placeholder="e.g. Water Seeds" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 mb-1">Message Body</label>
                  <input type="text" required value={newRow.message_body} onChange={e=>setNewRow({...newRow, message_body: e.target.value})} className="w-full border p-2 rounded text-sm" placeholder="e.g. Give them a light misting." />
                </div>
                <button type="submit" className="bg-prithvi-green text-white px-4 py-2 rounded font-bold shadow hover:bg-opacity-90 whitespace-nowrap">Add Event</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
