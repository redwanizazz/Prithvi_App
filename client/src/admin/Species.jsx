
import React, { useEffect, useState } from 'react';
import axios from '../api';

export default function Species() {
  const [species, setSpecies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isAdding, setIsAdding] = useState(false);

  const fetchSpecies = () => {
    axios.get('/api/admin/species', { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }})
      .then(res => setSpecies(res.data));
  };

  useEffect(() => fetchSpecies(), []);

  const handleEdit = (s) => {
    setEditingId(s.id);
    setEditForm(s);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`/api/admin/species/${id}`, editForm, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }});
      setEditingId(null);
      fetchSpecies();
    } catch (err) { alert('Failed to save'); }
  };

  const handleCreate = async () => {
    try {
      await axios.post('/api/admin/species', editForm, { headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }});
      setIsAdding(false);
      setEditForm({});
      fetchSpecies();
    } catch (err) { alert('Failed to create'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Species Database</h1>
        <button onClick={() => { setIsAdding(true); setEditForm({}); }} className="bg-prithvi-green text-white px-5 py-2.5 rounded-lg font-bold shadow hover:bg-opacity-90 flex items-center gap-2">
          Add Species
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-bold tracking-wider">
            <tr>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Scientific Name</th>
              <th className="px-4 py-4">Climate Zone</th>
              <th className="px-4 py-4 w-1/3">Description</th>
              <th className="px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isAdding && (
              <tr className="bg-blue-50/50">
                <td className="p-2"><input className="w-full border p-2 rounded" placeholder="Name" value={editForm.name || ''} onChange={e=>setEditForm({...editForm, name: e.target.value})} /></td>
                <td className="p-2"><input className="w-full border p-2 rounded" placeholder="Scientific" value={editForm.scientific_name || ''} onChange={e=>setEditForm({...editForm, scientific_name: e.target.value})} /></td>
                <td className="p-2"><input className="w-full border p-2 rounded" placeholder="Zone" value={editForm.climate_zone || ''} onChange={e=>setEditForm({...editForm, climate_zone: e.target.value})} /></td>
                <td className="p-2"><input className="w-full border p-2 rounded" placeholder="Desc" value={editForm.description || ''} onChange={e=>setEditForm({...editForm, description: e.target.value})} /></td>
                <td className="p-2 text-right space-x-2">
                  <button onClick={handleCreate} className="text-white bg-green-600 px-3 py-1.5 rounded font-bold">Save</button>
                  <button onClick={() => setIsAdding(false)} className="text-gray-600 px-3 py-1.5 rounded font-bold">Cancel</button>
                </td>
              </tr>
            )}
            {species.map(s => (
              <tr key={s.id} className="hover:bg-gray-50">
                {editingId === s.id ? (
                  <>
                    <td className="p-2"><input className="w-full border p-2 rounded" value={editForm.name} onChange={e=>setEditForm({...editForm, name: e.target.value})} /></td>
                    <td className="p-2"><input className="w-full border p-2 rounded" value={editForm.scientific_name} onChange={e=>setEditForm({...editForm, scientific_name: e.target.value})} /></td>
                    <td className="p-2"><input className="w-full border p-2 rounded" value={editForm.climate_zone} onChange={e=>setEditForm({...editForm, climate_zone: e.target.value})} /></td>
                    <td className="p-2"><input className="w-full border p-2 rounded" value={editForm.description} onChange={e=>setEditForm({...editForm, description: e.target.value})} /></td>
                    <td className="p-2 text-right space-x-2">
                      <button onClick={() => handleSave(s.id)} className="text-white bg-blue-600 px-3 py-1.5 rounded font-bold">Save</button>
                      <button onClick={() => setEditingId(null)} className="text-gray-600 px-3 py-1.5 rounded font-bold">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-4 font-bold text-gray-800">{s.name}</td>
                    <td className="px-4 py-4 italic text-gray-600">{s.scientific_name}</td>
                    <td className="px-4 py-4"><span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{s.climate_zone}</span></td>
                    <td className="px-4 py-4 text-gray-500 truncate max-w-xs">{s.description}</td>
                    <td className="px-4 py-4 text-right">
                      <button onClick={() => handleEdit(s)} className="text-prithvi-green font-bold hover:underline">Edit</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

